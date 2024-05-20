import assert from "node:assert/strict";
import { after, afterEach, before, beforeEach, describe, it } from "node:test";
import { parseEther, zeroAddress } from "viem";
import { DeployedContractsType } from "../../../deployments/actions/deploy-contracts";
import { Role } from "../../../deployments/utils/config-consts";
import { assertContractFunctionRevertedError, assertTxSuccess } from "../../utils/asserters";
import { ONE_WEEK, STARTING_TIMESTAMP, testClient } from "../../utils/consts";
import { getTestContracts, getTestRoleAddresses } from "../../utils/contracts";
import { configureDefaultLock } from "../../utils/lock-configure";
import { registerPlayer, registerSubAccount } from "../../utils/players";
import { assertLockSuccess } from "./lock.test";

describe("LockManager: subacount prevention", () => {
  let admin: `0x${string}`;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let janice: `0x${string}`;
  let jirard: `0x${string}`;
  let beforeSnapshot: `0x${string}`;
  let beforeEachSnapshot: `0x${string}`;
  let testContracts: DeployedContractsType;

  before(async () => {
    testContracts = await getTestContracts();

    beforeSnapshot = await testClient.snapshot();

    const testRoleAddresses = await getTestRoleAddresses();
    [alice, bob, jirard, janice] = testRoleAddresses.users;
    admin = testRoleAddresses[Role.Admin];

    await testClient.setNextBlockTimestamp({ timestamp: STARTING_TIMESTAMP });
  });

  beforeEach(async () => {
    beforeEachSnapshot = await testClient.snapshot();
    await testClient.setBalance({
      address: alice,
      value: parseEther("10"),
    });
    await testClient.setBalance({
      address: bob,
      value: parseEther("10"),
    });
    await testClient.setBalance({
      address: janice,
      value: parseEther("10"),
    });
    await testClient.setBalance({
      address: jirard,
      value: parseEther("10"),
    });
  });

  afterEach(async () => {
    await testClient.revert({ id: beforeEachSnapshot });
  });

  after(async () => {
    await testClient.revert({ id: beforeSnapshot });
  });
  describe("subaccount proper locking/unlocking behavior", () => {
    beforeEach(async () => {
      await configureDefaultLock({ testContracts, admin: admin });
      await registerPlayer({ account: bob, testContracts });
      await registerSubAccount({
        account: bob,
        subAccount: janice,
        testContracts,
      });
    });
    it("allow lock for main account on behalf but not unlock", async () => {
      await assert.rejects(
        testContracts.lockManager.contract.simulate.lock([zeroAddress, parseEther("1")], {
          account: janice,
          value: parseEther("1"),
        }),
        (err: Error) => assertContractFunctionRevertedError(err, "SubAccountCannotLockError")
      );
      const txHash = await testContracts.lockManager.contract.write.lockOnBehalf(
        [zeroAddress, parseEther("1"), bob],
        { account: janice, value: parseEther("1") }
      );
      await assertTxSuccess({ txHash });
      await assertLockSuccess({
        testContracts,
        numberNFTs: 10n,
        player: bob,
        quantity: parseEther("1"),
        lockedQuantity: parseEther("1"),
        remainder: 0n,
        sender: janice,
        tokenContractAddress: zeroAddress,
        txHash,
        _lockDuration: ONE_WEEK,
      });
      await testClient.setNextBlockTimestamp({
        timestamp: STARTING_TIMESTAMP + ONE_WEEK * 7n,
      });
      await testClient.mine({ blocks: 1 });
      await assert.rejects(
        testContracts.lockManager.contract.simulate.unlock([zeroAddress, parseEther("1")], {
          account: janice,
        }),
        (err: Error) => assertContractFunctionRevertedError(err, "InsufficientLockAmountError")
      );
      const bobHash = await testContracts.lockManager.contract.write.unlock(
        [zeroAddress, parseEther("1")],
        { account: bob }
      );
      await assertTxSuccess({ txHash: bobHash });
    });
  });
});
