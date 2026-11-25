// make.fun entry: The Worst App Idea Ever Pitched
// Writes one single-sentence pitch (<= 240 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const entry =
  "PerMyLastEmail CCs your boss on every email you never sent, then follows up hourly to ask why you have not replied to the draft still sitting in your outbox.";

// Gate validation: the sealed scorer requires 1-240 chars of non-whitespace
// UTF-8 text, and the brief requires exactly one sentence. Fail loudly
// rather than silently writing an entry the gate would refuse.
const chars = [...entry].length;
if (chars < 1 || chars > 240) {
  throw new Error(`entry is ${chars} characters, must be 1-240`);
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if ((entry.match(/\./g) ?? []).length !== 1 || !entry.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending in a period");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
