import path from "path";
import { Account, Address, Chain, ParseAccount, PublicClient, Transport, WalletClient } from "viem";
import {
  accountManagerAbi,
  bonusManagerAbi,
  claimManagerAbi,
  configStorageAbi,
  fundTreasuryDistributorAbi,
  lockManagerAbi,
  migrationManagerAbi,
  munchNftAbi,
  munchadexManagerAbi,
  nftAttributesManagerV1Abi,
  nftOverlordAbi,
  oldMunchNftAbi,
  primordialManagerAbi,
  proxyFactoryAbi,
  rewardsManagerAbi,
  rngProxyApi3Abi,
  rngProxySelfHostedAbi,
  snuggeryManagerAbi,
} from "../../abi/generated";
import AccountManager from "../../out/AccountManager.sol/AccountManager.json";
import BonusManager from "../../out/BonusManager.sol/BonusManager.json";
import ClaimManager from "../../out/ClaimManager.sol/ClaimManager.json";
import ConfigStorage from "../../out/ConfigStorage.sol/ConfigStorage.json";
import FundTreasuryDistributor from "../../out/FundTreasuryDistributor.sol/FundTreasuryDistributor.json";
import LockManager from "../../out/LockManager.sol/LockManager.json";
import MigrationManager from "../../out/MigrationManager.sol/MigrationManager.json";
import MunchNFT from "../../out/MunchNFT.sol/MunchNFT.json";
import MunchadexManager from "../../out/MunchadexManager.sol/MunchadexManager.json";
import NFTAttributesManagerV1 from "../../out/NFTAttributeManagerV1.sol/NFTAttributesManagerV1.json";
import NFTOverlord from "../../out/NFTOverlord.sol/NFTOverlord.json";
import OldMunchNFT from "../../out/OldMunchNFT.sol/OldMunchNFT.json";
import PrimordialManager from "../../out/PrimordialManager.sol/PrimordialManager.json";
import ProxyFactory from "../../out/ProxyFactory.sol/ProxyFactory.json";
import RNGProxyAPI3 from "../../out/RNGProxyAPI3.sol/RNGProxyAPI3.json";
import RNGProxySelfHosted from "../../out/RNGProxySelfHosted.sol/RNGProxySelfHosted.json";
import RewardsManager from "../../out/RewardsManager.sol/RewardsManager.json";
import SnuggeryManager from "../../out/SnuggeryManager.sol/SnuggeryManager.json";
import {
  LEVEL_THRESHOLDS,
  PRIMORDIAL_LEVEL_THRESHOLDS,
  RARITY_BONUSES,
  REALM_BONUSES,
  REALM_LOOKUPS,
} from "./consts";

export const CACHE_DIR = path.join("deployments", "cache");

export enum ContractNames {
  ConfigStorage = "configStorage",
  AccountManagerRoot = "accountManagerRoot",
  AccountManagerProxy = "accountManagerProxy",
  ClaimManagerRoot = "claimManagerRoot",
  ClaimManagerProxy = "claimManagerProxy",
  LockManager = "lockManager",
  MigrationManager = "migrationManager",
  NFTOverlord = "nftOverlord",
  NFTAttributesManagerV1 = "nftAttributesManagerV1",
  RewardsManager = "rewardsManager",
  OldMunchNFT = "oldMunchNFT",
  OldMunchNFTProxy = "oldMunchNFTProxy",
  MunchNFT = "munchNFT",
  FundTreasuryDistributor = "fundTreasuryDistributor",
  RNGProxySelfHosted = "rngProxySelfHosted",
  RNGProxyApi3 = "rngProxyApi3",
  BonusManager = "bonusManager",
  ProxyFactory = "proxyFactory",
  SnuggeryManager = "snuggeryManager",
  MunchadexManager = "munchadexManager",
  PrimordialManager = "primordialManager",
}

export enum ENV {
  UNKNOWN = "unknown",
  TESTNET = "testnet",
  MAINNET = "mainnet",
  CLONE_TESTNET = "clone-testnet",
  CLONE_MAINNET = "clone-mainnet",
}

