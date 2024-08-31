import type { HardhatConfig } from "./types/config.js";
import type { GlobalOptions } from "./types/global-options.js";
import type { HookManager } from "./types/hooks.js";
import type { HardhatRuntimeEnvironment } from "./types/hre.js";
import type { TaskManager } from "./types/tasks.js";
import type { UserInterruptionManager } from "./types/user-interruptions.js";

import { createHardhatRuntimeEnvironment } from "./hre.js";
import {
  importUserConfig,
  resolveHardhatConfigPath,
} from "./internal/config-loading.js";
import { resolveProjectRoot } from "./internal/core/hre.js";
import {
  getGlobalHardhatRuntimeEnvironment,
  setGlobalHardhatRuntimeEnvironment,
} from "./internal/global-hre-instance.js";

let maybeHre: HardhatRuntimeEnvironment | undefined =
  getGlobalHardhatRuntimeEnvironment();

// Note: We import the builtin plugins' types here, so that any type extension
// they may have gets loaded.
import "./internal/builtin-plugins/index.js";

if (maybeHre === undefined) {
  /* eslint-disable no-restricted-syntax -- Allow top-level await here */
  const configPath = await resolveHardhatConfigPath();
  const projectRoot = await resolveProjectRoot(configPath);
  const userConfig = await importUserConfig(configPath);

  maybeHre = await createHardhatRuntimeEnvironment(userConfig, {}, projectRoot);
  /* eslint-enable no-restricted-syntax */

  setGlobalHardhatRuntimeEnvironment(maybeHre);
}

const hre: HardhatRuntimeEnvironment = maybeHre;

export const config: HardhatConfig = hre.config;
export const tasks: TaskManager = hre.tasks;
export const globalOptions: GlobalOptions = hre.globalOptions;
export const hooks: HookManager = hre.hooks;
export const interruptions: UserInterruptionManager = hre.interruptions;

export default hre;
