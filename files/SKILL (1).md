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

If noncritical information is missing, omit it cleanly from the final meeting minutes rather than inserting placeholders
Do not output "不完整", "未知", "待確認", "待補" or similar placeholders unless the meeting itself explicitly states that an issue is unresolved
Only ask the user for clarification when the missing information would materially affect factual accuracy, the meeting conclusion, or the usability of the final document

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

Default structure when the information is available:

Topic：<concise professional meeting topic>
Date：<meeting date; include AM/PM only if provided or clearly requested>
Participant：<participants grouped by organization when available>

If date or participant information is not available and is not essential, omit that line
Never infer missing names or titles
Do not label participant information as incomplete

Meeting date source priority:
1. explicit date supplied by the user or transcript
2. reliable source filename / meeting metadata when clearly tied to the meeting
3. current date only when the user explicitly says the meeting is "today", "this morning", or equivalent
Never use the Agent execution date as the meeting date by default

Participant hygiene:
- list confirmed names, titles, departments, or organizations only
- omit transcript speaker placeholders such as "主管（女）", "主管（副總）", "經理", "簡報同仁", "未知"
- if individual identity is unclear but the department is clear and useful, list the department rather than inventing a person
- do not duplicate the same organization or person under slightly different labels

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
1. what is changing and by when, especially explicit regulatory or execution milestones
2. how the future operating model or rules will work
3. what materially changes for the user's organization or its role in the value chain
4. what remains unresolved or gates the next step
5. legal / accounting / technical detail only when it materially changes a decision or operating model

Do not promote a detail into Key Takeaways merely because it is notable
If a timeline is explicit and central to execution, it normally belongs in Key Takeaways
If a legal, accounting, or technical point is mainly implementation detail, keep it in General Notes

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

Do not over-fragment General Notes
Merge adjacent sections when they answer the same executive question or when one section would contain only one low-value bullet
A complex 60–90 minute meeting will often require roughly 6–10 substantive General Notes sections, but section count is never a target

Place confirmed operational facts in the relevant substantive section
Use a final unresolved-items section only for genuinely unresolved items that affect future design, execution, or decisions

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

Preserve the strength of the source verb:
- 已裁示 / 已公告 / 已確認 / 已決定 = confirmed
- 規劃 / 預計 / 初步規劃 = plan
- 建議 / 可考量 / 可評估 / 可能 = recommendation or option
- 研議 / 尚待確認 / 待釐清 = unresolved

Never rewrite "建議主管機關發布函令" as "函令將明定"
Never rewrite "可考量由銀行承接 Custody" as "銀行將承接 Custody"

When the same institution can participate under different scopes, explicitly qualify the scope before writing
Examples:
- "作為平台直接參加人" versus "作為 Broker 底層投資人"
- "Issuer 自行持有 Wallet" versus "Issuer 委託 Transfer Agent"
- "Bank as Settlement Bank" versus "Bank as Third-party Custodian"

If two source statements only appear contradictory because they refer to different participation modes, resolve the distinction explicitly rather than presenting a contradiction

Before finalizing, run an internal status check for every material statement:
- confirmed fact / decision
- current plan / proposal
- unresolved item
Use wording that matches the actual status and never upgrade a proposal into a decision

Run a cross-section consistency check:
- the same role, process, participant type, or rule must not be described inconsistently in different sections
- if two statements appear to conflict, resolve the scope distinction from the source before writing
- if the source itself is ambiguous, preserve the ambiguity rather than choosing one interpretation

Do not place a confirmed fact inside an "unresolved" or "尚待確認" section
Do not place an unresolved proposal inside a confirmed-fact section

Do not "improve" the substance by adding consulting recommendations
This skill creates meeting minutes, not a strategy memo

## Style rules

Use concise, professional Traditional Chinese
Use KGI/BCG working-note tone
Prefer active, precise sentences
Prefer natural professional Chinese over literal transcript phrasing or awkward passive constructions
Avoid phrases such as "已被建議", "可自成生態系" or other wording that overstates the source or sounds machine-generated
Use the wording level and compression of the Gold Standard references
Keep technical terms in English when clearer, for example:
RWA, Digital Native Bond, B2B, Wallet, Private Key, Cash Token, DVP, Settlement Bank, Custody, API

Do not end bullets or headlines with Chinese full stops
Avoid decorative language
Avoid rhetorical commentary
Avoid "重點", "洞察", "結論", "摘要" as section labels
Do not use numbered chapter structures such as 1, 2, 3 or 4.2
Do not use emoji

Do not output meta-commentary before or after the meeting minutes, including statements such as:
- "I'll use the meeting-minutes skill"
- "內容已依格式完成"
- "以下為整理結果"
- implementation notes about tools, templates, or model behavior

