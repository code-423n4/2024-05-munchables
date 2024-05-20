import isEqual from "lodash.isequal";
import assert from "node:assert/strict";
import { after, afterEach, before, beforeEach, describe, it } from "node:test";
import { pad, toHex } from "viem";
import { DeployedContractsType } from "../../../deployments/actions/deploy-contracts";
import { LEVEL_THRESHOLDS, Rarity, Realm } from "../../../deployments/utils/consts";
import {
  assertContractFunctionRevertedError,
  assertTransactionEvents,
  assertTxSuccess,
} from "../../utils/asserters";
import { testClient } from "../../utils/consts";
import { getTestContracts, getTestRoleAddresses } from "../../utils/contracts";
import {
  MockNFTAttributesManagerContractType,
  MockRNGProxyContractType,
  MockSnuggeryManagerContractType,
  deployMockNFTAttributesManager,
  deployMockRNGProxy,
  deployMockSnuggeryManager,
} from "../../utils/mock-contracts";

const tokenId = 1n;
const immutableAttributes = {
  rarity: Rarity.Common,
  species: 1,
  realm: Realm.Everfrost,
  generation: 1,
  hatchedDate: Math.floor(Date.now() / 1000),
};
const attributes = {
  chonks: 0n,
  level: 1,
  evolution: 1,
  lastPettedTime: BigInt(Math.floor(Date.now() / 1000)),
};

async function assertLevelUpSuccess({
  player,
  levelFrom,
  levelTo,
  expectedGameAttributes,
  txHash,
  testContracts,
  mockNFTAttributesManager,
}: {
  player: `0x${string}`;
  levelFrom: number;
  levelTo: number;
  expectedGameAttributes: {
    dataType: number;
    value: `0x${string}`;
  }[];
  txHash: `0x${string}`;
  testContracts: DeployedContractsType;
  mockNFTAttributesManager: MockNFTAttributesManagerContractType;
}) {
  const txReceipt = await assertTxSuccess({ txHash });

  assertTransactionEvents({
    abi: testContracts.nftOverlord.contract.abi,
    logs: txReceipt.logs,
    expectedEvents: [
      {
        eventName: "LevelledUp",
        args: {
          _owner: player,
          _tokenId: tokenId,
          _fromLevel: levelFrom,
          _toLevel: levelTo,
        },
      },
    ],
  });

  const actualAttributes = await mockNFTAttributesManager.read.getAttributes([tokenId]);
  assert.equal(actualAttributes.level, levelTo);

  const actualGameAttributes = await mockNFTAttributesManager.read.getGameAttributes([tokenId, []]);
  assert(
    isEqual(actualGameAttributes, expectedGameAttributes),
    "actual game attributes should match expected game attributes"
  );
}

