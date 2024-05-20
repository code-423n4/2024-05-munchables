import { IndividualConfigType, Role } from "../utils/config-consts";
import { checkTxSuccess, makeLogger } from "../utils/funcs";
import { DeployedContractsType } from "./deploy-contracts";

export async function startLockdrop({
  deployedContracts,
  config,
  startTime,
  endTime,
  logging = true,
}: {
  deployedContracts: DeployedContractsType;
  config: IndividualConfigType;
  startTime: number;
  endTime: number;
  logging?: boolean;
}) {
  const _log = makeLogger(logging);

  const { publicClient, walletClient } = config;
  const [deployer] = await walletClient.getAddresses();

  /// check who is admin now
  const admin = await deployedContracts.configStorage.contract.read.getUniversalRole([Role.Admin]);
  if (deployer !== admin) {
    console.error(
      `This script does not have admin role for this deployment (admin = ${admin}, script = ${deployer})`
    );
    process.exit(1);
  }

  const hash = await deployedContracts.lockManager.contract.write.configureLockdrop([
    { start: startTime, end: endTime, minLockDuration: endTime - startTime },
  ]);
  await checkTxSuccess(publicClient, hash, logging);
  _log(`Lockdrop configured`);
}
