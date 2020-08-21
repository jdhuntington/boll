import baretest from "baretest";
import * as assert from "assert";
import { Suite } from "../lib/suite";
import { NullLogger } from "../lib/logger";
import { inFixtureDir } from "./test-helper";
export const test = baretest("e2e");

const suite = new Suite();

test("should catch an error in project-a", async () => {
  await inFixtureDir("project-a", async () => {
    const result = await suite.run(NullLogger);
    assert.equal(1, result.errors.length);
  });
});

test("should catch an error in project-b", async () => {
  await inFixtureDir("project-b", async () => {
    const result = await suite.run(NullLogger);
    assert.equal(1, result.errors.length);
  });
});

test("should find no issues with clean-project", async () => {
  await inFixtureDir("clean", async () => {
    const result = await suite.run(NullLogger);
    assert.equal(0, result.errors.length);
  });
});