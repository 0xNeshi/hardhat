import type { HardhatPlugin } from "@ignored/hardhat-vnext-core/types/plugins";

import { task } from "@ignored/hardhat-vnext-core/config";

const hardhatPlugin: HardhatPlugin = {
  id: "compile",
  tasks: [
    task("compile", "Compiles the entire project, building all artifacts")
      .addFlag({
        name: "quiet",
        description: "Makes the compilation process less verbose",
      })
      .setAction(import.meta.resolve("./task-action.js"))
      .build(),
  ],
};

export default hardhatPlugin;
