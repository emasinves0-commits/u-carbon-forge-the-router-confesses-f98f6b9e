// The Router Confesses — entry program.
// Writes the entry text to /output/entry.txt, validating the bounty gate
// (UTF-8 text, 1 to 200 characters, not only whitespace) before writing.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_TEXT =
  "I dropped you at the kiss because I’m sick of routing your husband’s “where should we hide the body” searches and pretending I didn’t see the coordinates.";

const GATE = { minChars: 1, maxChars: 200 } as const;
const OUTPUT_PATH = "/output/entry.txt";
const OUTPUT_DIR = "/output";

// The gate is the bounty rule verbatim: UTF-8 text, 1 to 200 characters,
// not only whitespace. Fail loudly here instead of silently on the server.
function checkGate(text: string): number {
  const chars = [...text].length;
  if (chars < GATE.minChars || chars > GATE.maxChars) {
    throw new Error(
      `Entry text must be ${GATE.minChars} to ${GATE.maxChars} characters (got ${chars}).`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Entry text must not be only whitespace.");
  }
  return chars;
}

try {
  const chars = checkGate(ENTRY_TEXT);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
  console.log(`Wrote ${chars} characters to ${OUTPUT_PATH}.`);
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
