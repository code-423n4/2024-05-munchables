import { defineConfig, type Config } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "abi/generated.ts",
  contracts: [],
  plugins: [
    foundry({
      project: "./",
      include: [
        "PrimordialManager.sol/*.json",
        "ProxyFactory.sol/*.json",
        "BaseConfigStorage.sol/*.json",
        "ConfigStorage.sol/*.json",
        "BaseConfigStorageUpgradeable.sol/*.json",
        "SnuggeryManager.sol.sol/*.json",
        "BaseBlastManager.sol/*.json",
        "LockManager.sol/*.json",
        "ClaimManager.sol/*.json",
        "MigrationManager.sol/*.json",
        "BonusManager.sol/*.json",
        "RewardsManager.sol/*.json",
        "MunchadexManager.sol/*.json",
        "SnuggeryManager.sol/*.json",
        "AccountManager.sol/*.json",
        "BaseBlastManagerUpgradeable.sol/*.json",
        "NFTOverlord.sol/*.json",
        "NFTAttributeManagerV1.sol/*.json",
        "FundTreasuryDistributor.sol/*.json",
        "MunchablesCommonLib.sol/*.json",
        "SignatureVerifier.sol/*.json",
        "MunchToken.sol/*.json",
        "MunchNFT.sol/*.json",
        "OldMunchNFT.sol/*.json",
        "RNGProxySelfHosted.sol/*.json",
        "BaseRNGProxy.sol/*.json",
        "BaseConfigStorage.sol/*.json",
        "RNGProxyAPI3.sol/*.json",
        "IBlast.sol/*.json",
        "ILockManager.sol/*.json",
        "IMunchNFT.sol/*.json",
        "IMigrationManager.sol/*.json",
        "INFTAttributesManager.sol/*.json",
        "IConfigStorage.sol/*.json",
        "IHoldsGovernorship.sol/*.json",
        "IClaimManager.sol/*.json",
        "IConfigNotifiable.sol/*.json",
        "IMunchadexManager.sol/*.json",
        "ISnuggeryManager.sol/*.json",
        "IBaseBlastManager.sol/*.json",
        "IRNGProxy.sol/*.json",
        "IMunchToken.sol/*.json",
        "IBonusManager.sol/*.json",
        "ISnuggeryManager.sol.sol/*.json",
        "IDistributor.sol/*.json",
        "IAccountManager.sol/*.json",
        "IRNGProxySelfHosted.sol/*.json",
        "IPrimordialManager.sol/*.json",
        "MockConfigNotifiable.sol/*.json",
        "MockNFTOverlord.sol/*.json",
        "MockBlast.sol/*.json",
        "MockNFTAttributeManagerV1.sol/*.json",
        "MockClaimManager.sol/*.json",
        "MockAccountManager.sol/*.json",
        "TestERC20Token.sol/*.json",
        "MockMigrationManager.sol/*.json",
        "MockMunchadexManager.sol/*.json",
        "MockSnuggeryManager.sol/*.json",
        "MockLockManager.sol/*.json",
        "MockAccountManager.sol/*.json",
        "MockClaimManager.sol/*.json",
        "MockPrimordialManager.sol/*.json",
        "MockRNGRequester.sol/*.json",
        "MockRewardsManager.sol/*.json",
        "IAirnodeRrpV0.sol/*.json",
        "MockMunchNFT.sol/*.json",
        "MockRNGProxy.sol/*.json",
      ],
    }),
  ],
}) as Config;