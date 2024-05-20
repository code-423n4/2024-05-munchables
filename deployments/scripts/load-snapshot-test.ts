import { Address, toHex, zeroAddress } from "viem";
import { DeployedContractsType } from "../actions/deploy-contracts";
import { TokenType } from "../actions/load-snapshot-data";
import { getConfig } from "../utils/config";
import { ENV, IndividualConfigType } from "../utils/config-consts";
import { StoredData, load, toDeployedContracts } from "../utils/store";

function randomInRange(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
// Helper function to create a random variation of the boilerplate object
function createRandomBoilerplate(owner: Address) {
  const token = 1;
  const isPurchased = Math.random() > 0.5;
  return {
    claimed: {
      claimed: false,
      owner: owner,
      lock_token: token,
      level: randomInRange(1, 10),
      last_petted_time: 0,
      rarity: randomInRange(1, 5),
      species: randomInRange(1, 125),
      realm: randomInRange(0, 4),
      tokenId: randomInRange(1, 10000),
      lock_amount: isPurchased ? 0n : randomInRange(1e17, 5e17),
      schnibbles: randomInRange(1e17, 100e18),
      strength: randomInRange(5, 15),
      agility: randomInRange(10, 20),
      stamina: randomInRange(10, 20),
      defence: randomInRange(10, 30),
      voracity: randomInRange(30, 50),
      cuteness: randomInRange(10, 30),
      charisma: randomInRange(5, 15),
      trustworthiness: randomInRange(5, 15),
      leadership: randomInRange(5, 15),
      empathy: randomInRange(5, 15),
      intelligence: randomInRange(10, 20),
      cunning: randomInRange(5, 15),
      creativity: randomInRange(5, 15),
      adaptability: randomInRange(5, 15),
      wisdom: randomInRange(5, 15),
    },
    unrevealed: randomInRange(0, 20),
  };
}

export async function loadMockSnapshotDataIntoContract({
  deployedContracts,
  config,
}: {
  deployedContracts: DeployedContractsType;
  config: IndividualConfigType;
}) {
  const migrationManager = deployedContracts.migrationManager;
  try {
    const owners: Address[] = [
      "0x15EE71940cDb8A7D7B41baaFcF2B32fEDb8F3a4d",
      "0x8219585614C2502b7181964A6923104e36BAe20c",
      "0xBE3868e20Ac520A90B06708BA03A3a44eD4af8DE",
      "0x84C3Efe8b915Ece5219E2bA87177a9bD18dbd14D",
      "0xF63dB987D06990D9AA3c9e15735cc9b71453DCB1",
    ];
    const ownerData: ReturnType<typeof createRandomBoilerplate>[] = [];

    owners.forEach((owner) => {
      const numEntries = randomInRange(10, 20);
      for (let i = 0; i < numEntries; i++) {
        ownerData.push(createRandomBoilerplate(owner));
      }
    });
    for (let i = 0; i < ownerData.length; i += 3) {
      console.log(i);
      const batch = ownerData.slice(i, i + 3);
      console.log(batch);
      await migrationManager!.contract.write.loadUnrevealedSnapshot([
        [
          batch[0].claimed.owner as Address,
          batch[1].claimed.owner as Address,
          batch[2].claimed.owner as Address,
        ],
        [BigInt(batch[0].unrevealed), BigInt(batch[1].unrevealed), BigInt(batch[2].unrevealed)],
      ]);
      await delay(5000);
      await migrationManager!.contract.write.loadMigrationSnapshot([
        batch.map(({ claimed: d }) => d.owner as Address),
        batch.map(({ claimed: d }) => ({
          claimed: false,
          tokenId: BigInt(d.tokenId),
          lockAmount: BigInt(d.lock_amount),
          token:
            Number(d.lock_token) == TokenType.USDB
              ? config.externalAddresses.usdb
              : Number(d.lock_token) == TokenType.WETH
                ? config.externalAddresses.weth
                : zeroAddress,
          attributes: {
            chonks: BigInt(d.schnibbles),
            level: Number(d.level),
            evolution: 0,
            lastPettedTime: BigInt(d.last_petted_time),
          },
          immutableAttributes: {
            rarity: Number(d.rarity),
            species: Number(d.species),
            realm: Number(d.realm),
            generation: 1,
            hatchedDate: 0,
          },
          gameAttributes: [
            {
              dataType: 3,
              value: toHex(Number(d.strength)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.agility)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.stamina)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.defence)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.voracity)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.cuteness)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.charisma)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.trustworthiness)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.leadership)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.empathy)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.intelligence)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.cunning)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.creativity)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.adaptability)),
            },
            {
              dataType: 3,
              value: toHex(Number(d.wisdom)),
            },
            {
              dataType: 1,
              value: toHex(true),
            },
          ],
        })),
      ]);
      await delay(5000);
    }
    await migrationManager!.contract.write.sealData();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

const main = async () => {
  const env = process.env.ENV as ENV;

  const config: IndividualConfigType = getConfig(env);

  const deployFilename = process.argv[2] as `0x${string}`;
  if (!deployFilename || deployFilename.substring(0, 11) !== "deployment-") {
    console.log(`Usage : load-snapshot-test.ts <deploy_cache_filename>`);
    process.exit(1);
  }
  const storedData: StoredData | null = await load(env, deployFilename);
  const deployedContracts: DeployedContractsType = await toDeployedContracts(config, storedData!);

  await loadMockSnapshotDataIntoContract({
    deployedContracts,
    config,
  });
};

main();
