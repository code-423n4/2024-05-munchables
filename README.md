# Munchables audit details

- Total Prize Pool: $20,000 in USDC
  - HM awards: $15,900 in USDC
  - QA awards: $700 in USDC
  - Judge awards: $1,700 in USDC
  - Validators awards: $1,200 in USDC
  - Scout awards: $500 in USDC
- Join [C4 Discord](https://discord.gg/code4rena) to register
- Submit findings [using the C4 form](https://code4rena.com/contests/2024-05-munchables/submit)
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts May 22, 2024 20:00 UTC
- Ends May 27, 2024 20:00 UTC

## Automated Findings / Publicly Known Issues

The 4naly3er report can be found [here](https://github.com/code-423n4/2024-05-munchables/blob/main/4naly3er-report.md).

_Note for C4 wardens: Anything included in this `Automated Findings / Publicly Known Issues` section is considered a publicly known issue and is ineligible for awards._

# Overview

Munchables is a GameFi project with a twist.

The objective of the game is to earn as many Munch Points as possible. In crypto terms, you could call this "point farming".

Built on top of Blast, Munchables leverages the unique on-chain primitives to create a reward-filled journey.
Players collect Munchables and keep them safe, fed and comfortable in their snuggery.  
Once in a snuggery, a Munchable can start earning rewards for that player.
A variety of factors influence the rewards earned, so players will have to be smart when choosing which Munchables to put in their snuggery and the strategies they use to play the game.

## Links

- **Previous audits:** We are currently working with Nethermind. The audit is not complete yet. All issues they have found have already been implemented though.
- **Documentation:** [/guides/*.md](https://github.com/code-423n4/2024-05-munchables/tree/main/guides)
- **Website:** <https://www.munchables.app/>
- **X/Twitter:** <https://twitter.com/_munchables>\_
- **Discord:** <https://discord.com/invite/munchables>

# Scope

### Files in scope

_See [scope.txt](https://github.com/code-423n4/2024-05-munchables/blob/main/scope.txt)_

### Files in scope

| File                          | Logic Contracts | Interfaces | SLOC    | Purpose | Libraries used                                                                                   |
| ----------------------------- | --------------- | ---------- | ------- | ------- | ------------------------------------------------------------------------------------------------ |
| /src/managers/LockManager.sol | 1               | \*\*\*\*   | 413     |         | @openzeppelin/contracts/token/ERC20/ERC20.sol, @openzeppelin/contracts/utils/ReentrancyGuard.sol |
| **Totals**                    | **1**           | \*\*\*\*   | **413** |         |                                                                                                  |

### Files out of scope

_See [out_of_scope.txt](https://github.com/code-423n4/2024-05-munchables/blob/main/out_of_scope.txt)_

| File                                           |
| ---------------------------------------------- |
| ./src/config/BaseConfigStorage.sol             |
| ./src/config/BaseConfigStorageUpgradeable.sol  |
| ./src/config/ConfigStorage.sol                 |
| ./src/distributors/FundTreasuryDistributor.sol |
| ./src/interfaces/IAccountManager.sol           |
| ./src/interfaces/IBaseBlastManager.sol         |
| ./src/interfaces/IBlast.sol                    |
| ./src/interfaces/IBonusManager.sol             |
| ./src/interfaces/IClaimManager.sol             |
| ./src/interfaces/IConfigNotifiable.sol         |
| ./src/interfaces/IConfigStorage.sol            |
| ./src/interfaces/IDistributor.sol              |
| ./src/interfaces/IERC20YieldClaimable.sol      |
| ./src/interfaces/IHoldsGovernorship.sol        |
| ./src/interfaces/ILockManager.sol              |
| ./src/interfaces/IMigrationManager.sol         |
| ./src/interfaces/IMunchNFT.sol                 |
| ./src/interfaces/IMunchToken.sol               |
| ./src/interfaces/IMunchadexManager.sol         |
| ./src/interfaces/INFTAttributesManager.sol     |
| ./src/interfaces/INFTOverlord.sol              |
| ./src/interfaces/IPrimordialManager.sol        |
| ./src/interfaces/IRNGProxy.sol                 |
| ./src/interfaces/IRNGProxySelfHosted.sol       |
| ./src/interfaces/IRewardsManager.sol           |
| ./src/interfaces/ISnuggeryManager.sol          |
| ./src/libraries/MunchablesCommonLib.sol        |
| ./src/libraries/SignatureVerifier.sol          |
| ./src/managers/AccountManager.sol              |
| ./src/managers/BaseBlastManager.sol            |
| ./src/managers/BaseBlastManagerUpgradeable.sol |
| ./src/managers/BonusManager.sol                |
| ./src/managers/ClaimManager.sol                |
| ./src/managers/MigrationManager.sol            |
| ./src/managers/MunchadexManager.sol            |
| ./src/managers/NFTAttributeManagerV1.sol       |
| ./src/managers/PrimordialManager.sol           |
| ./src/managers/RewardsManager.sol              |
| ./src/managers/SnuggeryManager.sol             |
| ./src/mock/MockAccountManager.sol              |
| ./src/mock/MockBlast.sol                       |
| ./src/mock/MockClaimManager.sol                |
| ./src/mock/MockConfigNotifiable.sol            |
| ./src/mock/MockLockManager.sol                 |
| ./src/mock/MockMigrationManager.sol            |
| ./src/mock/MockMunchNFT.sol                    |
| ./src/mock/MockMunchadexManager.sol            |
| ./src/mock/MockNFTAttributeManagerV1.sol       |
| ./src/mock/MockNFTOverlord.sol                 |
| ./src/mock/MockPrimordialManager.sol           |
| ./src/mock/MockRNGProxy.sol                    |
| ./src/mock/MockRNGRequester.sol                |
| ./src/mock/MockRewardsManager.sol              |
| ./src/mock/MockSnuggeryManager.sol             |
| ./src/overlords/NFTOverlord.sol                |
| ./src/proxy/ProxyFactory.sol                   |
| ./src/rng/BaseRNGProxy.sol                     |
| ./src/rng/RNGProxyAPI3.sol                     |
| ./src/rng/RNGProxySelfHosted.sol               |
| ./src/test/ClaimGas.sol                        |
| ./src/test/ClaimYield.t.sol                    |
| ./src/test/MigrationManager.t.sol              |
| ./src/test/MunchablesTest.sol                  |
| ./src/test/SpeedRun.t.sol                      |
| ./src/test/SwapRewardsManager.sol              |
| ./src/tokens/MunchNFT.sol                      |
| ./src/tokens/MunchToken.sol                    |
| ./src/tokens/OldMunchNFT.sol                   |
| ./src/tokens/TestERC20Token.sol                |
| Totals: 69                                     |

## Scoping Q &amp; A

### General questions

| Question                                | Answer                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------- |
| ERC20 used by the protocol              | USDB, WETH, (assume we can add more to the future for use in LockManager) |
| ERC721 used by the protocol             | No                                                                        |
| ERC777 used by the protocol             | No                                                                        |
| ERC1155 used by the protocol            | No                                                                        |
| Chains the protocol will be deployed on | Blast Mainnet                                                        |

### ERC20 token behaviors in scope

| Question                                                                                                                                                   | Answer |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| [Missing return values](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#missing-return-values)                                                      | Yes    |
| [Fee on transfer](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#fee-on-transfer)                                                                  | Yes    |
| [Balance changes outside of transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#balance-modifications-outside-of-transfers-rebasingairdrops) | Yes    |
| [Upgradeability](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#upgradable-tokens)                                                                 | Yes    |
| [Flash minting](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#flash-mintable-tokens)                                                              | Yes    |
| [Pausability](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#pausable-tokens)                                                                      | No     |
| [Approval race protections](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#approval-race-protections)                                              | Yes    |
| [Revert on approval to zero address](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-approval-to-zero-address)                            | Yes    |
| [Revert on zero value approvals](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-approvals)                                    | Yes    |
| [Revert on zero value transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-transfers)                                    | Yes    |
| [Revert on transfer to the zero address](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-transfer-to-the-zero-address)                    | Yes    |
| [Revert on large approvals and/or transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-large-approvals--transfers)                  | Yes    |
| [Doesn't revert on failure](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#no-revert-on-failure)                                                   | Yes    |
| [Multiple token addresses](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-transfers)                                          | No     |
| [Low decimals ( < 6)](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#low-decimals)                                                                 | Yes    |
| [High decimals ( > 18)](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#high-decimals)                                                              | Yes    |
| [Blocklists](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#tokens-with-blocklists)                                                                | No     |

### External integrations (e.g., Uniswap) behavior in scope

| Question                                                  | Answer |
| --------------------------------------------------------- | ------ |
| Enabling/disabling fees (e.g. Blur disables/enables fees) | No     |
| Pausability (e.g. Uniswap pool gets paused)               | No     |
| Upgradeability (e.g. Uniswap gets upgraded)               | No     |

### EIP compliance checklist

N/A

# Additional context

## Main invariants

- Assume onlyAdmin can only be called by the admin
- Assume all price feed roles are set by us
- Assume it's intentional that setLockDuration resets all of the existing lock token durations.

## Attack ideas (where to focus for bugs)

The most important thing is that funds cannot get locked forever, people cannot take other people's funds, and that people cannot reduce lockup times that are previously set.

## All trusted roles in the protocol

N/A

## Describe any novel or unique curve logic or mathematical models implemented in the contracts

N/A

## Running tests

```bash
pnpm i
pnpm build
pnpm test
# If you would like to see additional granular documentation, you can check it out by running this:
pnpm serve:doc
```

Most of the relevant tests for this contest are in typescript under [tests/managers/LockManager/*.test.ts](https://github.com/code-423n4/2024-05-munchables/tree/main/tests/managers/LockManager)

## Slither

See [slither.txt](https://github.com/code-423n4/2024-05-munchables/blob/main/slither.txt)

## Miscellaneous

Employees of Munchables and employees' family members are ineligible to participate in this audit.
