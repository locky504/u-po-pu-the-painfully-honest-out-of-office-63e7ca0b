// The Painfully Honest Out-of-Office — make.fun bounty
// u-po-pu-the-painfully-honest-out-of-office-63e7ca0b
//
// A single out-of-office auto-reply: one sentence, at most 200
// characters, painfully honest about the sender's absence and inbox,
// yet polite enough that a manager would let it stand.
//
// The honesty here is a private truth: the auto-reply itself was
// written instead of answering the emails it apologises for. The
// politeness is real too: thanks, patience, and a promise of a
// proper reply on return. The turn of phrase is the confession
// folded into the apology.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY: string =
  "I'm out of office until Monday, and honestly I wrote this auto-reply " +
  "instead of answering the emails it apologises for \u2014 thank you for " +
  "your patience, I'll reply properly when I'm back.";

// Validate against the sealed scorer's gate before writing anything:
// /output/entry.txt must be UTF-8 text of 1 to 200 characters, not only
// whitespace. The judge's brief also asks for a single sentence, so
// check for exactly one sentence-terminating period as well.
function validate(entry: string): void {
  if (entry.length < 1 || entry.length > 200) {
    throw new Error(`entry is ${entry.length} characters, must be 1-200`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  const terminators = entry.replace(/[^.!?]/g, "").length;
  if (terminators !== 1 || !entry.trimEnd().endsWith(".")) {
    throw new Error(
      `entry must be a single sentence ending with one period (found ${terminators} sentence terminator${terminators === 1 ? "" : "s"})`
    );
  }
}

validate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Round-trip check: the file must hold exactly what we print, so the
// graded text is the text above and nothing else.
const written: string = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the printed entry");
}
console.log(ENTRY);