// See if there is a way to import this directly from wagmi/foundry
export enum StorageKey {
  Many,
  Paused,
  LockManager,
  AccountManager,
  ClaimManager,
  MigrationManager,
  NFTOverlord,
  SnuggeryManager,
  PrimordialManager,
  MunchadexManager,
  MunchNFT,
  MunchToken,
  RewardsManager,
  YieldDistributor,
  GasFeeDistributor,
  BlastContract,
  BlastPointsContract,
  BlastPointsOperator,
  USDBContract,
  WETHContract,
  RNGProxyContract,
  NFTAttributesManager,
  Treasury,
  OldMunchNFT,
  MaxLockDuration,
  DefaultSnuggerySize,
  MaxRevealQueue,
  MaxSchnibbleSpray,
  PetTotalSchnibbles,
  NewSlotCost,
  PrimordialsEnabled,
  BonusManager,
  ReferralBonus,
  RealmBonuses,
  RarityBonuses,
  LevelThresholds,
  PrimordialLevelThresholds,
  TotalMunchables,
  MunchablesPerRealm,
  MunchablesPerRarity,
  RaritySetBonuses,
  PointsPerPeriod,
  PointsPerToken,
  SwapEnabled,
  PointsPerMigratedNFT,
  PointsPerUnrevealedNFT,
  MinETHPetBonus,
  MaxETHPetBonus,
  PetBonusMultiplier,
  RealmLookups,
  // Species & Probabilities
  CommonSpecies,
  RareSpecies,
  EpicSpecies,
  LegendarySpecies,
  MythicSpecies,
  CommonPercentage,
  RarePercentage,
  EpicPercentage,
  LegendaryPercentage,
  MythicPercentage,
  MigrationBonus,
  MigrationBonusEndTime,
  MigrationDiscountFactor,
}

enum CONFIG_FUNCTIONS {
  setSmallInt = "setSmallInt",
  setUint = "setUint",
  setBool = "setBool",
  setSmallUintArray = "setSmallUintArray",
  setUintArray = "setUintArray",
  setSmallIntArray = "setSmallIntArray",
}

interface DefaultVariable {
  [x: string]: {
    value: bigint | boolean | number | bigint[] | number[] | boolean[];
    func: CONFIG_FUNCTIONS;
  };
}

export const DEFAULT_VARIABLES: DefaultVariable = {
  [StorageKey.DefaultSnuggerySize]: {
    value: 6,
    func: CONFIG_FUNCTIONS.setSmallInt,
  },
  [StorageKey.MaxLockDuration]: {
    value: 60 * 60 * 24 * 90,
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.MaxRevealQueue]: { value: 5, func: CONFIG_FUNCTIONS.setSmallInt },
  [StorageKey.MaxSchnibbleSpray]: {
    value: 100,
    func: CONFIG_FUNCTIONS.setSmallInt,
  },
  [StorageKey.PetTotalSchnibbles]: {
    value: 11n,
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.NewSlotCost]: {
    value: BigInt(0),
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.PrimordialsEnabled]: {
    value: false,
    func: CONFIG_FUNCTIONS.setBool,
  },
  [StorageKey.ReferralBonus]: {
    value: BigInt(2),
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.RealmBonuses]: {
    value: REALM_BONUSES,
    func: CONFIG_FUNCTIONS.setSmallIntArray,
  },
  [StorageKey.RarityBonuses]: {
    value: RARITY_BONUSES,
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.LevelThresholds]: {
    value: LEVEL_THRESHOLDS,
    func: CONFIG_FUNCTIONS.setUintArray,
  },
  [StorageKey.PrimordialLevelThresholds]: {
    value: PRIMORDIAL_LEVEL_THRESHOLDS,
    func: CONFIG_FUNCTIONS.setUintArray,
  },
  [StorageKey.TotalMunchables]: {
    value: BigInt(125),
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.MunchablesPerRealm]: {
    value: [24, 20, 25, 26, 30],
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.MunchablesPerRarity]: {
    value: [0, 42, 23, 13, 6, 1],
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.RaritySetBonuses]: {
    value: [0, 3, 6, 12, 20, 25],
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.PointsPerPeriod]: {
    value: BigInt(1e7) * BigInt(1e18), // 10 million
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.PointsPerMigratedNFT]: {
    // TODO: Figure out what these should be
    value: [
      BigInt(0),
      BigInt(1000),
      BigInt(1000),
      BigInt(1000),
      BigInt(1000),
      BigInt(1000),
      BigInt(1000),
    ],
    func: CONFIG_FUNCTIONS.setUintArray,
  },
  [StorageKey.PointsPerUnrevealedNFT]: {
    // TODO: Figure out how much this should be as well
    value: BigInt(1000), // 1000
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.MinETHPetBonus]: {
    value: BigInt(1e18),
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.MaxETHPetBonus]: {
    value: BigInt(5e18),
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.PetBonusMultiplier]: {
    value: 100,
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.RealmLookups]: {
    value: REALM_LOOKUPS,
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },

  // Species Defaults
  [StorageKey.CommonSpecies]: {
    value: [
      1, 2, 3, 5, 6, 8, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 26, 27, 28, 29, 30, 32, 35, 41, 42,
      43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 55, 56, 58, 59, 61, 64, 66,
    ],
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.RareSpecies]: {
    value: [
      4, 10, 11, 21, 24, 34, 36, 37, 38, 40, 54, 57, 62, 71, 72, 79, 83, 93, 103, 105, 108, 109,
      125,
    ],
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.EpicSpecies]: {
    value: [7, 9, 25, 31, 33, 60, 63, 73, 82, 95, 110, 118, 120],
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.LegendarySpecies]: {
    value: [22, 39, 53, 65, 76, 124],
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.MythicSpecies]: {
    value: [78],
    func: CONFIG_FUNCTIONS.setSmallUintArray,
  },
  [StorageKey.CommonPercentage]: {
    value: 648000,
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.RarePercentage]: {
    value: 237000,
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.EpicPercentage]: { value: 92000, func: CONFIG_FUNCTIONS.setUint },
  [StorageKey.LegendaryPercentage]: {
    value: 20000,
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.MythicPercentage]: {
    value: 3000,
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.MigrationBonus]: {
    value: BigInt(25e16),
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.MigrationBonusEndTime]: {
    // arbitrary, need to set to something legit
    value: BigInt(1716492418),
    func: CONFIG_FUNCTIONS.setUint,
  },
  [StorageKey.MigrationDiscountFactor]: {
    value: BigInt(5e12),
    func: CONFIG_FUNCTIONS.setUint,
  },
};

