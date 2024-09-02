import chalk from "chalk";
import { diff as getDiff } from "jest-diff";

import { indent } from "./formatting.js";
import {
  cleanupTestFailError,
  getErrorChain,
  isCancelledByParentError,
  isTestFileExecutionFailureError,
} from "./node-test-error-utils.js";
import { StackReference } from "./stack-reference.js";

// TODO: Clean up the node internal fames from the stack trace
export function formatError(error: Error): string {
  if (isCancelledByParentError(error)) {
    return (
      chalk.red("Test cancelled by parent error") +
      "\n" +
      chalk.gray(
        indent(
          "This test was cancelled due to an error in its parent suite/it or test/it, or in one of its before/beforeEach",
          4,
        ),
      )
    );
  }

  if (isTestFileExecutionFailureError(error)) {
    return (
      chalk.red(`Test file execution failed (exit code ${error.exitCode}).`) +
      "\n" +
      chalk.gray(indent("Did you forget to await a promise?", 4))
    );
  }

  error = cleanupTestFailError(error);

  const errorChain = getErrorChain(error);

  const messages = errorChain
    .map((message, index) => formatSingleError(message, index !== 0))
    .map((message, index) => indent(message, index * 2));

  return messages.join("\n");
}

function formatSingleError(error: Error, isCause: boolean = false): string {
  const stackLines = (error.stack ?? "").split("\n");

  let message = error.message.split("\n")[0];
  if (stackLines.length > 0 && stackLines[0].includes(message)) {
    message = stackLines[0];
  }
  message = message.replace(" [ERR_ASSERTION]", "").replace(/:$/, "");

  if (isCause) {
    message = `[cause]: ${message}`;
  }

  const diff = getErrorDiff(error);

  const stackReferences: StackReference[] = stackLines
    .map(StackReference.fromString)
    .filter((reference) => reference !== null);

  // Remove all the stack references beyond (Suite|Test|TestHook|...).runInAsyncScope
  // const runInAsyncScopeIndex = stackReferences.findIndex(reference => reference.isTestStart());
  // if (runInAsyncScopeIndex !== -1) {
  //   stackReferences = stackReferences.slice(0, runInAsyncScopeIndex);
  // }

  // Remove all the stack references originating from node
  // stackReferences = stackReferences.filter(reference => !reference.isNode());

  const stack = stackReferences
    .map((reference) => reference.toString())
    .join("\n");

  let formattedError = isCause ? chalk.grey(message) : chalk.red(message);
  if (diff !== undefined) {
    formattedError += `\n${diff}\n`;
  }
  formattedError += `\n${chalk.gray(indent(stack, 4))}`;

  return formattedError;
}

function isDiffableError(
  error: Error,
): error is Error & { actual: any; expected: any } {
  return (
    "expected" in error && "actual" in error && error.expected !== undefined
  );
}

function getErrorDiff(error: Error): string | undefined {
  if (!isDiffableError(error)) {
    return undefined;
  }

  if ("showDiff" in error && error.showDiff === false) {
    return undefined;
  }

  return getDiff(error.expected, error.actual) ?? undefined;
}
