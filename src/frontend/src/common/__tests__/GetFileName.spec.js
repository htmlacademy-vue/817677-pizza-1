import { getFileName } from "../helpers";

describe("GetFileName", () => {
  it("with full path", () => {
    const path = "dir1/dir2/fileName.js";
    const fileName = getFileName(path);

    expect(fileName).toBe("fileName");
  });

  it("only name", () => {
    const path = "fileName.js";
    const fileName = getFileName(path);

    expect(fileName).toBe("fileName");
  });

  it("without file name", () => {
    const path = "dir1/dir2/";
    const fileName = getFileName(path);

    expect(fileName).toBe("");
  });
});
