import type {
  Artifact,
  ArtifactsManager,
  BuildInfo,
  CompilerInput,
  CompilerOutput,
} from "../../types/artifacts.js";

import { HardhatError } from "@ignored/hardhat-vnext-errors";

export class ArtifactsManagerImplementation implements ArtifactsManager {
  public readArtifact(
    _contractNameOrFullyQualifiedName: string,
  ): Promise<Artifact> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
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

  public saveArtifactAndDebugFile(
    _artifact: Artifact,
    _pathToBuildInfo?: string,
  ): Promise<void> {
    throw new HardhatError(HardhatError.ERRORS.INTERNAL.ASSERTION_ERROR, {
      message: "Not implemented yet",
    });
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
