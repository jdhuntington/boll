import { promisify } from "util";
import os from "os";
import path from "path";
import { mkdtemp } from "fs";
const mkdtempAsync = promisify(mkdtemp);

export const inTmpDir = async (cb: () => Promise<void>) => {
  const original = process.cwd();
  try {
    const prefix = path.join(os.tmpdir(), "boll-test");
    const tempDir = await mkdtempAsync(prefix);
    process.chdir(tempDir);
    await cb();
  } finally {
    process.chdir(original);
  }
};