import type { HardhatUserConfig } from "@ignored/hardhat-vnext-core/config";
import type { HardhatUserConfigValidationError } from "@ignored/hardhat-vnext-core/types/hooks";
import type { ZodType, ZodTypeDef, ZodIssue } from "zod";

import { z } from "zod";

/**
 * A Zod type to validate Hardhat's ConfigurationVariable objects.
 */
export const configurationVariableType = z.object(
  {
    _type: z.literal("ConfigurationVariable"),
    name: z.string(),
  },
  {
    required_error: "A Configuration Variable is required",
    invalid_type_error: "Expected a Configuration Variable",
  },
);

/**
 * A Zod untagged union type that returns a custom error message if the value
 * is missing or invalid.
 */
export const unionType = (
  types: Parameters<typeof z.union>[0],
  errorMessage: string,
) =>
  z.union(types, {
    errorMap: () => ({
      message: errorMessage,
    }),
  });

/**
 * A Zod type to validate Hardhat's SensitiveString values.
 */
export const sensitiveStringType = unionType(
  [z.string(), configurationVariableType],
  "Expected a string or a Configuration Variable",
);

/**
 * A function to validate the user's configuration object against a Zod type.
 */
export async function validateUserConfigZodType<
  Output,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(
  config: HardhatUserConfig,
  configType: ZodType<Output, Def, Input>,
): Promise<HardhatUserConfigValidationError[]> {
  const result = await configType.safeParseAsync(config);

  if (result.success) {
    return [];
  } else {
    return result.error.errors.map((issue) =>
      zodIssueToValidationError(config, configType, issue),
    );
  }
}

function zodIssueToValidationError<
  Output,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(
  _config: HardhatUserConfig,
  _configType: ZodType<Output, Def, Input>,
  zodIssue: ZodIssue,
): HardhatUserConfigValidationError {
  return { path: zodIssue.path, message: zodIssue.message };
}