describe("NFTOverlord: levelUp", () => {
  let alice: `0x${string}`;
  let beforeSnapshot: `0x${string}`;
  let beforeEachSnapshot: `0x${string}`;
  let testContracts: DeployedContractsType;
  let mockNFTAttributesManager: MockNFTAttributesManagerContractType;
  let mockRNGProxy: MockRNGProxyContractType;
  let mockSnuggeryManager: MockSnuggeryManagerContractType;

  before(async () => {
    testContracts = await getTestContracts();
    beforeSnapshot = await testClient.snapshot();
    const testRoleAddresses = await getTestRoleAddresses();

    [alice] = testRoleAddresses.users;

    mockNFTAttributesManager = await deployMockNFTAttributesManager({
      testContracts,
      notify: false,
    });
    mockRNGProxy = await deployMockRNGProxy({ testContracts, notify: false });
    mockSnuggeryManager = await deployMockSnuggeryManager({ testContracts });

    const setImmutableAttrsTxHash =
      await mockNFTAttributesManager.write.setImmutableAttributesForTest([
        tokenId,
        immutableAttributes,
      ]);
    await assertTxSuccess({ txHash: setImmutableAttrsTxHash });
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

  it("should revert with UnauthorisedError when not called by RNGProxy", async () => {
    await assert.rejects(
      testContracts.nftOverlord.contract.simulate.levelUp([tokenId, toHex("abc123")], {
        account: alice,
      }),
      (err: Error) => assertContractFunctionRevertedError(err, "UnauthorisedError")
    );
  });

  describe("when no level up request exists", () => {
    it("should revert with InvalidLevelUpRequest", async () => {
      await assert.rejects(
        mockRNGProxy.simulate.callLevelUpForTest([tokenId, toHex("abc123")]),
        (err: Error) =>
          assertContractFunctionRevertedError(
            err,
            "InvalidLevelUpRequest",
            testContracts.nftOverlord.contract.abi
          )
      );
    });
  });

  describe("when level up request exists", () => {
    beforeEach(async () => {
      const setAttributesTxHash = await mockNFTAttributesManager.write.setAttributesForTest([
        tokenId,
        { ...attributes, chonks: LEVEL_THRESHOLDS[0] },
      ]);
      await assertTxSuccess({ txHash: setAttributesTxHash });

      const munchableFedTxHash = await mockSnuggeryManager.write.callMunchableFedForTest([
        tokenId,
        alice,
      ]);
      await assertTxSuccess({ txHash: munchableFedTxHash });
    });

    describe("when level has changed", () => {
      beforeEach(async () => {
        const setAttributesTxHash = await mockNFTAttributesManager.write.setAttributesForTest([
          tokenId,
          { ...attributes, level: 2 },
        ]);
        await assertTxSuccess({ txHash: setAttributesTxHash });
      });

      it("should revert with InvalidLevelUpRequest", async () => {
        await assert.rejects(
          mockRNGProxy.simulate.callLevelUpForTest([tokenId, toHex("abc123")]),
          (err: Error) =>
            assertContractFunctionRevertedError(
              err,
              "InvalidLevelUpRequest",
              testContracts.nftOverlord.contract.abi
            )
        );
      });
    });

    it("should revert with NotEnoughRandomError when not enough RNG", async () => {
      await assert.rejects(
        mockRNGProxy.simulate.callLevelUpForTest([tokenId, toHex("0")]),
        (err: Error) =>
          assertContractFunctionRevertedError(
            err,
            "NotEnoughRandomError",
            testContracts.nftOverlord.contract.abi
          )
      );
    });

    describe("when game attributes not set", () => {
      it("should increase level and set game attributes", async () => {
        const txHash = await mockRNGProxy.write.callLevelUpForTest([
          tokenId,
          toHex("123123123123123123"),
        ]);
        await assertLevelUpSuccess({
          player: alice,
          levelFrom: 1,
          levelTo: 2,
          expectedGameAttributes: [
            { dataType: 3, value: pad(toHex(1)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 3, value: pad(toHex(1)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 3, value: pad(toHex(1)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 3, value: pad(toHex(1)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 3, value: pad(toHex(1)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 0, value: "0x" },
          ],
          txHash,
          testContracts,
          mockNFTAttributesManager,
        });
      });
    });

    describe("when level and game attributes already increased", () => {
      beforeEach(async () => {
        const levelUpTxHash = await mockRNGProxy.write.callLevelUpForTest([
          tokenId,
          toHex("123123123123123123"),
        ]);
        await assertTxSuccess({ txHash: levelUpTxHash });

        const setAttributesTxHash = await mockNFTAttributesManager.write.setAttributesForTest([
          tokenId,
          { ...attributes, chonks: LEVEL_THRESHOLDS[1], level: 2 },
        ]);
        await assertTxSuccess({ txHash: setAttributesTxHash });

        const munchableFedTxHash = await mockSnuggeryManager.write.callMunchableFedForTest([
          tokenId,
          alice,
        ]);
        await assertTxSuccess({ txHash: munchableFedTxHash });
      });

      it("should increase level and increase game attributes", async () => {
        const txHash = await mockRNGProxy.write.callLevelUpForTest([
          tokenId,
          toHex("123123123123123123"),
        ]);
        await assertLevelUpSuccess({
          player: alice,
          levelFrom: 2,
          levelTo: 3,
          expectedGameAttributes: [
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(4)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(4)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(4)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(4)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 3, value: pad(toHex(2)) },
            { dataType: 3, value: pad(toHex(4)) },
            { dataType: 3, value: pad(toHex(0)) },
            { dataType: 0, value: "0x" },
          ],
          txHash,
          testContracts,
          mockNFTAttributesManager,
        });
      });
    });
  });
});
