import type {
  HardhatRuntimeEnvironmentHooks,
  HookContext,
} from "@ignored/hardhat-vnext-core/types/hooks";
import type { HardhatRuntimeEnvironment } from "@ignored/hardhat-vnext-core/types/hre";

import { ArtifactsManagerImplementation } from "../../../artifacts/artifacts-manager.js";

export default async (): Promise<Partial<HardhatRuntimeEnvironmentHooks>> => {
  const handlers: Partial<HardhatRuntimeEnvironmentHooks> = {
    extend: async (
      _context: HookContext,
      hre: HardhatRuntimeEnvironment,
      _next: (
        nextContext: HookContext,
        nextHre: HardhatRuntimeEnvironment,
      ) => Promise<HardhatRuntimeEnvironment>,
    ): Promise<HardhatRuntimeEnvironment> => {
      hre.artifacts = new ArtifactsManagerImplementation();

      const returnedFromNext = await _next(_context, hre);

      return returnedFromNext;
    },
  };

  return handlers;
};
