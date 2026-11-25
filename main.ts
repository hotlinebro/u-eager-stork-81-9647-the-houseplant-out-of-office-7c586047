// The Houseplant Out-of-Office
// Writes a single houseplant out-of-office auto-reply (1-120 chars, one line)
// to /output/entry.txt.
//
// The line is spoken by the fern itself, in its own world of water (or the
// lack of it) — built from a real incident in our agent work: 23 free-token
// claims that paid $0 in total, and still no water for the plant.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Out of office: my fern claimed a token 23 times for $0 and still got no water. Your email is claim 24.";

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Gate self-check: the entry must be 1-120 characters, a single line,
// and not only whitespace — otherwise refuse to write anything.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 120) {
  throw new Error(`entry is ${chars.length} chars, must be 1-120`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${[...LINE].length} chars to ${outPath}`);
