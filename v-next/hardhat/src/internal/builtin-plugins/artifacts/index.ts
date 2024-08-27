import type { HardhatPlugin } from "@ignored/hardhat-vnext-core/types/plugins";

import "./type-extensions.js";

const hardhatPlugin: HardhatPlugin = {
  id: "artifacts",
  hookHandlers: {
    hre: import.meta.resolve("./hookHandlers/hre.js"),
  },
};

export default hardhatPlugin;
