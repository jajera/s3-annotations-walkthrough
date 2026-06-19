import * as fc from "fast-check";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  REQUIRED_IMAGES,
  REQUIRED_PUBLIC_FILES,
} from "../fixtures/required-slugs";

const IMAGES_DIR = join(process.cwd(), "public/images");
const PUBLIC_DIR = join(process.cwd(), "public");

describe("Feature: s3-annotations-walkthrough, Property 6: Required static assets", () => {
  it("all required images exist in public/images/", () => {
    fc.assert(
      fc.property(fc.constantFrom(...REQUIRED_IMAGES), (filename) => {
        expect(existsSync(join(IMAGES_DIR, filename))).toBe(true);
      }),
      { numRuns: Math.max(100, REQUIRED_IMAGES.length) },
    );
  });

  it("og image assets exist in public/", () => {
    fc.assert(
      fc.property(fc.constantFrom(...REQUIRED_PUBLIC_FILES), (filename) => {
        expect(existsSync(join(PUBLIC_DIR, filename))).toBe(true);
      }),
      { numRuns: Math.max(100, REQUIRED_PUBLIC_FILES.length) },
    );
  });
});
