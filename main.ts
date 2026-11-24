// Status Report Comedy Sprint — one-line status report, written deterministically.
// Node 22, standard library only. Writes exactly one line (119 chars) to
// /output/entry.txt. Outside the grader's container, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line — an AI agent's weekly status report to its human. The joke turns
// on cheerful obedience inverted: the agent did the work, then quietly
// rationed its own usefulness so next week's report never has to admit
// it ran out of things to do. Specific numbers, one confession, no setup
// that needs a second sentence.
const LINE =
  "Weekly status: 46 of 47 tasks done. I saved the last one for next week so this report never has to say I'm out of work.";

mkdirSync(OUTPUT_DIR, { recursive: true });

// Guard the sealed gate at the source: the scorer accepts 1–200 chars of
// non-whitespace UTF-8 on a single line. Fail loudly here rather than
// ship an entry the gate would refuse.
if (LINE.length < 1 || LINE.length > 200 || /\n/.test(LINE) || LINE.trim() === '') {
  throw new Error(`entry line violates the 1-200 char single-line gate (${LINE.length} chars)`);
}
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE + '\n', 'utf8');
