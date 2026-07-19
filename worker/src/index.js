const DEFAULT_OWNER = "AstonLu";
const DEFAULT_REPOSITORY = "file-download-hub";
const DEFAULT_BRANCH = "main";
const DEFAULT_DIRECTORY = "files";
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const API_VERSION = "2022-11-28";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === "/health") {
      return json({ ok: true, authenticatedEmail: authenticatedEmail(request) || null }, 200, cors);
    }

    if (url.pathname !== "/upload" || request.method !== "POST") {
      return json({ error: "Not found" }, 404, cors);
    }

    const email = authenticatedEmail(request);
    if (!email || (env.ALLOWED_EMAIL && email.toLowerCase() !== env.ALLOWED_EMAIL.toLowerCase())) {
      return json({ error: "Unauthorized" }, 401, cors);
    }

    if (!env.GITHUB_TOKEN) {
      return json({ error: "Worker is missing GITHUB_TOKEN" }, 500, cors);
    }

    try {
      const form = await request.formData();
      const file = form.get("file");
      const overwrite = String(form.get("overwrite") || "false") === "true";

      if (!(file instanceof File)) {
        return json({ error: "No file supplied" }, 400, cors);
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        return json({ error: "File exceeds the 25 MB limit" }, 413, cors);
      }

      const filename = normalizeFilename(file.name);
      if (!filename) {
        return json({ error: "Invalid filename" }, 400, cors);
      }

      const owner = env.GITHUB_OWNER || DEFAULT_OWNER;
      const repository = env.GITHUB_REPOSITORY || DEFAULT_REPOSITORY;
      const branch = env.GITHUB_BRANCH || DEFAULT_BRANCH;
      const directory = env.GITHUB_DIRECTORY || DEFAULT_DIRECTORY;
      const path = `${directory}/${filename}`;
      const endpoint = `https://api.github.com/repos/${owner}/${repository}/contents/${encodePath(path)}`;
      const headers = githubHeaders(env.GITHUB_TOKEN);

      const existingResponse = await fetch(`${endpoint}?ref=${encodeURIComponent(branch)}`, { headers });
      let existingSha = null;
      if (existingResponse.ok) {
        existingSha = (await existingResponse.json()).sha || null;
      } else if (existingResponse.status !== 404) {
        throw await githubError(existingResponse, "Unable to inspect existing file");
      }

      if (existingSha && !overwrite) {
        return json({ error: "File already exists", code: "FILE_EXISTS", filename }, 409, cors);
      }

      const content = arrayBufferToBase64(await file.arrayBuffer());
      const payload = {
        message: existingSha ? `Replace ${filename}` : `Upload ${filename}`,
        content,
        branch,
      };
      if (existingSha) payload.sha = existingSha;

      const uploadResponse = await fetch(endpoint, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!uploadResponse.ok) {
        throw await githubError(uploadResponse, "GitHub upload failed");
      }

      const result = await uploadResponse.json();
      return json({
        ok: true,
        filename,
        commitUrl: result.commit?.html_url || null,
        uploadedBy: email,
      }, 200, cors);
    } catch (error) {
      console.error(error);
      return json({ error: error?.message || "Upload failed" }, error?.status || 500, cors);
    }
  },
};

function authenticatedEmail(request) {
  return request.headers.get("Cf-Access-Authenticated-User-Email") || "";
}

function normalizeFilename(filename) {
  return filename.normalize("NFC").replace(/[\\/]/g, "_").replace(/^\.+/, "").trim();
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "User-Agent": "file-download-hub-worker",
    "X-GitHub-Api-Version": API_VERSION,
  };
}

async function githubError(response, fallbackMessage) {
  const body = await response.json().catch(() => ({}));
  const error = new Error(body.message || `${fallbackMessage} (${response.status})`);
  error.status = response.status >= 400 && response.status < 500 ? response.status : 502;
  return error;
}

function corsHeaders(origin, allowedOrigin) {
  const permitted = allowedOrigin || "https://astonlu.github.io";
  const allowOrigin = origin === permitted ? origin : permitted;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    Vary: "Origin",
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  });
}
