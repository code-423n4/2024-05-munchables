# Report

- [Report](#report)
  - [Gas Optimizations](#gas-optimizations)
    - [\[GAS-1\] `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)](#gas-1-a--a--b-is-more-gas-effective-than-a--b-for-state-variables-excluding-arrays-and-mappings)
    - [\[GAS-2\] Use assembly to check for `address(0)`](#gas-2-use-assembly-to-check-for-address0)
    - [\[GAS-3\] Use calldata instead of memory for function arguments that do not get mutated](#gas-3-use-calldata-instead-of-memory-for-function-arguments-that-do-not-get-mutated)
    - [\[GAS-4\] For Operations that will not overflow, you could use unchecked](#gas-4-for-operations-that-will-not-overflow-you-could-use-unchecked)
    - [\[GAS-5\] Functions guaranteed to revert when called by normal users can be marked `payable`](#gas-5-functions-guaranteed-to-revert-when-called-by-normal-users-can-be-marked-payable)
    - [\[GAS-6\] `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)](#gas-6-i-costs-less-gas-compared-to-i-or-i--1-same-for---i-vs-i---or-i---1)
    - [\[GAS-7\] Increments/decrements can be unchecked in for-loops](#gas-7-incrementsdecrements-can-be-unchecked-in-for-loops)
    - [\[GAS-8\] Use != 0 instead of \> 0 for unsigned integer comparison](#gas-8-use--0-instead-of--0-for-unsigned-integer-comparison)
  - [Non Critical Issues](#non-critical-issues)
    - [\[NC-1\] `constant`s should be defined rather than using magic numbers](#nc-1-constants-should-be-defined-rather-than-using-magic-numbers)
    - [\[NC-2\] Control structures do not follow the Solidity Style Guide](#nc-2-control-structures-do-not-follow-the-solidity-style-guide)
    - [\[NC-3\] Events that mark critical parameter changes should contain both the old and the new value](#nc-3-events-that-mark-critical-parameter-changes-should-contain-both-the-old-and-the-new-value)
    - [\[NC-4\] Function ordering does not follow the Solidity style guide](#nc-4-function-ordering-does-not-follow-the-solidity-style-guide)
    - [\[NC-5\] Functions should not be longer than 50 lines](#nc-5-functions-should-not-be-longer-than-50-lines)
    - [\[NC-6\] NatSpec is completely non-existent on functions that should have them](#nc-6-natspec-is-completely-non-existent-on-functions-that-should-have-them)
    - [\[NC-7\] Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor](#nc-7-use-a-modifier-instead-of-a-requireif-statement-for-a-special-msgsender-actor)
    - [\[NC-8\] Consider using named mappings](#nc-8-consider-using-named-mappings)
    - [\[NC-9\] Take advantage of Custom Error's return value property](#nc-9-take-advantage-of-custom-errors-return-value-property)
    - [\[NC-10\] Internal and private variables and functions names should begin with an underscore](#nc-10-internal-and-private-variables-and-functions-names-should-begin-with-an-underscore)
    - [\[NC-11\] Constants should be defined rather than using magic numbers](#nc-11-constants-should-be-defined-rather-than-using-magic-numbers)
    - [\[NC-12\] Variables need not be initialized to zero](#nc-12-variables-need-not-be-initialized-to-zero)
  - [Low Issues](#low-issues)
    - [\[L-1\] Some tokens may revert when zero value transfers are made](#l-1-some-tokens-may-revert-when-zero-value-transfers-are-made)
    - [\[L-2\] Division by zero not prevented](#l-2-division-by-zero-not-prevented)
    - [\[L-3\] Signature use at deadlines should be allowed](#l-3-signature-use-at-deadlines-should-be-allowed)
    - [\[L-4\] Solidity version 0.8.20+ may not work on other chains due to `PUSH0`](#l-4-solidity-version-0820-may-not-work-on-other-chains-due-to-push0)
    - [\[L-5\] Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting](#l-5-consider-using-openzeppelins-safecast-library-to-prevent-unexpected-overflows-when-downcasting)
    - [\[L-6\] Unsafe ERC20 operation(s)](#l-6-unsafe-erc20-operations)
  - [Medium Issues](#medium-issues)
    - [\[M-1\] Contracts are vulnerable to fee-on-transfer accounting-related issues](#m-1-contracts-are-vulnerable-to-fee-on-transfer-accounting-related-issues)
    - [\[M-2\] `call()` should be used instead of `transfer()` on an `address payable`](#m-2-call-should-be-used-instead-of-transfer-on-an-address-payable)
    - [\[M-3\] Return values of `transfer()`/`transferFrom()` not checked](#m-3-return-values-of-transfertransferfrom-not-checked)
    - [\[M-4\] Unsafe use of `transfer()`/`transferFrom()` with `IERC20`](#m-4-unsafe-use-of-transfertransferfrom-with-ierc20)

## Gas Optimizations

|                 | Issue                                                                                               | Instances |
| --------------- | :-------------------------------------------------------------------------------------------------- | :-------: |
| [GAS-1](#GAS-1) | `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings) |     2     |
| [GAS-2](#GAS-2) | Use assembly to check for `address(0)`                                                              |     8     |
| [GAS-3](#GAS-3) | Use calldata instead of memory for function arguments that do not get mutated                       |     1     |
| [GAS-4](#GAS-4) | For Operations that will not overflow, you could use unchecked                                      |    31     |
| [GAS-5](#GAS-5) | Functions guaranteed to revert when called by normal users can be marked `payable`                  |     1     |
| [GAS-6](#GAS-6) | `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)            |     7     |
| [GAS-7](#GAS-7) | Increments/decrements can be unchecked in for-loops                                                 |     4     |
| [GAS-8](#GAS-8) | Use != 0 instead of > 0 for unsigned integer comparison                                             |     1     |

### <a name="GAS-1"></a>[GAS-1] `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)

This saves **16 gas per instance.**

_Instances (2)_:

```solidity
File: src/managers/LockManager.sol

380:         lockedToken.quantity += _quantity;

476:                 lockedWeighted +=

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="GAS-2"></a>[GAS-2] Use assembly to check for `address(0)`

_Saves 6 gas per instance_

_Instances (8)_:

```solidity
File: src/managers/LockManager.sol

133:         if (usdUpdateProposal.proposer != address(0))

157:         if (usdUpdateProposal.proposer != address(0))

191:         if (usdUpdateProposal.proposer == address(0)) revert NoProposalError();

224:         if (usdUpdateProposal.proposer == address(0)) revert NoProposalError();

289:         if (_onBehalfOf != address(0)) {

324:         if (_tokenContract == address(0)) {

374:         if (_tokenContract != address(0)) {

419:         if (_tokenContract == address(0)) {

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="GAS-3"></a>[GAS-3] Use calldata instead of memory for function arguments that do not get mutated

When a function with a `memory` array is called externally, the `abi.decode()` step has to use a for-loop to copy each index of the `calldata` to the `memory` index. Each iteration of this for-loop costs at least 60 gas (i.e. `60 * <mem_array>.length`). Using `calldata` directly bypasses this loop.

If the array is passed to an `internal` function which passes the array to another internal function where the array is modified and therefore `memory` is used in the `external` call, it's still more gas-efficient to use `calldata` when the `external` function uses modifiers, since the modifiers may prevent the internal functions from being called. Structs have the same overhead as an array of length one.

_Saves 60 gas per instance_

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

117:         ConfiguredToken memory _tokenData

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="GAS-4"></a>[GAS-4] For Operations that will not overflow, you could use unchecked

_Instances (31)_:

```solidity
File: src/managers/LockManager.sol

4: import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

5: import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

6: import "../interfaces/ILockManager.sol";

7: import "../interfaces/IConfigStorage.sol";

8: import "../interfaces/IAccountManager.sol";

9: import "../interfaces/IMigrationManager.sol";

10: import "./BaseBlastManager.sol";

11: import "../interfaces/ISnuggeryManager.sol";

12: import "../interfaces/INFTOverlord.sol";

105:             ); // , "LockManager: End date is in the past");

164:         ++_usdProposalId;

171:         usdUpdateProposal.approvalsCount++;

200:         usdUpdateProposal.approvalsCount++;

232:         usdUpdateProposal.disapprovalsCount++;

252:         for (uint256 i; i < configuredTokensLength; i++) {

257:                     uint32(block.timestamp) + uint32(_duration) <

266:                     lastLockTime +

344:         uint256 quantity = _quantity + lockedToken.remainder;

364:                 numberNFTs = (quantity - remainder) / configuredToken.nftCost;

380:         lockedToken.quantity += _quantity;

383:             uint32(block.timestamp) +

416:         lockedToken.quantity -= _quantity;

438:         for (uint256 i; i < configuredTokensLength; i++) {

466:         for (uint256 i; i < configuredTokensLength; i++) {

473:                 uint256 deltaDecimal = 10 **

474:                     (18 -

476:                 lockedWeighted +=

477:                     (deltaDecimal *

479:                             .quantity *

481:                             .usdPrice) /

512:             for (uint256 i; i < updateTokensLength; i++) {

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="GAS-5"></a>[GAS-5] Functions guaranteed to revert when called by normal users can be marked `payable`

If a function modifier such as `onlyOwner` is used, the function will revert if a normal user tries to pay the function. Marking the function as `payable` will lower the gas cost for legitimate callers because the compiler will not include checks for whether a payment was provided.

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

85:     function configUpdated() external override onlyConfigStorage {

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="GAS-6"></a>[GAS-6] `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)

Pre-increments and pre-decrements are cheaper.

For a `uint256 i` variable, the following is true with the Optimizer enabled at 10k:

**Increment:**

- `i += 1` is the most expensive form
- `i++` costs 6 gas less than `i += 1`
- `++i` costs 5 gas less than `i++` (11 gas less than `i += 1`)

**Decrement:**

- `i -= 1` is the most expensive form
- `i--` costs 11 gas less than `i -= 1`
- `--i` costs 5 gas less than `i--` (16 gas less than `i -= 1`)

Note that post-increments (or post-decrements) return the old value before incrementing or decrementing, hence the name _post-increment_:

```solidity
uint i = 1;
uint j = 2;
require(j == i++, "This will be false as i is incremented after the comparison");
```

However, pre-increments (or pre-decrements) return the new value:

```solidity
uint i = 1;
uint j = 2;
require(j == ++i, "This will be true as i is incremented before the comparison");
```

In the pre-increment case, the compiler has to create a temporary variable (when used) for returning `1` instead of `2`.

Consider using pre-increments and pre-decrements where they are relevant (meaning: not where post-increments/decrements logic are relevant).

_Saves 5 gas per instance_

_Instances (7)_:

```solidity
File: src/managers/LockManager.sol

171:         usdUpdateProposal.approvalsCount++;

200:         usdUpdateProposal.approvalsCount++;

232:         usdUpdateProposal.disapprovalsCount++;

252:         for (uint256 i; i < configuredTokensLength; i++) {

438:         for (uint256 i; i < configuredTokensLength; i++) {

466:         for (uint256 i; i < configuredTokensLength; i++) {

512:             for (uint256 i; i < updateTokensLength; i++) {

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="GAS-7"></a>[GAS-7] Increments/decrements can be unchecked in for-loops

In Solidity 0.8+, there's a default overflow check on unsigned integers. It's possible to uncheck this in for-loops and save some gas at each iteration, but at the cost of some code readability, as this uncheck cannot be made inline.

[ethereum/solidity#10695](https://github.com/ethereum/solidity/issues/10695)

The change would be:

```diff
- for (uint256 i; i < numIterations; i++) {
+ for (uint256 i; i < numIterations;) {
 // ...
+   unchecked { ++i; }
}
```

These save around **25 gas saved** per instance.

The same can be applied with decrements (which should use `break` when `i == 0`).

The risk of overflow is non-existent for `uint256`.

_Instances (4)_:

```solidity
File: src/managers/LockManager.sol

252:         for (uint256 i; i < configuredTokensLength; i++) {

438:         for (uint256 i; i < configuredTokensLength; i++) {

466:         for (uint256 i; i < configuredTokensLength; i++) {

512:             for (uint256 i; i < updateTokensLength; i++) {

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="GAS-8"></a>[GAS-8] Use != 0 instead of > 0 for unsigned integer comparison

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

254:             if (lockedTokens[msg.sender][tokenContract].quantity > 0) {

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

## Non Critical Issues

|                 | Issue                                                                                     | Instances |
| --------------- | :---------------------------------------------------------------------------------------- | :-------: |
| [NC-1](#NC-1)   | `constant`s should be defined rather than using magic numbers                             |     3     |
| [NC-2](#NC-2)   | Control structures do not follow the Solidity Style Guide                                 |    30     |
| [NC-3](#NC-3)   | Events that mark critical parameter changes should contain both the old and the new value |     2     |
| [NC-4](#NC-4)   | Function ordering does not follow the Solidity style guide                                |     1     |
| [NC-5](#NC-5)   | Functions should not be longer than 50 lines                                              |     2     |
| [NC-6](#NC-6)   | NatSpec is completely non-existent on functions that should have them                     |     2     |
| [NC-7](#NC-7)   | Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor     |     6     |
| [NC-8](#NC-8)   | Consider using named mappings                                                             |     3     |
| [NC-9](#NC-9)   | Take advantage of Custom Error's return value property                                    |    28     |
| [NC-10](#NC-10) | Internal and private variables and functions names should begin with an underscore        |     4     |
| [NC-11](#NC-11) | Constants should be defined rather than using magic numbers                               |     1     |
| [NC-12](#NC-12) | Variables need not be initialized to zero                                                 |     1     |

### <a name="NC-1"></a>[NC-1] `constant`s should be defined rather than using magic numbers

Even [assembly](https://github.com/code-423n4/2022-05-opensea-seaport/blob/9d7ce4d08bf3c3010304a0476a785c70c0e90ae7/contracts/lib/TokenTransferrer.sol#L35-L39) can benefit from using readable constants instead of hex/numeric literals

_Instances (3)_:

```solidity
File: src/managers/LockManager.sol

16:     uint8 APPROVE_THRESHOLD = 3;

18:     uint8 DISAPPROVE_THRESHOLD = 3;

473:                 uint256 deltaDecimal = 10 **

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-2"></a>[NC-2] Control structures do not follow the Solidity Style Guide

See the [control structures](https://docs.soliditylang.org/en/latest/style-guide.html#control-structures) section of the Solidity Style Guide

_Instances (30)_:

```solidity
File: src/managers/LockManager.sol

48:         if (configuredTokens[_tokenContract].nftCost == 0)

55:         if (!configuredTokens[_tokenContract].active)

101:         if (_lockdropData.end < block.timestamp)

106:         if (_lockdropData.start >= _lockdropData.end)

119:         if (_tokenData.nftCost == 0) revert NFTCostInvalidError();

133:         if (usdUpdateProposal.proposer != address(0))

157:         if (usdUpdateProposal.proposer != address(0))

159:         if (_contracts.length == 0) revert ProposalInvalidContractsError();

191:         if (usdUpdateProposal.proposer == address(0)) revert NoProposalError();

192:         if (usdUpdateProposal.proposer == msg.sender)

194:         if (usdUpdateProposal.approvals[msg.sender] == _usdProposalId)

196:         if (usdUpdateProposal.proposedPrice != _price)

224:         if (usdUpdateProposal.proposer == address(0)) revert NoProposalError();

225:         if (usdUpdateProposal.approvals[msg.sender] == _usdProposalId)

227:         if (usdUpdateProposal.disapprovals[msg.sender] == _usdProposalId)

229:         if (usdUpdateProposal.proposedPrice != _price)

246:         if (_duration > configStorage.getUint(StorageKey.MaxLockDuration))

256:                 if (

321:         if (_mainAccount != _lockRecipient) revert SubAccountCannotLockError();

322:         if (_player.registrationDate == 0) revert AccountNotRegisteredError();

325:             if (msg.value != _quantity) revert ETHValueIncorrectError();

327:             if (msg.value != 0) revert InvalidMessageValueError();

330:             if (allowance < _quantity) revert InsufficientAllowanceError();

352:         if (

356:             if (

366:                 if (numberNFTs > type(uint16).max) revert TooManyNFTsError();

408:         if (lockedToken.quantity < _quantity)

410:         if (lockedToken.unlockTime > uint32(block.timestamp))

467:             if (

507:         if (

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-3"></a>[NC-3] Events that mark critical parameter changes should contain both the old and the new value

This should especially be done if the new value is not required to be different from the old value

_Instances (2)_:

```solidity
File: src/managers/LockManager.sol

129:     function setUSDThresholds(
             uint8 _approve,
             uint8 _disapprove
         ) external onlyAdmin {
             if (usdUpdateProposal.proposer != address(0))
                 revert ProposalInProgressError();
             APPROVE_THRESHOLD = _approve;
             DISAPPROVE_THRESHOLD = _disapprove;

             emit USDThresholdUpdated(_approve, _disapprove);

245:     function setLockDuration(uint256 _duration) external notPaused {
             if (_duration > configStorage.getUint(StorageKey.MaxLockDuration))
                 revert MaximumLockDurationError();

             playerSettings[msg.sender].lockDuration = uint32(_duration);
             // update any existing lock
             uint256 configuredTokensLength = configuredTokenContracts.length;
             for (uint256 i; i < configuredTokensLength; i++) {
                 address tokenContract = configuredTokenContracts[i];
                 if (lockedTokens[msg.sender][tokenContract].quantity > 0) {
                     // check they are not setting lock time before current unlocktime
                     if (
                         uint32(block.timestamp) + uint32(_duration) <
                         lockedTokens[msg.sender][tokenContract].unlockTime
                     ) {
                         revert LockDurationReducedError();
                     }

                     uint32 lastLockTime = lockedTokens[msg.sender][tokenContract]
                         .lastLockTime;
                     lockedTokens[msg.sender][tokenContract].unlockTime =
                         lastLockTime +
                         uint32(_duration);
                 }
             }

             emit LockDuration(msg.sender, _duration);

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-4"></a>[NC-4] Function ordering does not follow the Solidity style guide

According to the [Solidity style guide](https://docs.soliditylang.org/en/v0.8.17/style-guide.html#order-of-functions), functions should be laid out in the following order :`constructor()`, `receive()`, `fallback()`, `external`, `public`, `internal`, `private`, but the cases below do not follow this pattern

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

1:
   Current order:
   internal _reconfigure
   external configUpdated
   external configureLockdrop
   external configureToken
   external setUSDThresholds
   external proposeUSDPrice
   external approveUSDPrice
   external disapproveUSDPrice
   external setLockDuration
   external lockOnBehalf
   external lock
   private _lock
   external unlock
   external getLocked
   external getLockedWeightedValue
   external getConfiguredToken
   external getPlayerSettings
   internal _execUSDPriceUpdate

   Suggested order:
   external configUpdated
   external configureLockdrop
   external configureToken
   external setUSDThresholds
   external proposeUSDPrice
   external approveUSDPrice
   external disapproveUSDPrice
   external setLockDuration
   external lockOnBehalf
   external lock
   external unlock
   external getLocked
   external getLockedWeightedValue
   external getConfiguredToken
   external getPlayerSettings
   internal _reconfigure
   internal _execUSDPriceUpdate
   private _lock

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-5"></a>[NC-5] Functions should not be longer than 50 lines

Overly complex code can make understanding functionality more difficult, try to further modularize your code to ensure readability

_Instances (2)_:

```solidity
File: src/managers/LockManager.sol

85:     function configUpdated() external override onlyConfigStorage {

245:     function setLockDuration(uint256 _duration) external notPaused {

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-6"></a>[NC-6] NatSpec is completely non-existent on functions that should have them

Public and external functions that aren't view or pure should have NatSpec comments

_Instances (2)_:

```solidity
File: src/managers/LockManager.sol

85:     function configUpdated() external override onlyConfigStorage {

129:     function setUSDThresholds(

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-7"></a>[NC-7] Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor

If a function is supposed to be access-controlled, a `modifier` should be used instead of a `require/if` statement for more readability.

_Instances (6)_:

```solidity
File: src/managers/LockManager.sol

192:         if (usdUpdateProposal.proposer == msg.sender)

194:         if (usdUpdateProposal.approvals[msg.sender] == _usdProposalId)

225:         if (usdUpdateProposal.approvals[msg.sender] == _usdProposalId)

227:         if (usdUpdateProposal.disapprovals[msg.sender] == _usdProposalId)

254:             if (lockedTokens[msg.sender][tokenContract].quantity > 0) {

361:             if (msg.sender != address(migrationManager)) {

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-8"></a>[NC-8] Consider using named mappings

Consider moving to solidity version 0.8.18 or later, and using [named mappings](https://ethereum.stackexchange.com/questions/51629/how-to-name-the-arguments-in-mapping/145555#145555) to make it easier to understand the purpose of each mapping

_Instances (3)_:

```solidity
File: src/managers/LockManager.sol

20:     mapping(address => ConfiguredToken) public configuredTokens;

24:     mapping(address => mapping(address => LockedToken)) public lockedTokens;

26:     mapping(address => PlayerSettings) playerSettings;

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-9"></a>[NC-9] Take advantage of Custom Error's return value property

An important feature of Custom Error is that values such as address, tokenID, msg.value can be written inside the () sign, this kind of approach provides a serious advantage in debugging and examining the revert details of dapps such as tenderly.

_Instances (28)_:

```solidity
File: src/managers/LockManager.sol

49:             revert TokenNotConfiguredError();

56:             revert TokenNotConfiguredError();

90:         revert LockManagerInvalidCallError();

94:         revert LockManagerRefuseETHError();

107:             revert LockdropInvalidError();

119:         if (_tokenData.nftCost == 0) revert NFTCostInvalidError();

134:             revert ProposalInProgressError();

158:             revert ProposalInProgressError();

159:         if (_contracts.length == 0) revert ProposalInvalidContractsError();

191:         if (usdUpdateProposal.proposer == address(0)) revert NoProposalError();

193:             revert ProposerCannotApproveError();

195:             revert ProposalAlreadyApprovedError();

197:             revert ProposalPriceNotMatchedError();

224:         if (usdUpdateProposal.proposer == address(0)) revert NoProposalError();

226:             revert ProposalAlreadyApprovedError();

228:             revert ProposalAlreadyDisapprovedError();

230:             revert ProposalPriceNotMatchedError();

247:             revert MaximumLockDurationError();

260:                     revert LockDurationReducedError();

321:         if (_mainAccount != _lockRecipient) revert SubAccountCannotLockError();

322:         if (_player.registrationDate == 0) revert AccountNotRegisteredError();

325:             if (msg.value != _quantity) revert ETHValueIncorrectError();

327:             if (msg.value != 0) revert InvalidMessageValueError();

330:             if (allowance < _quantity) revert InsufficientAllowanceError();

360:             ) revert InvalidLockDurationError();

366:                 if (numberNFTs > type(uint16).max) revert TooManyNFTsError();

409:             revert InsufficientLockAmountError();

411:             revert TokenStillLockedError();

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-10"></a>[NC-10] Internal and private variables and functions names should begin with an underscore

According to the Solidity Style Guide, Non-`external` variable and function names should begin with an [underscore](https://docs.soliditylang.org/en/latest/style-guide.html#underscore-prefix-for-non-external-functions-and-variables)

_Instances (4)_:

```solidity
File: src/managers/LockManager.sol

16:     uint8 APPROVE_THRESHOLD = 3;

18:     uint8 DISAPPROVE_THRESHOLD = 3;

26:     mapping(address => PlayerSettings) playerSettings;

30:     USDUpdateProposal usdUpdateProposal;

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-11"></a>[NC-11] Constants should be defined rather than using magic numbers

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

474:                     (18 -

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="NC-12"></a>[NC-12] Variables need not be initialized to zero

The default value for variables is zero, so initializing them to zero is superfluous.

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

464:         uint256 lockedWeighted = 0;

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

## Low Issues

|             | Issue                                                                                           | Instances |
| ----------- | :---------------------------------------------------------------------------------------------- | :-------: |
| [L-1](#L-1) | Some tokens may revert when zero value transfers are made                                       |     2     |
| [L-2](#L-2) | Division by zero not prevented                                                                  |     1     |
| [L-3](#L-3) | Signature use at deadlines should be allowed                                                    |     1     |
| [L-4](#L-4) | Solidity version 0.8.20+ may not work on other chains due to `PUSH0`                            |     1     |
| [L-5](#L-5) | Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting |     5     |
| [L-6](#L-6) | Unsafe ERC20 operation(s)                                                                       |     3     |

### <a name="L-1"></a>[L-1] Some tokens may revert when zero value transfers are made

Example: <https://github.com/d-xo/weird-erc20#revert-on-zero-value-transfers>.

In spite of the fact that EIP-20 [states](https://github.com/ethereum/EIPs/blob/46b9b698815abbfa628cd1097311deee77dd45c5/EIPS/eip-20.md?plain=1#L116) that zero-valued transfers must be accepted, some tokens, such as LEND will revert if this is attempted, which may cause transactions that involve other tokens (such as batch operations) to fully revert. Consider skipping the transfer if the amount is zero, which will also save gas.

_Instances (2)_:

```solidity
File: src/managers/LockManager.sol

376:             token.transferFrom(_tokenOwner, address(this), _quantity);

423:             token.transfer(msg.sender, _quantity);

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="L-2"></a>[L-2] Division by zero not prevented

The divisions below take an input parameter which does not have any zero-value checks, which may lead to the functions reverting when zero is passed.

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

364:                 numberNFTs = (quantity - remainder) / configuredToken.nftCost;

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="L-3"></a>[L-3] Signature use at deadlines should be allowed

According to [EIP-2612](https://github.com/ethereum/EIPs/blob/71dc97318013bf2ac572ab63fab530ac9ef419ca/EIPS/eip-2612.md?plain=1#L58), signatures used on exactly the deadline timestamp are supposed to be allowed. While the signature may or may not be used for the exact EIP-2612 use case (transfer approvals), for consistency's sake, all deadlines should follow this semantic. If the timestamp is an expiration rather than a deadline, consider whether it makes more sense to include the expiration timestamp as a valid timestamp, as is done for deadlines.

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

101:         if (_lockdropData.end < block.timestamp)

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="L-4"></a>[L-4] Solidity version 0.8.20+ may not work on other chains due to `PUSH0`

The compiler for Solidity 0.8.20 switches the default target EVM version to [Shanghai](https://blog.soliditylang.org/2023/05/10/solidity-0.8.20-release-announcement/#important-note), which includes the new `PUSH0` op code. This op code may not yet be implemented on all L2s, so deployment on these chains will fail. To work around this issue, use an earlier [EVM](https://docs.soliditylang.org/en/v0.8.20/using-the-compiler.html?ref=zaryabs.com#setting-the-evm-version-to-target) [version](https://book.getfoundry.sh/reference/config/solidity-compiler#evm_version). While the project itself may or may not compile with 0.8.20, other projects with which it integrates, or which extend this project may, and those projects will have problems deploying these contracts/libraries.

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

2: pragma solidity 0.8.25;

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="L-5"></a>[L-5] Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting

Downcasting from `uint256`/`int256` in Solidity does not revert on overflow. This can result in undesired exploitation or bugs, since developers usually assume that overflows raise errors. [OpenZeppelin's SafeCast library](https://docs.openzeppelin.com/contracts/3.x/api/utils#SafeCast) restores this intuition by reverting the transaction when such an operation overflows. Using this library eliminates an entire class of bugs, so it's recommended to use it always. Some exceptions are acceptable like with the classic `uint256(uint160(address(variable)))`

_Instances (5)_:

```solidity
File: src/managers/LockManager.sol

249:         playerSettings[msg.sender].lockDuration = uint32(_duration);

257:                     uint32(block.timestamp) + uint32(_duration) <

267:                     uint32(_duration);

359:                 uint32(configStorage.getUint(StorageKey.MaxLockDuration))

369:                 nftOverlord.addReveal(_lockRecipient, uint16(numberNFTs));

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="L-6"></a>[L-6] Unsafe ERC20 operation(s)

_Instances (3)_:

```solidity
File: src/managers/LockManager.sol

376:             token.transferFrom(_tokenOwner, address(this), _quantity);

420:             payable(msg.sender).transfer(_quantity);

423:             token.transfer(msg.sender, _quantity);

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

## Medium Issues

|             | Issue                                                                   | Instances |
| ----------- | :---------------------------------------------------------------------- | :-------: |
| [M-1](#M-1) | Contracts are vulnerable to fee-on-transfer accounting-related issues   |     1     |
| [M-2](#M-2) | `call()` should be used instead of `transfer()` on an `address payable` |     1     |
| [M-3](#M-3) | Return values of `transfer()`/`transferFrom()` not checked              |     2     |
| [M-4](#M-4) | Unsafe use of `transfer()`/`transferFrom()` with `IERC20`               |     2     |

### <a name="M-1"></a>[M-1] Contracts are vulnerable to fee-on-transfer accounting-related issues

Consistently check account balance before and after transfers for Fee-On-Transfer discrepancies. As arbitrary ERC20 tokens can be used, the amount here should be calculated every time to take into consideration a possible fee-on-transfer or deflation.
Also, it's a good practice for the future of the solution.

Use the balance before and after the transfer to calculate the received amount instead of assuming that it would be equal to the amount passed as a parameter. Or explicitly document that such tokens shouldn't be used and won't be supported

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

376:             token.transferFrom(_tokenOwner, address(this), _quantity);

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="M-2"></a>[M-2] `call()` should be used instead of `transfer()` on an `address payable`

The use of the deprecated `transfer()` function for an address may make the transaction fail due to the 2300 gas stipend

_Instances (1)_:

```solidity
File: src/managers/LockManager.sol

420:             payable(msg.sender).transfer(_quantity);

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="M-3"></a>[M-3] Return values of `transfer()`/`transferFrom()` not checked

Not all `IERC20` implementations `revert()` when there's a failure in `transfer()`/`transferFrom()`. The function signature has a `boolean` return value and they indicate errors that way instead. By not checking the return value, operations that should have marked as failed, may potentially go through without actually making a payment

_Instances (2)_:

```solidity
File: src/managers/LockManager.sol

376:             token.transferFrom(_tokenOwner, address(this), _quantity);

423:             token.transfer(msg.sender, _quantity);

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)

### <a name="M-4"></a>[M-4] Unsafe use of `transfer()`/`transferFrom()` with `IERC20`

Some tokens do not implement the ERC20 standard properly but are still accepted by most code that accepts ERC20 tokens. For example Tether (USDT)'s `transfer()` and `transferFrom()` functions on L1 do not return booleans as the specification requires, and instead have no return value. When these sorts of tokens are cast to `IERC20`, their [function signatures](https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca) do not match and therefore the calls made, revert (see [this](https://gist.github.com/IllIllI000/2b00a32e8f0559e8f386ea4f1800abc5) link for a test case). Use OpenZeppelin's `SafeERC20`'s `safeTransfer()`/`safeTransferFrom()` instead

_Instances (2)_:

```solidity
File: src/managers/LockManager.sol

376:             token.transferFrom(_tokenOwner, address(this), _quantity);

423:             token.transfer(msg.sender, _quantity);

```

[Link to code](https://github.com/code-423n4/2024-05-munchables/blob/main/src/managers/LockManager.sol)
