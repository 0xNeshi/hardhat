import path from "node:path";

export class StackReference {
  public static fromString(candidate: string): StackReference | null {
    const regex = /^at (?:(.+?) \()?(?:(.+?)(?::(\d+))?(?::(\d+))?)\)?$/;
    const match = candidate.trim().match(regex);

    if (match === null) {
      return null;
    }

    const [_, context, location, lineNumber, columnNumber] = match;

    return new StackReference(context, location, lineNumber, columnNumber);
  }

  constructor(
    public readonly context: string | undefined,
    public readonly location: string,
    public readonly lineNumber: string | undefined,
    public readonly columnNumber: string | undefined,
  ) {}

  public isTestStart(): boolean {
    return (
      this.context !== undefined && this.context.endsWith(".runInAsyncScope")
    );
  }

  public isNode(): boolean {
    return this.location.startsWith("node:");
  }

  public getFormattedLocation(): string {
    return this.location
      .replaceAll("\\", path.sep)
      .replaceAll("/", path.sep)
      .replace("file://", "")
      .replace(`${process.cwd()}${path.sep}`, "");
  }

  public toString(): string {
    let result = "at ";

    if (this.context !== undefined) {
      result = `${result}${this.context} (`;
    }

    const location = this.getFormattedLocation();
    result = `${result}${location}`;

    if (this.lineNumber !== undefined) {
      result = `${result}:${this.lineNumber}`;
    }
    if (this.columnNumber !== undefined) {
      result = `${result}:${this.columnNumber}`;
    }

    if (this.context !== undefined) {
      result = `${result})`;
    }

    return result;
  }
}
