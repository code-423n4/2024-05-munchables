# ✨ So you want to run an audit

This `README.md` contains a set of checklists for our audit collaboration.

Your audit will use two repos: 
- **an _audit_ repo** (this one), which is used for scoping your audit and for providing information to wardens
- **a _findings_ repo**, where issues are submitted (shared with you after the audit) 

Ultimately, when we launch the audit, this repo will be made public and will contain the smart contracts to be reviewed and all the information needed for audit participants. The findings repo will be made public after the audit report is published and your team has mitigated the identified issues.

Some of the checklists in this doc are for **C4 (🐺)** and some of them are for **you as the audit sponsor (⭐️)**.

---

# Audit setup

## 🐺 C4: Set up repos
- [ ] Create a new private repo named `YYYY-MM-sponsorname` using this repo as a template.
- [ ] Rename this repo to reflect audit date (if applicable)
- [ ] Rename audit H1 below
- [ ] Update pot sizes
  - [ ] Remove the "Bot race findings opt out" section if there's no bot race.
- [ ] Fill in start and end times in audit bullets below
- [ ] Add link to submission form in audit details below
- [ ] Add the information from the scoping form to the "Scoping Details" section at the bottom of this readme.
- [ ] Add matching info to the Code4rena site
- [ ] Add sponsor to this private repo with 'maintain' level access.
- [ ] Send the sponsor contact the url for this repo to follow the instructions below and add contracts here. 
- [ ] Delete this checklist.

# Repo setup

## ⭐️ Sponsor: Add code to this repo

- [ ] Create a PR to this repo with the below changes:
- [ ] Confirm that this repo is a self-contained repository with working commands that will build (at least) all in-scope contracts, and commands that will run tests producing gas reports for the relevant contracts.
- [ ] Please have final versions of contracts and documentation added/updated in this repo **no less than 48 business hours prior to audit start time.**
- [ ] Be prepared for a 🚨code freeze🚨 for the duration of the audit — important because it establishes a level playing field. We want to ensure everyone's looking at the same code, no matter when they look during the audit. (Note: this includes your own repo, since a PR can leak alpha to our wardens!)

## ⭐️ Sponsor: Repo checklist

