import type { Artifact } from "../../src/types/artifacts.js";
import type { HardhatPlugin } from "@ignored/hardhat-vnext-core/types/plugins";

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { task } from "@ignored/hardhat-vnext-core/config";

import { createMockHardhatRuntimeEnvironment } from "../helpers/create-mock-hardhat-runtime-environment.js";

describe("createMockHardhatRuntimeEnvironment", () => {
  it("should allow plugins that leverage the artifact hre object", async () => {
    // arrange

    const myPlugin: HardhatPlugin = {
      id: "my-plugin",
      tasks: [
        task("hello-artifact-using-world", "Tests artifact loading")
          .setAction(async ({}, hre) => {
            return hre.artifacts.readArtifact("MyContract");
          })
          .build(),
      ],
    };

    const mockHre = await createMockHardhatRuntimeEnvironment(
      {
        plugins: [myPlugin],
      },
      {},
      undefined,
      {},
    );

    const exampleArtifact: Artifact = {
      _format: "hh-sol-artifact-1",
      contractName: "MyContract",
      sourceName: "source.sol",
      abi: [],
      bytecode: "0x",
      linkReferences: {},
      deployedBytecode: "0x",
      deployedLinkReferences: {},
    };

    await mockHre.artifacts.saveArtifactAndDebugFile(exampleArtifact);

    // act
    const helloArtifactUsingWorld = mockHre.tasks.getTask(
      "hello-artifact-using-world",
    );

    const result = await helloArtifactUsingWorld.run({});

    // Assert
    assert.equal(result, exampleArtifact);
  });
});
