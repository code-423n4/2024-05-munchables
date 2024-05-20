import csv from "csv-parser";
import fs from "fs";
import { Address, getAddress, toHex, zeroAddress } from "viem";
import { assertTxSuccess } from "../../tests/utils/asserters";
import { IndividualConfigType } from "../utils/config-consts";
import { DeployedContractsType } from "./deploy-contracts";

export enum TokenType {
  UNKNOWN = 0,
  ETH,
  USDB,
  WETH,
}

interface Season1RevealedData {
  tokenId: string;
  tokenURI: string;
  owner: string;
  schnibbles: string;
  rarity: string;
  level: string;
  species: string;
  realm: string;
  last_petted_time: string;
  strength: string;
  agility: string;
  stamina: string;
  defence: string;
  voracity: string;
  cuteness: string;
  charisma: string;
  trustworthiness: string;
  leadership: string;
  empathy: string;
  intelligence: string;
  cunning: string;
  creativity: string;
  adaptability: string;
  wisdom: string;
  lock_amount: string;
  lock_token: string;
  revealer: string;
}

interface Season1UnrevealedData {
  address: string;
  unrevealed: number;
}

function readSeason1Data<T extends object>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const tokens: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: T) => tokens.push(data))
      .on("end", () => resolve(tokens))
      .on("error", (error) => reject(error));
  });
}

export async function loadSnapshotData() {
  const revealedFile = "deployments/actions/snapshot-data/revealed.csv";
  const unrevealedFile = "deployments/actions/snapshot-data/unrevealed.csv";
  try {
    const revealedData = await readSeason1Data<Season1RevealedData>(revealedFile);
    const unrevealedData = await readSeason1Data<Season1UnrevealedData>(unrevealedFile);
    return {
      revealedData,
      unrevealedData,
    };
  } catch (error) {
    process.exit(0);
  }
}

export async function loadSnapshotDataIntoContract({
  config,
  contracts,
}: {
  config: IndividualConfigType;
  contracts: DeployedContractsType;
}) {
  const uniqueRevealedOwners = new Set<Address>();
  const uniqueUnrevealedOwners = new Set<Address>();
  try {
    const { revealedData, unrevealedData } = await loadSnapshotData();
    const ownerNftCountMap = new Map<Address, number>();

    revealedData.forEach((d) => {
      const ownerAddress = getAddress(d.owner);
      if (ownerNftCountMap.has(ownerAddress)) {
        ownerNftCountMap.set(ownerAddress, ownerNftCountMap.get(ownerAddress)! + 1);
      } else {
        ownerNftCountMap.set(ownerAddress, 1);
      }
    });

    const topOwners = Array.from(ownerNftCountMap)
      .sort((a, b) => b[1] - a[1])
      .map((owner) => owner[0]);

    for (const owner of topOwners) {
      const ownerData = revealedData.filter((d) => getAddress(d.owner) === owner);
      uniqueRevealedOwners.add(owner);
      for (let i = 0; i < ownerData.length; i += 5) {
        const batch = ownerData.slice(i, i + 5);
        await contracts.migrationManager.contract.write.loadMigrationSnapshot([
          batch.map((d) => d.owner as Address),
          batch.map((d) => ({
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
      }
    }

    while (unrevealedData.length > 0) {
      const data = unrevealedData.splice(0, 20);
      const filteredData = data.filter((d) => d.unrevealed !== 0);

      filteredData.forEach((d) => uniqueUnrevealedOwners.add(getAddress(d.address)));
      await contracts.migrationManager.contract.write.loadUnrevealedSnapshot([
        filteredData.map((d) => d.address as Address),
        filteredData.map((d) => d.unrevealed),
      ]);
    }

    const firstHash = await contracts.migrationManager.contract.write.sealData();
    await assertTxSuccess({ txHash: firstHash });
    return {
      uniqueRevealedOwners,
      uniqueUnrevealedOwners,
    };
  } catch (error) {
    process.exit(0);
  }
}
