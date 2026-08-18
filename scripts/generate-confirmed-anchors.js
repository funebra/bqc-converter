"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "docs", "evidence-r0002.json");
const HTML_PATH = path.join(ROOT, "docs", "confirmed-anchors.html");

function loadEvidence() {
  if (!fs.existsSync(JSON_PATH)) {
    throw new Error(`Missing evidence file: ${JSON_PATH}`);
  }
  return JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(evidence) {
  const rows = evidence.anchors
    .map((a) => {
      const ctx = `(${a.context.z},${a.context.y})`;
      return `    <tr>
      <td>${escapeHtml(a.bqc)}</td>
      <td>${a.value}</td>
      <td>${escapeHtml(ctx)}</td>
      <td>${escapeHtml(a.status)}</td>
    </tr>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>BQC Confirmed Anchors — Evidence Archive ${escapeHtml(evidence.archiveRevision)}</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.45; }
  h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
  .meta { color: #555; margin-bottom: 1.5rem; }
  table { border-collapse: collapse; margin: 1rem 0; }
  th, td { border: 1px solid #888; padding: 0.35rem 0.7rem; text-align: left; }
  th { background: #f0f0f0; }
  .note { max-width: 54rem; font-size: 0.9rem; color: #333; margin-top: 1.5rem; }
  code { background: #f4f4f4; padding: 0.1rem 0.3rem; }
</style>
</head>
<body>

<h1>BQC Confirmed Anchors</h1>
<div class="meta">
  Framework: ${escapeHtml(evidence.framework)}<br>
  Evidence Archive: <strong>${escapeHtml(evidence.archiveRevision)}</strong><br>
  Policy: confirmed-anchors-only — no interpolation, no rejected predictions, no lucky guesses
</div>

<table>
  <thead>
    <tr>
      <th>BQC</th>
      <th>Value</th>
      <th>Context (z,y)</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>

<div class="note">
  <strong>Policy enforcement</strong><br>
  • Speculative values such as <code>a9900 = 80.0</code> and <code>b0000 = 100.0</code> are excluded.<br>
  • Rejected blind tests (C4-PF6-P001, C4-PF6-P002) are recorded in the JSON but never appear as evidence rows.<br>
  • Gaps are intentional; no interpolation is performed.<br><br>
  This page is generated from <code>docs/evidence-r0002.json</code> by<br>
  <code>npm run generate:evidence</code>.<br>
  Manual edits to the HTML are forbidden; all changes must first enter the Evidence Archive.
</div>

</body>
</html>
`;
}

function main() {
  const evidence = loadEvidence();
  const html = renderHtml(evidence);
  fs.mkdirSync(path.dirname(HTML_PATH), { recursive: true });
  fs.writeFileSync(HTML_PATH, html, "utf8");
  console.log(`Generated: ${HTML_PATH}`);
  console.log(`Anchors written: ${evidence.anchors.length}`);
}

main();