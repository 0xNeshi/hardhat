import type { ChainType, DefaultChainType, NetworkConfig } from "./config.js";
import type { EthereumProvider } from "./providers.js";

export interface NetworkManager {
  connect<ChainTypeT extends ChainType = DefaultChainType>(
    networkName?: string,
    chainType?: ChainTypeT,
    networkConfigOverride?: Partial<NetworkConfig>,
  ): Promise<NetworkConnection<ChainTypeT>>;
}

export interface NetworkConnection<ChainTypeT extends ChainType | string> {
  readonly id: number;
  readonly networkName: string;
  readonly networkConfig: NetworkConfig;
  readonly chainType: ChainTypeT;
  readonly provider: EthereumProvider;

  close(): Promise<void>;
}