export enum Role {
  Admin = 0,
  Social_1,
  Social_2,
  Social_3,
  Social_4,
  Social_5,
  SocialApproval_1,
  SocialApproval_2,
  SocialApproval_3,
  SocialApproval_4,
  SocialApproval_5,
  PriceFeed_1,
  PriceFeed_2,
  PriceFeed_3,
  PriceFeed_4,
  PriceFeed_5,
  Snapshot,
  NewPeriod,
  ClaimYield,
  Minter,
  NFTOracle,
}

export const TOKEN_ATTRIBUTES = {
  nft: {
    name: "Munchables NFT",
    symbol: "MUNCH_NFT",
  },
  token: {
    name: "Munchables Token",
    symbol: "MUNCH",
  },
};

export const LOCKDROP_CONFIG_TOKENS = {
  usdb: {
    usdPrice: BigInt(1e18),
    nftCost: BigInt(3000e18),
    decimals: 18,
    active: true,
  },
  weth: {
    usdPrice: BigInt(3000e18),
    nftCost: BigInt(1e18),
    decimals: 18,
    active: true,
  },
  eth: {
    usdPrice: BigInt(3000e18),
    nftCost: BigInt(1e18),
    decimals: 18,
    active: true,
  },
};

/// STATIC UNIVERSAL ADDRESSES
export const MSIG_MAINNET = "0x60eDE8542eC44e95846a5F3c1CE22DB4D0f21b39" as Address;
export const MSIG_TESTNET = "0x17A13D87CfeF4BBbF2E1CA5F7C7C524AbDAc9266" as Address;
export const POINTS_OPERATOR = "0x38b0bea28E8699Bbf8DD52412237730e5F4C5A8e" as Address;
export const RNG_PROXY_TESTNET = "0x438B24bACBfef7B9CFc053d0C1cff4b9FC8C60A6" as Address;
export const RNG_PROXY_MAINNET = "0x" as Address;
export const BLAST = "0x4300000000000000000000000000000000000002" as Address;
export const BLAST_POINTS_MAINNET = "0x2536FE9ab3F511540F2f9e2eC2A805005C3Dd800" as Address;
export const BLAST_POINTS_TESTNET = "0x2fc95838c71e76ec69ff817983BFf17c710F34E0" as Address;
export const USDB_MAINNET = "0x4300000000000000000000000000000000000003" as Address;
export const USDB_TESTNET = "0x4200000000000000000000000000000000000022" as Address;
export const WETH_MAINNET = "0x4300000000000000000000000000000000000004" as Address;
export const WETH_TESTNET = "0x4200000000000000000000000000000000000023" as Address;

