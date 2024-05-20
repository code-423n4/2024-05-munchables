import dotenv from "dotenv";
import { Address, createPublicClient, createWalletClient, http, zeroAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { blast, blastSepolia } from "viem/chains";
import {
  AIRNODE_CONTRACT_MAINNET,
  AIRNODE_CONTRACT_TESTNET,
  AIRNODE_ENDPOINT_ID_MAINNET,
  AIRNODE_ENDPOINT_ID_TESTNET,
  AIRNODE_RPV0_MAINNET,
  AIRNODE_RPV0_TESTNET,
  AIRNODE_SPONSOR_MAINNET,
  AIRNODE_SPONSOR_TESTNET,
  AIRNODE_SPONSOR_WALLET_MAINNET,
  AIRNODE_SPONSOR_WALLET_TESTNET,
  BLAST,
  BLAST_POINTS_MAINNET,
  BLAST_POINTS_TESTNET,
  ConfigType,
  ContractNames,
  ENV,
  IndividualConfigType,
  IndividualConfigTypeWithoutClients,
  MSIG_MAINNET,
  MSIG_TESTNET,
  OLD_MUNCH_NFT_MAINNET,
  OLD_MUNCH_NFT_TESTNET,
  POINTS_OPERATOR,
  Role,
  USDB_MAINNET,
  USDB_TESTNET,
  WETH_MAINNET,
  WETH_TESTNET,
} from "./config-consts";

dotenv.config();

const PKEY = privateKeyToAccount(process.env.PRIVATE_KEY as Address);

/// ALL PUBLIC CLIENTS
const blastTestnetPublicClient = createPublicClient({
  chain: blastSepolia,
  transport: http(process.env.BLAST_TESTNET),
  batch: {
    multicall: true,
  },
});
const cloneTestnetPublicClient = createPublicClient({
  chain: blastSepolia,
  transport: http(process.env.BLAST_NODE),
  batch: {
    multicall: true,
  },
});

const blastMainnetPublicClient = createPublicClient({
  chain: blast,
  transport: http(process.env.BLAST_MAINNET),
  batch: {
    multicall: true,
  },
});
const cloneMainnetPublicClient = createPublicClient({
  chain: blast,
  transport: http(process.env.BLAST_NODE),
  batch: {
    multicall: true,
  },
});

/// ALL WALLET CLIENTS
const sepoliaWalletClient = createWalletClient({
  chain: blastSepolia,
  transport: http(process.env.BLAST_TESTNET),
  account: PKEY,
});
const cloneTestnetWalletClient = createWalletClient({
  chain: blastSepolia,
  transport: http(process.env.BLAST_NODE),
  account: PKEY,
});

const mainnetWalletClient = createWalletClient({
  chain: blast,
  transport: http(process.env.BLAST_MAINNET),
  account: PKEY,
});

const cloneMainnetWalletClient = createWalletClient({
  chain: blast,
  transport: http(process.env.BLAST_NODE),
  account: PKEY,
});

/// EXTERNAL CONFIG

const configTestnet: IndividualConfigTypeWithoutClients = {
  chainId: 168587773,
  verifierUrl: "https://api-sepolia.blastscan.io/api",
  verifierApiKey: process.env.VERIFIER_API_KEY,
  externalAddresses: {
    pointsOperator: POINTS_OPERATOR,
    usdb: USDB_TESTNET,
    weth: WETH_TESTNET,
    blast: BLAST,
    blastPoints: BLAST_POINTS_TESTNET,
    oldMunchNFT: OLD_MUNCH_NFT_TESTNET,
    treasury: MSIG_TESTNET,
    airnodeRpv: AIRNODE_RPV0_TESTNET,
    airnodeContract: AIRNODE_CONTRACT_TESTNET,
    airnodeSponsor: AIRNODE_SPONSOR_TESTNET,
    airnodeSponsorWallet: AIRNODE_SPONSOR_WALLET_TESTNET,
    airnodeEndpointId: AIRNODE_ENDPOINT_ID_TESTNET,
  },
  universalRoles: {
    [Role.Admin]: MSIG_TESTNET,
  },
  contractRoles: {
    [ContractNames.AccountManagerProxy]: {
      [Role.SocialApproval_1]: PKEY.address,
      [Role.Social_1]: PKEY.address,
      [Role.SocialApproval_2]: zeroAddress,
      [Role.Social_2]: zeroAddress,
      [Role.SocialApproval_3]: zeroAddress,
      [Role.Social_3]: zeroAddress,
      [Role.SocialApproval_4]: zeroAddress,
      [Role.Social_4]: zeroAddress,
      [Role.SocialApproval_5]: zeroAddress,
      [Role.Social_5]: zeroAddress,
    },
    [ContractNames.ClaimManagerProxy]: {
      [Role.NewPeriod]: PKEY.address,
    },
    [ContractNames.LockManager]: {
      [Role.PriceFeed_1]: PKEY.address,
      [Role.PriceFeed_2]: zeroAddress, // TODO : We need another address here to approve
      [Role.PriceFeed_3]: zeroAddress,
      [Role.PriceFeed_4]: zeroAddress,
      [Role.PriceFeed_5]: zeroAddress,
    },
    [ContractNames.RewardsManager]: {
      [Role.Minter]: PKEY.address,
      [Role.ClaimYield]: PKEY.address,
    },
    [ContractNames.MunchNFT]: {
      [Role.NFTOracle]: PKEY.address,
    },
    [ContractNames.RNGProxySelfHosted]: {
      [Role.NFTOracle]: PKEY.address,
    },
    [ContractNames.RNGProxyApi3]: {
      [Role.NFTOracle]: AIRNODE_RPV0_TESTNET,
    },
  },
  deployOldNFT: true,
  selfHostProxy: false,
  storeOutput: true,
};

const configMainnet: IndividualConfigTypeWithoutClients = {
  chainId: 81457,
  verifierUrl: "https://api.blastscan.io/api",
  verifierApiKey: process.env.VERIFIER_API_KEY,
  externalAddresses: {
    pointsOperator: POINTS_OPERATOR,
    usdb: USDB_MAINNET,
    weth: WETH_MAINNET,
    blast: BLAST,
    blastPoints: BLAST_POINTS_MAINNET,
    oldMunchNFT: OLD_MUNCH_NFT_MAINNET,
    treasury: MSIG_MAINNET,
    airnodeRpv: AIRNODE_RPV0_MAINNET,
    airnodeContract: AIRNODE_CONTRACT_MAINNET,
    airnodeSponsor: AIRNODE_SPONSOR_MAINNET,
    airnodeSponsorWallet: AIRNODE_SPONSOR_WALLET_MAINNET,
    airnodeEndpointId: AIRNODE_ENDPOINT_ID_MAINNET,
  },
  universalRoles: {
    [Role.Admin]: MSIG_MAINNET,
  },
  // TODO: Set these to real mainnet roles
  contractRoles: {
    [ContractNames.AccountManagerProxy]: {
      [Role.SocialApproval_1]: PKEY.address,
      [Role.Social_1]: PKEY.address,
      [Role.SocialApproval_2]: zeroAddress,
      [Role.Social_2]: zeroAddress,
      [Role.SocialApproval_3]: zeroAddress,
      [Role.Social_3]: zeroAddress,
      [Role.SocialApproval_4]: zeroAddress,
      [Role.Social_4]: zeroAddress,
      [Role.SocialApproval_5]: zeroAddress,
      [Role.Social_5]: zeroAddress,
    },
    [ContractNames.ClaimManagerProxy]: {
      [Role.NewPeriod]: PKEY.address,
    },
    [ContractNames.LockManager]: {
      [Role.PriceFeed_1]: PKEY.address,
      [Role.PriceFeed_2]: zeroAddress, // TODO : We need another address here to approve
      [Role.PriceFeed_3]: zeroAddress,
      [Role.PriceFeed_4]: zeroAddress,
      [Role.PriceFeed_5]: zeroAddress,
    },
    [ContractNames.RewardsManager]: {
      [Role.Minter]: PKEY.address,
      [Role.ClaimYield]: PKEY.address,
    },
    [ContractNames.MunchNFT]: {
      [Role.NFTOracle]: PKEY.address,
    },
    [ContractNames.RNGProxySelfHosted]: {
      [Role.NFTOracle]: PKEY.address,
    },
    [ContractNames.RNGProxyApi3]: {
      [Role.NFTOracle]: AIRNODE_RPV0_MAINNET,
    },
  },
  deployOldNFT: false,
  selfHostProxy: false,
  storeOutput: true,
};

export const CONFIG: ConfigType = {
  [ENV.TESTNET]: {
    publicClient: blastTestnetPublicClient,
    walletClient: sepoliaWalletClient,
    ...configTestnet,
  },
  [ENV.CLONE_TESTNET]: {
    publicClient: cloneTestnetPublicClient,
    walletClient: cloneTestnetWalletClient,
    ...configTestnet,
  },
  [ENV.MAINNET]: {
    publicClient: blastMainnetPublicClient,
    walletClient: mainnetWalletClient,
    ...configMainnet,
  },
  [ENV.CLONE_MAINNET]: {
    publicClient: cloneMainnetPublicClient,
    walletClient: cloneMainnetWalletClient,
    ...configMainnet,
  },
};

export function getConfig(env: string) {
  const selfHostProxy = process.env.SELF_HOST_RNG === "true";
  const storeOutputClones = process.env.STORE_OUTPUT_CLONES === "true";
  let currentConfig: IndividualConfigType;
  switch (env) {
    case ENV.CLONE_TESTNET:
      currentConfig = CONFIG[ENV.CLONE_TESTNET] as IndividualConfigType;
      currentConfig.storeOutput = storeOutputClones;
      break;
    case ENV.CLONE_MAINNET:
      currentConfig = CONFIG[ENV.CLONE_MAINNET] as IndividualConfigType;
      currentConfig.storeOutput = storeOutputClones;
      break;
    case ENV.MAINNET:
      currentConfig = CONFIG[ENV.MAINNET] as IndividualConfigType;
      break;
    case ENV.TESTNET:
      currentConfig = CONFIG[ENV.TESTNET] as IndividualConfigType;
      break;
    default:
      console.error(
        "Please assign ENV to one of: clone-testnet, clone-mainnet, mainnet, or testnet"
      );
      process.exit(1);
  }

  currentConfig.selfHostProxy = selfHostProxy;
  currentConfig.env = env;

  return currentConfig;
}
