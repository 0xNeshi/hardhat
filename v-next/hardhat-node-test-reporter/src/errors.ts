export class CircularReferenceInErrorChainError extends Error {
  constructor(public readonly errorChain: Error[]) {
    super(
      `Circular reference detected: ${errorChain.map((e) => e.toString()).join(" -> ")}`,
    );

    this.name = this.constructor.name;
  }
}