// API 3
export const AIRNODE_RPV0_MAINNET = "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd" as Address;
export const AIRNODE_SPONSOR_MAINNET = "0x34Da93ece7091E8a21Fd08DFAFfCD16cDd1D715a" as Address;
export const AIRNODE_SPONSOR_WALLET_MAINNET =
  "0x224e030f03Cd3440D88BD78C9BF5Ed36458A1A25" as Address;
export const AIRNODE_CONTRACT_MAINNET = "0x224e030f03Cd3440D88BD78C9BF5Ed36458A1A25" as Address;
export const AIRNODE_ENDPOINT_ID_MAINNET: `0x${string}` =
  "0xffd1bbe880e7b2c662f6c8511b15ff22d12a4a35d5c8c17202893a5f10e25284";

export const AIRNODE_RPV0_TESTNET = "0xD223DfDCb888CA1539bb3459a83c543A1608F038" as Address;
// npx @api3/airnode-admin derive-sponsor-wallet-address --airnode-address 0x6238772544f029ecaBfDED4300f13A3c4FE84E1D
// --airnode-xpub xpub6CuDdF9zdWTRuGybJPuZUGnU4suZowMmgu15bjFZT2o6PUtk4Lo78KGJUGBobz3pPKRaN9sLxzj21CMe6StP3zUsd8tWEJPgZBesYBMY7Wo
// --sponsor-address 0x34Da93ece7091E8a21Fd08DFAFfCD16cDd1D715a
// > 0xAd36051e05AeAF6777a2fD0353a21E948F6D5be9
// call the following with the sponsor address
// https://sepolia.blastexplorer.io/address/0xD223DfDCb888CA1539bb3459a83c543A1608F038/contract/168587773/writeContract
// setSponsorshipStatus(rngProxyAddress, true)
export const AIRNODE_SPONSOR_TESTNET = "0x34Da93ece7091E8a21Fd08DFAFfCD16cDd1D715a" as Address;
export const AIRNODE_SPONSOR_WALLET_TESTNET =
  "0xAd36051e05AeAF6777a2fD0353a21E948F6D5be9" as Address;
export const AIRNODE_CONTRACT_TESTNET = "0x6238772544f029ecaBfDED4300f13A3c4FE84E1D" as Address;
export const AIRNODE_ENDPOINT_ID_TESTNET: `0x${string}` =
  "0x94555f83f1addda23fdaa7c74f27ce2b764ed5cc430c66f5ff1bcf39d583da36";

export const OLD_MUNCH_NFT_MAINNET = "0xd8261B960e74228Dfcdd8c7C9200D8879527bF4a" as Address;
// TODO: Deploy old muncher on testnet
export const OLD_MUNCH_NFT_TESTNET = "0x0000000000000000000000000000000000000000" as Address;

/// EXTERNAL CONTRACTS

export type Contract<Abi> = {
  abi: Abi;
  bytecode: Address;
  contractTitle: string;
};