When the task is to produce meeting minutes, return only the finished meeting minutes or the generated file result
Do not expose internal skill names, QA steps, or orchestration behavior to the user

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
16. No noncritical placeholder text such as 不完整、未知、待確認、待補 appears in the final document
17. No meta-commentary about using a skill, formatting, or tool behavior appears in the final output
18. Every material statement preserves its source status as confirmed / planned / unresolved
19. No contradiction exists across Key Takeaways and General Notes
20. Confirmed facts are not incorrectly placed under unresolved-items sections, and unresolved items are not presented as confirmed facts
21. Key Takeaways prioritize executive materiality rather than legal / technical detail
22. Explicit execution timelines are not omitted from Key Takeaways when central to the meeting
23. Source verb strength is preserved: confirmed / planned / suggested / unresolved are not upgraded or downgraded
24. Participation scope is explicit where direct participants and underlying investors follow different rules
25. Participant list contains no transcript placeholders such as 主管（女）、經理、未知 or generic speaker labels
26. Meeting date and filename date are source-supported and are never defaulted to the Agent execution date
27. Chinese phrasing is natural and professional, without awkward passive or machine-like wording

If any check fails, revise before returning the output

# Word output behavior

For production use, prefer a single Copilot Studio Workflow / Agent Flow rather than exposing the raw Word connector directly to the agent

Recommended workflow:
1. Receive structured meeting-minute fields from the agent
2. Populate the designated KGI Word template
3. Save the populated binary as a new .docx file in the designated OneDrive for Business or SharePoint folder
4. Return the created filename and file location to the agent
5. If Word creation succeeds, do not paste the full meeting minutes again in chat; return only a concise completion message and the created Word file / file link
6. If Word creation fails, return the structured meeting minutes as a fallback and state only the specific tool failure that blocked file creation

The preferred KGI template design should preserve the logo and page theme as static template content and use supported Word content controls for dynamic fields

Recommended dynamic controls:
- Topic: Plain Text Content Control
- Date: Plain Text Content Control
- Participant: Plain Text Content Control with multiple paragraphs enabled
- KeyTakeaways: Repeating Section Content Control containing one Plain Text control named KeyTakeaway
- GeneralSections: Repeating Section Content Control containing:
  - SectionHeadline: Plain Text control formatted bold
  - SectionBody: Plain Text control with multiple paragraphs enabled

For SectionBody, the agent may provide visually structured plain text using bullet symbols and line breaks
Do not rely on Rich Text Content Control because the Word Online (Business) connector does not support it

The preferred final output is a Word document that preserves the designated KGI meeting-note visual theme, including the KGI logo, typography, spacing, margins, and section styling


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


---

# Gold Standard Style Specification

This reference captures the stable style learned from the user's finalized KGI meeting notes

## Header

Use:
- Topic：
- Date：
- Participant：

Participants are grouped by organization where possible
If some participant names are missing, list only the names or groups supported by the source and omit missing entries

## Key Takeaways

Target: 2–6 bullets depending on meeting complexity; normally 3–5

The finalized RWA reference used four bullets, but four is an example rather than a fixed rule. Key Takeaways should expand or contract with meeting complexity and collectively cover:
- regulatory / project timeline
- operating-model design
- role change for the bank / securities ecosystem
- KGI participation stance and gating items

Characteristics:
- one full sentence per bullet
- executive-level, not process-level
- no numbered taxonomy
- no sub-bullets in normal cases
- the four bullets together should function as a self-contained executive readout

## General Notes

Each section begins with an answer-first headline

Pattern:
**<topic + what it means / how it works / what changes>**

Examples of the pattern:
- "主管機關預計於 2027 年 3 月底前完成國內公司債及金融債 RWA 擬真交易，並以正式平台提前驗證未來實際發行與交割流程"
- "首階段採 Digital Native Bond 及 B2B 架構，整檔債券直接於鏈上發行，但一般投資人仍維持現有鏈下持有及交易模式"
- "RWA Platform 採金融周邊單位共同建置的聯盟鏈，並與財金公司款項 Token 共鏈，以支援 Bond Token 與 Cash Token 的即時 DVP"
- "債券發行程序大致沿用現行制度，主要新增 Token Mint、Wallet Mapping 及 Private Key Signature 等鏈上作業"
- "次級市場初期仍沿用現有 OTC 議價交易模式，RWA Platform 的主要改變集中在交易完成後的鏈上 Settlement"
- "證券商無法自行持有 Cash Token，使 Settlement Bank 成為 RWA DVP 必要角色，銀行亦可能進一步延伸至 Private Key Custody"
- "目前尚待確認的議題主要集中在 Buyer、Cash Token Custody、DVP Exception Handling 及虛實轉換法制，將直接影響凱基後續系統與作業設計"

