import assert from "node:assert/strict";
import { after, afterEach, before, beforeEach, describe, it } from "node:test";
import { parseEther } from "viem";
import { DeployedContractsType } from "../../../deployments/actions/deploy-contracts";
import { Role } from "../../../deployments/utils/config-consts";
import { assertTransactionEvents, assertTxSuccess } from "../../utils/asserters";
import { testClient } from "../../utils/consts";
import { getTestContracts, getTestRoleAddresses } from "../../utils/contracts";
import {
  MockMigrationManagerContractType,
  deployMockMigrationManager,
} from "../../utils/mock-contracts";

describe("ClaimManager: burnNFTsForPoints", () => {
  let bob: `0x${string}`;
  let newPeriodRole: `0x${string}`;
  let beforeSnapshot: `0x${string}`;
  let beforeEachSnapshot: `0x${string}`;
  let testContracts: DeployedContractsType;
  let mockMigrationManager: MockMigrationManagerContractType;

  before(async () => {
    testContracts = await getTestContracts();

    beforeSnapshot = await testClient.snapshot();

    const testRoleAddresses = await getTestRoleAddresses();
    [bob] = testRoleAddresses.users;
    newPeriodRole = testRoleAddresses[Role.NewPeriod];
    mockMigrationManager = await deployMockMigrationManager({ testContracts });
    await testClient.setBalance({
      address: newPeriodRole,
      value: parseEther("10"),
    });
  });

  beforeEach(async () => {
    beforeEachSnapshot = await testClient.snapshot();
  });

  afterEach(async () => {
    await testClient.revert({ id: beforeEachSnapshot });
  });

  after(async () => {
    await testClient.revert({ id: beforeSnapshot });
  });

  describe("burn nfts for points", () => {
    it("test single rarity", async () => {
      const singleRarity = await mockMigrationManager.write.burnNFTsForPoints([bob, [0, 1]], {
        account: newPeriodRole,
      });
      const txReceipt = await assertTxSuccess({ txHash: singleRarity });
      assertTransactionEvents({
        abi: testContracts.claimManagerRoot.contract.abi,
        logs: txReceipt.logs,
        expectedEvents: [
          {
            eventName: "NFTsBurnedForPoints",
            args: {
              _player: bob,
              _tokenIdsByRarity: [0, 1],
              _points: 1000n,
            },
          },
        ],
      });
      const points = await testContracts.claimManagerProxy.contract.read.getPoints([bob]);
      assert.equal(points, 1000n);
    });
    it("test various rarities", async () => {
      const txHash = await mockMigrationManager.write.burnNFTsForPoints(
        [bob, [0, 5, 7, 10, 3, 2]],
        { account: newPeriodRole }
      );
      const txReceipt = await assertTxSuccess({ txHash });
      const totalPoints = 1000n * (5n + 7n + 10n + 3n + 2n);
      assertTransactionEvents({
        abi: testContracts.claimManagerRoot.contract.abi,
        logs: txReceipt.logs,
        expectedEvents: [
          {
            eventName: "NFTsBurnedForPoints",
            args: {
              _player: bob,
              _tokenIdsByRarity: [0, 5, 7, 10, 3, 2],
              _points: totalPoints,
            },
          },
        ],
      });
      const points = await testContracts.claimManagerProxy.contract.read.getPoints([bob]);
      assert.equal(points, totalPoints);
    });
    it("nothing for outside of range", async () => {
      const singleRarity = await mockMigrationManager.write.burnNFTsForPoints(
        [bob, [0, 0, 0, 0, 0, 0, 0]],
        { account: newPeriodRole }
      );
      const txReceipt = await assertTxSuccess({ txHash: singleRarity });
      assertTransactionEvents({
        abi: testContracts.claimManagerRoot.contract.abi,
        logs: txReceipt.logs,
        expectedEvents: [
          {
            eventName: "NFTsBurnedForPoints",
            args: {
              _player: bob,
              _tokenIdsByRarity: [0, 0, 0, 0, 0, 0, 0],
              _points: 0n,
            },
          },
        ],
      });
      const points = await testContracts.claimManagerProxy.contract.read.getPoints([bob]);
      assert.equal(points, 0n);
    });
  });
});