- [ ] Modify the [Overview](#overview) section of this `README.md` file. Describe how your code is supposed to work with links to any relevent documentation and any other criteria/details that the auditors should keep in mind when reviewing. (Here are two well-constructed examples: [Ajna Protocol](https://github.com/code-423n4/2023-05-ajna) and [Maia DAO Ecosystem](https://github.com/code-423n4/2023-05-maia))
- [ ] Review the Gas award pool amount, if applicable. This can be adjusted up or down, based on your preference - just flag it for Code4rena staff so we can update the pool totals across all comms channels.
- [ ] Optional: pre-record a high-level overview of your protocol (not just specific smart contract functions). This saves wardens a lot of time wading through documentation.
- [ ] [This checklist in Notion](https://code4rena.notion.site/Key-info-for-Code4rena-sponsors-f60764c4c4574bbf8e7a6dbd72cc49b4#0cafa01e6201462e9f78677a39e09746) provides some best practices for Code4rena audit repos.

## ⭐️ Sponsor: Final touches
- [ ] Review and confirm the pull request created by the Scout (technical reviewer) who was assigned to your contest. *Note: any files not listed as "in scope" will be considered out of scope for the purposes of judging, even if the file will be part of the deployed contracts.*
- [ ] Check that images and other files used in this README have been uploaded to the repo as a file and then linked in the README using absolute path (e.g. `https://github.com/code-423n4/yourrepo-url/filepath.png`)
- [ ] Ensure that *all* links and image/file paths in this README use absolute paths, not relative paths
- [ ] Check that all README information is in markdown format (HTML does not render on Code4rena.com)
- [ ] Delete this checklist and all text above the line below when you're ready.

---

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
## 🐺 C4 team: paste this into the bottom of the sponsor's audit repo `README`, then delete this line

N/A

✅ SCOUTS: Please format the response above 👆 so its not a wall of text and its readable.

# Overview

[ ⭐️ SPONSORS: add info here ]

## Links

- **Previous audits:**  We are currently working with Nethermind. The audit is not complete yet. All issues they have found have already been implemented though.
  - ✅ SCOUTS: If there are multiple report links, please format them in a list.
- **Documentation:** https://github.com/munchablesorg/munchables-common-core/tree/main/guides
- **Website:** 🐺 CA: add a link to the sponsor's website
- **X/Twitter:** 🐺 CA: add a link to the sponsor's Twitter
- **Discord:** 🐺 CA: add a link to the sponsor's Discord

# Scope

[ ✅ SCOUTS: add scoping and technical details here ]

### Files in scope
- ✅ This should be completed using the `metrics.md` file
- ✅ Last row of the table should be Total: SLOC
- ✅ SCOUTS: Have the sponsor review and and confirm in text the details in the section titled "Scoping Q amp; A"

*See [scope.txt](https://github.com/code-423n4/2024-05-munchables/blob/main/scope.txt)*

### Files in scope


| File   | Logic Contracts | Interfaces | SLOC  | Purpose | Libraries used |
| ------ | --------------- | ---------- | ----- | -----   | ------------ |
| /src/managers/LockManager.sol | 1| **** | 413 | |@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@openzeppelin/contracts/utils/ReentrancyGuard.sol|
| **Totals** | **1** | **** | **413** | | |

### Files out of scope

✅ SCOUTS: List files/directories out of scope

*See [out_of_scope.txt](https://github.com/code-423n4/2024-05-munchables/blob/main/out_of_scope.txt)*

| File         |
| ------------ |
| ./src/config/BaseConfigStorage.sol |
| ./src/config/BaseConfigStorageUpgradeable.sol |
| ./src/config/ConfigStorage.sol |
| ./src/distributors/FundTreasuryDistributor.sol |
| ./src/interfaces/IAccountManager.sol |
| ./src/interfaces/IBaseBlastManager.sol |
| ./src/interfaces/IBlast.sol |
| ./src/interfaces/IBonusManager.sol |
| ./src/interfaces/IClaimManager.sol |
| ./src/interfaces/IConfigNotifiable.sol |
| ./src/interfaces/IConfigStorage.sol |
| ./src/interfaces/IDistributor.sol |
| ./src/interfaces/IERC20YieldClaimable.sol |
| ./src/interfaces/IHoldsGovernorship.sol |
| ./src/interfaces/ILockManager.sol |
| ./src/interfaces/IMigrationManager.sol |
| ./src/interfaces/IMunchNFT.sol |
| ./src/interfaces/IMunchToken.sol |
| ./src/interfaces/IMunchadexManager.sol |
| ./src/interfaces/INFTAttributesManager.sol |
| ./src/interfaces/INFTOverlord.sol |
| ./src/interfaces/IPrimordialManager.sol |
| ./src/interfaces/IRNGProxy.sol |
| ./src/interfaces/IRNGProxySelfHosted.sol |
| ./src/interfaces/IRewardsManager.sol |
| ./src/interfaces/ISnuggeryManager.sol |
| ./src/libraries/MunchablesCommonLib.sol |
| ./src/libraries/SignatureVerifier.sol |
| ./src/managers/AccountManager.sol |
| ./src/managers/BaseBlastManager.sol |
| ./src/managers/BaseBlastManagerUpgradeable.sol |
| ./src/managers/BonusManager.sol |
| ./src/managers/ClaimManager.sol |
| ./src/managers/MigrationManager.sol |
| ./src/managers/MunchadexManager.sol |
| ./src/managers/NFTAttributeManagerV1.sol |
| ./src/managers/PrimordialManager.sol |
| ./src/managers/RewardsManager.sol |
| ./src/managers/SnuggeryManager.sol |
| ./src/mock/MockAccountManager.sol |
| ./src/mock/MockBlast.sol |
| ./src/mock/MockClaimManager.sol |
| ./src/mock/MockConfigNotifiable.sol |
| ./src/mock/MockLockManager.sol |
| ./src/mock/MockMigrationManager.sol |
| ./src/mock/MockMunchNFT.sol |
| ./src/mock/MockMunchadexManager.sol |
| ./src/mock/MockNFTAttributeManagerV1.sol |
| ./src/mock/MockNFTOverlord.sol |
| ./src/mock/MockPrimordialManager.sol |
| ./src/mock/MockRNGProxy.sol |
| ./src/mock/MockRNGRequester.sol |
| ./src/mock/MockRewardsManager.sol |
| ./src/mock/MockSnuggeryManager.sol |
| ./src/overlords/NFTOverlord.sol |
| ./src/proxy/ProxyFactory.sol |
| ./src/rng/BaseRNGProxy.sol |
| ./src/rng/RNGProxyAPI3.sol |
| ./src/rng/RNGProxySelfHosted.sol |
| ./src/test/ClaimGas.sol |
| ./src/test/ClaimYield.t.sol |
| ./src/test/MigrationManager.t.sol |
| ./src/test/MunchablesTest.sol |
| ./src/test/SpeedRun.t.sol |
| ./src/test/SwapRewardsManager.sol |
| ./src/tokens/MunchNFT.sol |
| ./src/tokens/MunchToken.sol |
| ./src/tokens/OldMunchNFT.sol |
| ./src/tokens/TestERC20Token.sol |
| Totals: 69 |

## Scoping Q &amp; A

### General questions
### Are there any ERC20's in scope?: Yes

✅ SCOUTS: If the answer above 👆 is "Yes", please add the tokens below 👇 to the table. Otherwise, update the column with "None".

Specific tokens (please specify)
USDB, WETH, (assume we can add more to the future for use in LockManager)

### Are there any ERC777's in scope?: No

✅ SCOUTS: If the answer above 👆 is "Yes", please add the tokens below 👇 to the table. Otherwise, update the column with "None".



### Are there any ERC721's in scope?: No

✅ SCOUTS: If the answer above 👆 is "Yes", please add the tokens below 👇 to the table. Otherwise, update the column with "None".



### Are there any ERC1155's in scope?: No

✅ SCOUTS: If the answer above 👆 is "Yes", please add the tokens below 👇 to the table. Otherwise, update the column with "None".



✅ SCOUTS: Once done populating the table below, please remove all the Q/A data above.

| Question                                | Answer                       |
| --------------------------------------- | ---------------------------- |
| ERC20 used by the protocol              |       🖊️             |
| Test coverage                           | ✅ SCOUTS: Please populate this after running the test coverage command                          |
| ERC721 used  by the protocol            |            🖊️              |
| ERC777 used by the protocol             |           🖊️                |
| ERC1155 used by the protocol            |              🖊️            |
| Chains the protocol will be deployed on | OtherBlast Mainnet  |

### ERC20 token behaviors in scope

| Question                                                                                                                                                   | Answer |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| [Missing return values](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#missing-return-values)                                                      |   Yes  |
| [Fee on transfer](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#fee-on-transfer)                                                                  |  Yes  |
| [Balance changes outside of transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#balance-modifications-outside-of-transfers-rebasingairdrops) | Yes    |
| [Upgradeability](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#upgradable-tokens)                                                                 |   Yes  |
| [Flash minting](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#flash-mintable-tokens)                                                              | Yes    |
| [Pausability](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#pausable-tokens)                                                                      | No    |
| [Approval race protections](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#approval-race-protections)                                              | Yes    |
| [Revert on approval to zero address](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-approval-to-zero-address)                            | Yes    |
| [Revert on zero value approvals](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-approvals)                                    | Yes    |
| [Revert on zero value transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-transfers)                                    | Yes    |
| [Revert on transfer to the zero address](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-transfer-to-the-zero-address)                    | Yes    |
| [Revert on large approvals and/or transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-large-approvals--transfers)                  | Yes    |
| [Doesn't revert on failure](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#no-revert-on-failure)                                                   |  Yes   |
| [Multiple token addresses](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-transfers)                                          | No    |
| [Low decimals ( < 6)](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#low-decimals)                                                                 |   Yes  |
| [High decimals ( > 18)](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#high-decimals)                                                              | Yes    |
| [Blocklists](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#tokens-with-blocklists)                                                                | No    |

### External integrations (e.g., Uniswap) behavior in scope:


| Question                                                  | Answer |
| --------------------------------------------------------- | ------ |
| Enabling/disabling fees (e.g. Blur disables/enables fees) | No   |
| Pausability (e.g. Uniswap pool gets paused)               |  No   |
| Upgradeability (e.g. Uniswap gets upgraded)               |   No  |


### EIP compliance checklist
N/A

✅ SCOUTS: Please format the response above 👆 using the template below👇

| Question                                | Answer                       |
| --------------------------------------- | ---------------------------- |
| src/Token.sol                           | ERC20, ERC721                |
| src/NFT.sol                             | ERC721                       |


# Additional context

## Main invariants

You can assume onlyAdmin can only be called by the admin
You can assume all price feed roles are set by us
You can assume it's intentional that setLockDuration resets all of the existing lock token durations.


✅ SCOUTS: Please format the response above 👆 so its not a wall of text and its readable.

## Attack ideas (where to focus for bugs)
The most important thing is that funds cannot get locked forever, people cannot take other people's funds, and that people cannot reduce lockup times that are previously set.

✅ SCOUTS: Please format the response above 👆 so its not a wall of text and its readable.

## All trusted roles in the protocol

N/A

✅ SCOUTS: Please format the response above 👆 using the template below👇

| Role                                | Description                       |
| --------------------------------------- | ---------------------------- |
| Owner                          | Has superpowers                |
| Administrator                             | Can change fees                       |

## Describe any novel or unique curve logic or mathematical models implemented in the contracts:

N/A

✅ SCOUTS: Please format the response above 👆 so its not a wall of text and its readable.

## Running tests

pnpm i
pnpm build
pnpm test

(If you would like to see additional granular documentation, you can check it out by running `pnpm serve:doc`)

✅ SCOUTS: Please format the response above 👆 using the template below👇

```bash
git clone https://github.com/code-423n4/2023-08-arbitrum
git submodule update --init --recursive
cd governance
foundryup
make install
make build
make sc-election-test
```
To run code coverage
```bash
make coverage
```
To run gas benchmarks
```bash
make gas
```

✅ SCOUTS: Add a screenshot of your terminal showing the gas report
✅ SCOUTS: Add a screenshot of your terminal showing the test coverage

## Miscellaneous
Employees of Munchables and employees' family members are ineligible to participate in this audit.
