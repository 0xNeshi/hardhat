import type {
  Artifact,
  ArtifactsManager,
  BuildInfo,
  CompilerInput,
  CompilerOutput,
} from "../../src/types/artifacts.js";
import type { HardhatUserConfig } from "@ignored/hardhat-vnext-core/config";
import type { UnsafeHardhatRuntimeEnvironmentOptions } from "@ignored/hardhat-vnext-core/types/cli";
import type { GlobalOptions } from "@ignored/hardhat-vnext-core/types/global-options";
import type { HookContext } from "@ignored/hardhat-vnext-core/types/hooks";
import type { HardhatRuntimeEnvironment } from "@ignored/hardhat-vnext-core/types/hre";
import type { HardhatPlugin } from "@ignored/hardhat-vnext-core/types/plugins";

import {
  resolveProjectRoot,
  resolvePluginList,
  buildGlobalOptionDefinitions,
  // eslint-disable-next-line no-restricted-imports -- this is used to create the mock
  createBaseHardhatRuntimeEnvironment,
} from "@ignored/hardhat-vnext-core";
import { HardhatError } from "@ignored/hardhat-vnext-errors";

import { BUILTIN_GLOBAL_OPTIONS_DEFINITIONS } from "../../src/internal/builtin-global-options.js";
import { builtinPlugins as originalBuiltinPlugins } from "../../src/internal/builtin-plugins/index.js";

import "../../src/internal/builtin-plugins/artifacts/type-extensions.js";

class MockArtifactsManager implements ArtifactsManager {
  readonly #artifacts: Map<string, Artifact>;

  constructor() {
    this.#artifacts = new Map();
  }

  public async readArtifact(
    contractNameOrFullyQualifiedName: string,
  ): Promise<Artifact> {
    const artifact = this.#artifacts.get(contractNameOrFullyQualifiedName);

    if (artifact === undefined) {
      throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
        message:
          "Unable to find the artifact during mock readArtifact " +
          contractNameOrFullyQualifiedName,
      });
    }

    return artifact;
  }

  public artifactExists(
    _contractNameOrFullyQualifiedName: string,
  ): Promise<boolean> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }

  public getAllFullyQualifiedNames(): Promise<string[]> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }

  public getBuildInfo(
    _fullyQualifiedName: string,
  ): Promise<BuildInfo | undefined> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }

  public getArtifactPaths(): Promise<string[]> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }

  public getDebugFilePaths(): Promise<string[]> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }

  public getBuildInfoPaths(): Promise<string[]> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }

  public async saveArtifactAndDebugFile(
    artifact: Artifact,
    _pathToBuildInfo?: string,
  ): Promise<void> {
    this.#artifacts.set(artifact.contractName, artifact);
  }

  public saveBuildInfo(
    _solcVersion: string,
    _solcLongVersion: string,
    _input: CompilerInput,
    _output: CompilerOutput,
  ): Promise<string> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }

  public formArtifactPathFromFullyQualifiedName(
    _fullyQualifiedName: string,
  ): string {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }

  public clearCache(): void {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
  }
}

const mockArtifactsPlugin: HardhatPlugin = {
  id: "artifacts",
  hookHandlers: {
    hre: async () => {
      return {
        extend: async (
          _context: HookContext,
          hre: HardhatRuntimeEnvironment,
          _next: (
            nextContext: HookContext,
            nextHre: HardhatRuntimeEnvironment,
          ) => Promise<HardhatRuntimeEnvironment>,
        ): Promise<HardhatRuntimeEnvironment> => {
          hre.artifacts = new MockArtifactsManager();

          const returnedFromNext = await _next(_context, hre);

          return returnedFromNext;
        },
      };
    },
  },
};

const mockedBuiltinPlugins: HardhatPlugin[] = [mockArtifactsPlugin];

const builtinPlugins = originalBuiltinPlugins.map((plugin) => {
  const mockedPlugin = mockedBuiltinPlugins.find((mp) => mp.id === plugin.id);

  return mockedPlugin ?? plugin;
});

export async function createMockHardhatRuntimeEnvironment(
  config: HardhatUserConfig,
  userProvidedGlobalOptions: Partial<GlobalOptions> = {},
  projectRoot?: string,
  unsafeOptions: UnsafeHardhatRuntimeEnvironmentOptions = {},
): Promise<HardhatRuntimeEnvironment> {
  const resolvedProjectRoot = await resolveProjectRoot(projectRoot);

  if (unsafeOptions.resolvedPlugins === undefined) {
    const plugins = [...builtinPlugins, ...(config.plugins ?? [])];

    const resolvedPlugins = await resolvePluginList(
      resolvedProjectRoot,
      plugins,
    );

    unsafeOptions.resolvedPlugins = resolvedPlugins;
  }

  if (unsafeOptions.globalOptionDefinitions === undefined) {
    const pluginGlobalOptionDefinitions = buildGlobalOptionDefinitions(
      unsafeOptions.resolvedPlugins,
    );
    const globalOptionDefinitions = new Map([
      ...BUILTIN_GLOBAL_OPTIONS_DEFINITIONS,
      ...pluginGlobalOptionDefinitions,
    ]);

    unsafeOptions.globalOptionDefinitions = globalOptionDefinitions;
  }

  return createBaseHardhatRuntimeEnvironment(
    config,
    userProvidedGlobalOptions,
    resolvedProjectRoot,
    unsafeOptions,
  );
}
