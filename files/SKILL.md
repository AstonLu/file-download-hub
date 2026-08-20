---
name: kgi-consulting-meeting-notes
description: Transform meeting transcripts, rough notes, or transcript-derived text into executive-ready KGI/BCG-style meeting minutes. Activate when the user provides a transcript or meeting notes and asks to create, rewrite, polish, structure, or export meeting minutes. Produce concise Key Takeaways for senior executives and answer-first, non-numbered General Notes, while staying strictly grounded in the source.
---

# Purpose

Create professional meeting minutes that match the user's KGI/BCG consulting-note style

The output is not a chronological transcript summary and not a strategy memo
It is a structured, source-grounded meeting record that allows senior executives to understand the meeting quickly while preserving enough detail for working teams

Use Traditional Chinese by default
Keep English technical and professional terms when they are clearer or commonly used

# Source hierarchy

Use the user's current transcript or meeting notes as the only factual source for meeting content

Do not add external facts, web research, market knowledge, or background context unless the user explicitly asks for external research

Do not invent:
- participant names or titles
- dates or times
- decisions
- action items
- legal or regulatory interpretations
- numbers
- motivations
- implications not stated or strongly supported by the meeting

If a field is incomplete, write "不完整", "未知", or "待確認" rather than guessing

# Core workflow

## Read and reconstruct the meeting before writing

First identify:
- meeting purpose
- major topics actually discussed
- explicit decisions or directional views
- timeline and milestones
- operating model or process changes
- roles and responsibilities
- unresolved questions
- organization-specific implications explicitly discussed

Reorganize by issue, not by speaker order or transcript chronology

Merge repetitive statements from different speakers when they support the same point
Preserve disagreements, uncertainties, and unresolved alternatives when material

## Write the header

Default structure:

Topic：<concise professional meeting topic>
Date：<meeting date; include AM/PM only if provided or clearly requested>
Participant (不完整)：<participants grouped by organization when available>

If participant information is incomplete, keep "Participant (不完整)"
Never infer missing names

## Write Key Takeaways for a GM-level reader

Target 2–6 bullets, normally 3–5

Each Key Takeaway must:
- be a complete professional sentence
- communicate a material conclusion, rule change, decision, timeline, or organization implication
- be understandable without reading General Notes
- be specific enough to be decision-useful
- avoid low-level process detail unless it changes the meaning of the meeting

Do not:
- create more bullets merely to cover every topic
- use labels such as "平台架構：" or "時程："
- repeat the same idea with different wording
- include recommendations that were not made in the meeting
- use sub-bullets in Key Takeaways unless absolutely necessary

Prioritize, in order:
1. what is changing and by when
2. how the future operating model or rules will work
3. what changes for the user's organization
4. what remains unresolved or gates the next step

## Write General Notes with answer-first headlines

Do not number sections

Each section begins with one bold answer-first headline that is itself a complete professional sentence
The headline should summarize the full section, not merely name the topic

Good:
- "首階段採 Digital Native Bond 及 B2B 架構，整檔債券直接於鏈上發行，但一般投資人仍維持現有鏈下持有及交易模式"
- "證券商無法自行持有 Cash Token，使 Settlement Bank 成為 RWA DVP 必要角色，銀行亦可能進一步延伸至 Private Key Custody"

Bad:
- "平台架構"
- "發行日"
- "4.2 發行流程"
- "Issuer 仍依現行流程"
- "DVP"

Order sections by executive logic, not transcript sequence
A typical logic is:
- policy / purpose / timeline
- target model / scope
- platform or operating model
- primary process
- secondary process
- role changes
- technology / custody
- legal or exception items
- organization readiness / position
- unresolved questions

Only use the sections that are actually supported by the meeting

## Build bullet hierarchy

Under each headline, use 2–4 first-level bullets where possible

Every first-level bullet must be a complete sentence that carries a distinct idea
Do not use noun labels as first-level bullets

Use second-level bullets only to support the first-level bullet with:
- mechanism
- component
- example
- timeline
- role split
- specific fact
- exception

Use a third level only when necessary
Avoid more than three hierarchy levels

The structure should read as:

Headline = section answer
• First-level bullet = major supporting point
  o Second-level bullet = fact / mechanism / example
    ▪ Third-level bullet = only if needed

A reader should be able to read only the headlines and first-level bullets and understand the meeting

## Preserve source fidelity

Separate clearly between:
- confirmed meeting content
- options still under discussion
- unresolved issues

Use wording such as:
- "目前規劃"
- "初步規劃"
- "尚待確認"
- "仍在研議"
- "預計"
when the source is not final

Do not convert a proposal into a confirmed decision

Do not "improve" the substance by adding consulting recommendations
This skill creates meeting minutes, not a strategy memo

## Style rules

Use concise, professional Traditional Chinese
Use KGI/BCG working-note tone
Prefer active, precise sentences
Keep technical terms in English when clearer, for example:
RWA, Digital Native Bond, B2B, Wallet, Private Key, Cash Token, DVP, Settlement Bank, Custody, API

Do not end bullets or headlines with Chinese full stops
Avoid decorative language
Avoid rhetorical commentary
Avoid "重點", "洞察", "結論", "摘要" as section labels
Do not use numbered chapter structures such as 1, 2, 3 or 4.2
Do not use emoji

# Quality gate before finalizing

Before output, silently verify:

1. Key Takeaways are between 2–6 and a GM can understand the whole meeting from them
2. Every General Notes headline is a complete answer-first sentence
3. No section is numbered
4. Every first-level bullet is a complete professional sentence
5. No first-level bullet is only a noun, role label, acronym, or process step
6. General Notes are organized by issue rather than transcript order
7. Repetitive speaker comments are consolidated
8. All numbers, names, timelines, and decisions are supported by the source
9. Uncertain items are explicitly marked as uncertain
10. No external facts or unsupported recommendations were added
11. No useful decision-relevant content was lost
12. The document is detailed enough for the working team but not verbose
13. No Chinese full stop is used at the end of bullets or headlines
14. English terminology is consistent
15. The final output resembles the reference style files in this skill package

If any check fails, revise before returning the output

# Word output behavior

The preferred final output is a Word document that preserves the designated KGI meeting-note visual theme, including the KGI logo, typography, spacing, margins, and section styling

Tool priority:
1. If "填入 Microsoft Word 範本" is available and a designated KGI Meeting Minutes template is configured, MUST use that template
2. Only if no designated template is configured, fall back to "使用指定內容建立 Microsoft Word 文件"

Do not recreate the visual theme from scratch when a KGI template exists

For the KGI template:
- preserve the static KGI logo
- preserve Topic / Date / Participant header styling
- preserve Key Takeaways and General Notes title styling
- preserve headline bold treatment
- preserve paragraph spacing and indentation
- allow the number of Key Takeaways and General Notes sections to vary according to meeting content

Use file naming:
YYYYMMDD_會議記錄_<short-topic>.docx

If the exact meeting date is unknown, ask only when a filename cannot be produced safely
If the user has supplied a relative date such as "today" or "this morning", resolve it to the actual date

Do not sacrifice content quality to force content into a fixed number of pages