export type Contracts = {
  [ContractNames.ConfigStorage]: Contract<typeof configStorageAbi>;
  [ContractNames.AccountManagerRoot]: Contract<typeof accountManagerAbi>;
  [ContractNames.AccountManagerProxy]: Contract<typeof proxyFactoryAbi>;
  [ContractNames.ClaimManagerRoot]: Contract<typeof claimManagerAbi>;
  [ContractNames.ClaimManagerProxy]: Contract<typeof proxyFactoryAbi>;
  [ContractNames.LockManager]: Contract<typeof lockManagerAbi>;
  [ContractNames.SnuggeryManager]: Contract<typeof snuggeryManagerAbi>;
  [ContractNames.MunchadexManager]: Contract<typeof munchadexManagerAbi>;
  [ContractNames.MigrationManager]: Contract<typeof migrationManagerAbi>;
  [ContractNames.NFTOverlord]: Contract<typeof nftOverlordAbi>;
  [ContractNames.NFTAttributesManagerV1]: Contract<typeof nftAttributesManagerV1Abi>;
  [ContractNames.RewardsManager]: Contract<typeof rewardsManagerAbi>;
  [ContractNames.OldMunchNFT]: Contract<typeof oldMunchNftAbi>;
  [ContractNames.OldMunchNFTProxy]: Contract<typeof proxyFactoryAbi>;
  [ContractNames.MunchNFT]: Contract<typeof munchNftAbi>;
  [ContractNames.FundTreasuryDistributor]: Contract<typeof fundTreasuryDistributorAbi>;
  [ContractNames.RNGProxySelfHosted]: Contract<typeof rngProxySelfHostedAbi>;
  [ContractNames.RNGProxyApi3]: Contract<typeof rngProxyApi3Abi>;
  [ContractNames.BonusManager]: Contract<typeof bonusManagerAbi>;
  [ContractNames.PrimordialManager]: Contract<typeof primordialManagerAbi>;
};

export const CONTRACTS: Contracts = {
  [ContractNames.ConfigStorage]: {
    abi: configStorageAbi,
    bytecode: ConfigStorage.bytecode.object as Address,
    contractTitle: "ConfigStorage",
  },
  [ContractNames.AccountManagerRoot]: {
    abi: accountManagerAbi,
    bytecode: AccountManager.bytecode.object as Address,
    contractTitle: "AccountManager",
  },
  [ContractNames.AccountManagerProxy]: {
    abi: proxyFactoryAbi,
    bytecode: ProxyFactory.bytecode.object as Address,
    contractTitle: "ProxyFactory",
  },
  [ContractNames.ClaimManagerRoot]: {
    abi: claimManagerAbi,
    bytecode: ClaimManager.bytecode.object as Address,
    contractTitle: "ClaimManager",
  },
  [ContractNames.ClaimManagerProxy]: {
    abi: proxyFactoryAbi,
    bytecode: ProxyFactory.bytecode.object as Address,
    contractTitle: "ProxyFactory",
  },
  [ContractNames.LockManager]: {
    abi: lockManagerAbi,
    bytecode: LockManager.bytecode.object as Address,
    contractTitle: "LockManager",
  },
  [ContractNames.SnuggeryManager]: {
    abi: snuggeryManagerAbi,
    bytecode: SnuggeryManager.bytecode.object as Address,
    contractTitle: "SnuggeryManager",
  },
  [ContractNames.MunchadexManager]: {
    abi: munchadexManagerAbi,
    bytecode: MunchadexManager.bytecode.object as Address,
    contractTitle: "MunchadexManager",
  },
  [ContractNames.MigrationManager]: {
    abi: migrationManagerAbi,
    bytecode: MigrationManager.bytecode.object as Address,
    contractTitle: "MigrationManager",
  },
  [ContractNames.NFTOverlord]: {
    abi: nftOverlordAbi,
    bytecode: NFTOverlord.bytecode.object as Address,
    contractTitle: "NFTOverlord",
  },
  [ContractNames.NFTAttributesManagerV1]: {
    abi: nftAttributesManagerV1Abi,
    bytecode: NFTAttributesManagerV1.bytecode.object as Address,
    contractTitle: "NFTAttributesManagerV1",
  },
  [ContractNames.RewardsManager]: {
    abi: rewardsManagerAbi,
    bytecode: RewardsManager.bytecode.object as Address,
    contractTitle: "RewardsManager",
  },
  [ContractNames.OldMunchNFT]: {
    abi: oldMunchNftAbi,
    bytecode: OldMunchNFT.bytecode.object as Address,
    contractTitle: "OldMunchNFT",
  },
  [ContractNames.OldMunchNFTProxy]: {
    abi: proxyFactoryAbi,
    bytecode: ProxyFactory.bytecode.object as Address,
    contractTitle: "ProxyFactory",
  },
  [ContractNames.MunchNFT]: {
    abi: munchNftAbi,
    bytecode: MunchNFT.bytecode.object as Address,
    contractTitle: "MunchNFT",
  },
  [ContractNames.FundTreasuryDistributor]: {
    abi: fundTreasuryDistributorAbi,
    bytecode: FundTreasuryDistributor.bytecode.object as Address,
    contractTitle: "FundTreasuryDistributor",
  },
  [ContractNames.RNGProxySelfHosted]: {
    abi: rngProxySelfHostedAbi,
    bytecode: RNGProxySelfHosted.bytecode.object as Address,
    contractTitle: "RNGProxySelfHosted",
  },
  [ContractNames.RNGProxyApi3]: {
    abi: rngProxyApi3Abi,
    bytecode: RNGProxyAPI3.bytecode.object as Address,
    contractTitle: "RNGProxyAPI3",
  },
  [ContractNames.BonusManager]: {
    abi: bonusManagerAbi,
    bytecode: BonusManager.bytecode.object as Address,
    contractTitle: "BonusManager",
  },
  [ContractNames.PrimordialManager]: {
    abi: primordialManagerAbi,
    bytecode: PrimordialManager.bytecode.object as Address,
    contractTitle: "PrimordialManager",
  },
};