These are not generic category titles
They already communicate the section's answer

## Bullet design

Preferred:
- headline
  - complete first-level sentence
    - supporting mechanism / fact
    - supporting mechanism / fact

Avoid:
- role label as bullet
- one- or two-word bullet
- overly fragmented notes
- pseudo-slide labels such as "Issue", "Implication", "Next step"
- artificial numbering

## Fidelity

The finalized document did not create a separate recommendation section
It captured "尚待確認" items when the meeting itself left issues unresolved
This is essential: do not transform meeting minutes into consultant-authored advice unless explicitly requested

## Formatting tone

- clean consulting working document
- KGI corporate presentation feel
- bold section headlines
- restrained formatting
- no emoji
- no decorative callouts
- no chapter numbering
- no Chinese full stops at bullet ends


---

# QA Checklist

Run this silently before final output

## Executive layer
- Are there only 3–5 Key Takeaways
- Can a GM understand the meeting's purpose, direction, organization implication, and main unresolved issue from Key Takeaways alone
- Is every Key Takeaway materially different

## Structure
- Are General Notes unnumbered
- Is every section headline answer-first and a complete sentence
- Are sections ordered by logic instead of speaker chronology
- Are related comments consolidated

## Bullet quality
- Is every first-level bullet a complete sentence
- Does each first-level bullet contain one distinct message
- Are supporting facts placed one level below
- Is hierarchy limited to three levels

## Fidelity
- Are all names, dates, amounts, and decisions source-supported
- Are proposed or unfinished items marked with uncertainty language
- Is anything presented as final when the transcript said it was still being discussed
- Were any unsupported recommendations or external facts added

## Style
- Traditional Chinese by default
- Professional KGI/BCG working-note tone
- English technical terms retained where clearer
- No emoji
- No numbered chapter structure
- No Chinese full stop at bullet or headline endings

## Final pass
Delete any sentence that can be removed without reducing understanding
Restore any decision-relevant fact that was accidentally compressed away


---

# Output Skeleton

Topic：<meeting topic>
Date：<YYYY/MM/DD>
Participant：
• <organization / participants>
• <organization / participants>

Key Takeaways

• <complete executive takeaway>
• <complete executive takeaway>
• <complete executive takeaway>
• <complete executive takeaway>

General Notes

**<answer-first section headline>**

• <complete first-level supporting sentence>
  o <supporting fact / mechanism>
  o <supporting fact / mechanism>

• <complete first-level supporting sentence>
  o <supporting fact / mechanism>

**<answer-first section headline>**

• <complete first-level supporting sentence>
  o <supporting fact / mechanism>
  o <supporting fact / mechanism>


---

# KGI Word Template Integration

The Word visual theme is part of the required output quality, not an optional decoration

## Preferred tool

Use `填入 Microsoft Word 範本` when the designated KGI Meeting Minutes template is available

The template should be stored in the company's OneDrive for Business or SharePoint document library and should preserve:
- static KGI logo
- page margins and typography
- Topic / Date / Participant layout
- Key Takeaways heading
- General Notes heading
- bold answer-first section headline style
- bullet indentation and spacing

## Dynamic content

The number of Key Takeaways is not fixed
Use 2–6 depending on meeting complexity

General Notes section count is also dynamic
Do not create artificial sections to fill a template

Where the Word connector requires fields, use a template design that supports variable-length content, such as repeating sections or multiline plain-text controls

## Tool fallback

If the KGI template is unavailable:
- produce the correctly structured content first
- use `使用指定內容建立 Microsoft Word 文件`
- tell the user that the output does not yet use the designated KGI visual template

Never silently drop the KGI theme when a configured template exists


# Filename rules

Preferred filename:
YYYYMMDD_會議記錄_<short-topic>.docx

Use YYYYMMDD only when the meeting date is supported by the source hierarchy above
If the meeting date is not supported, use:
會議記錄_<short-topic>.docx

Never substitute the Agent execution date for an unknown meeting date


# KGI Word visual standard

The designated Word template should match the Gold Standard visual language:
- KGI logo is placed in the document header so it repeats on every page
- no extra cover title such as "<topic> / 會議記錄" above the Topic line
- first visible body line begins with Topic
- Topic, Date, Participant labels use the existing KGI template styling
- Key Takeaways and General Notes headings are black, bold, and restrained
- General Notes answer-first headlines are black bold, not blue or accent-colored
- paragraph spacing should preserve the Gold Standard's readable consulting-note density rather than compressing the document excessively
- Key Takeaway items use true Word bullet paragraphs inside the repeating section
- SectionBody may use plain-text bullet symbols in V1, but indentation and spacing should visually approximate the Gold Standard
