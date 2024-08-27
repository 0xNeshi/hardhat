import "@ignored/hardhat-vnext-core/types/config";
import type { ArtifactsManager } from "../../../types/artifacts.js";

declare module "@ignored/hardhat-vnext-core/types/hre" {
  interface HardhatRuntimeEnvironment {
    artifacts: ArtifactsManager;
  }
}