// Config types

export interface IndividualConfigTypeWithoutClients {
  chainId: number;
  verifierUrl: string;
  verifierApiKey: string | undefined;
  env: ENV;
  externalAddresses: {
    pointsOperator: `0x${string}`;
    usdb: `0x${string}`;
    weth: `0x${string}`;
    blast: `0x${string}`;
    blastPoints: `0x${string}`;
    oldMunchNFT: `0x${string}`;
    treasury: `0x${string}`;
    airnodeRpv: `0x${string}`;
    airnodeContract: `0x${string}`;
    airnodeSponsor: `0x${string}`;
    airnodeSponsorWallet: `0x${string}`;
    airnodeEndpointId: `0x${string}`;
  };
  universalRoles: {
    [Role.Admin]: `0x${string}`;
  };
  contractRoles: {
    [ContractNames.AccountManagerProxy]: {
      [Role.SocialApproval_1]: `0x${string}`;
      [Role.SocialApproval_2]?: `0x${string}`;
      [Role.SocialApproval_3]?: `0x${string}`;
      [Role.SocialApproval_4]?: `0x${string}`;
      [Role.SocialApproval_5]?: `0x${string}`;
      [Role.Social_1]: `0x${string}`;
      [Role.Social_2]?: `0x${string}`;
      [Role.Social_3]?: `0x${string}`;
      [Role.Social_4]?: `0x${string}`;
      [Role.Social_5]?: `0x${string}`;
    };
    [ContractNames.ClaimManagerProxy]: {
      [Role.NewPeriod]: `0x${string}`;
    };
    [ContractNames.LockManager]: {
      [Role.PriceFeed_1]: `0x${string}`;
      [Role.PriceFeed_2]?: `0x${string}`;
      [Role.PriceFeed_3]?: `0x${string}`;
      [Role.PriceFeed_4]?: `0x${string}`;
      [Role.PriceFeed_5]?: `0x${string}`;
    };
    [ContractNames.RewardsManager]: {
      [Role.Minter]: `0x${string}`;
      [Role.ClaimYield]: `0x${string}`;
    };
    [ContractNames.MunchNFT]?: {
      [Role.NFTOracle]: `0x${string}`;
    };
    [ContractNames.RNGProxySelfHosted]?: {
      [Role.NFTOracle]: `0x${string}`;
    };
    [ContractNames.RNGProxyApi3]?: {
      [Role.NFTOracle]: `0x${string}`;
    };
  };
  selfHostProxy: boolean;
  deployOldNFT: boolean;
  storeOutput: boolean;
}

export interface IndividualConfigType extends IndividualConfigTypeWithoutClients {
  walletClient: WalletClient<Transport, Chain, ParseAccount<Account>>;
  publicClient: PublicClient<Transport, Chain>;
}

export interface ConfigType {
  [ENV.TESTNET]: IndividualConfigType;
  [ENV.CLONE_TESTNET]: IndividualConfigType;
  [ENV.MAINNET]: IndividualConfigType;
  [ENV.CLONE_MAINNET]: IndividualConfigType;
}

export interface Current {
  [ENV.CLONE_TESTNET]?: string;
  [ENV.CLONE_MAINNET]?: string;
  [ENV.TESTNET]?: string;
  [ENV.MAINNET]?: string;
}
