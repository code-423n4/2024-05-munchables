// TODO: Think of better name for this file

export enum Rarity {
  Primordial,
  Common,
  Rare,
  Epic,
  Legendary,
  Mythic,
  Invalid,
}

export enum Realm {
  Everfrost,
  Drench,
  Moltania,
  Arridia,
  Verdentis,
  Invalid,
}

export const LEVEL_THRESHOLDS = [
  BigInt(250),
  BigInt(500),
  BigInt(750),
  BigInt(1000),
  BigInt(1250),
  BigInt(1500),
  BigInt(1750),
  BigInt(2000),
  BigInt(2250),
  BigInt(4750),
  BigInt(7500),
  BigInt(10500),
  BigInt(13750),
  BigInt(17250),
  BigInt(21000),
  BigInt(25000),
  BigInt(29250),
  BigInt(33750),
  BigInt(38500),
  BigInt(48250),
  BigInt(58500),
  BigInt(69250),
  BigInt(80500),
  BigInt(92250),
  BigInt(122500),
  BigInt(154000),
  BigInt(186750),
  BigInt(220750),
  BigInt(256000),
  BigInt(299750),
  BigInt(345000),
  BigInt(391750),
  BigInt(440000),
  BigInt(489750),
  BigInt(549500),
  BigInt(611000),
  BigInt(674250),
  BigInt(739250),
  BigInt(806000),
  BigInt(884250),
  BigInt(964500),
  BigInt(1046750),
  BigInt(1131000),
  BigInt(1217250),
  BigInt(1316500),
  BigInt(1418000),
  BigInt(1521750),
  BigInt(1627750),
  BigInt(1736000),
  BigInt(1858750),
  BigInt(1984000),
  BigInt(2111750),
  BigInt(2242000),
  BigInt(2374750),
  BigInt(2523500),
  BigInt(2675000),
  BigInt(2829250),
  BigInt(2986250),
  BigInt(3146000),
  BigInt(3323250),
  BigInt(3503500),
  BigInt(3686750),
  BigInt(3873000),
  BigInt(4062250),
  BigInt(4270500),
  BigInt(4482000),
  BigInt(4696750),
  BigInt(4914750),
  BigInt(5136000),
  BigInt(5377750),
  BigInt(5623000),
  BigInt(5871750),
  BigInt(6124000),
  BigInt(6379750),
  BigInt(6657500),
  BigInt(6939000),
  BigInt(7224250),
  BigInt(7513250),
  BigInt(7806000),
  BigInt(8122250),
  BigInt(8442500),
  BigInt(8766750),
  BigInt(9095000),
  BigInt(9427250),
  BigInt(9784500),
  BigInt(10146000),
  BigInt(10511750),
  BigInt(10881750),
  BigInt(11256000),
  BigInt(11656750),
  BigInt(12062000),
  BigInt(12471750),
  BigInt(12886000),
  BigInt(13304750),
  BigInt(13751500),
  BigInt(14203000),
  BigInt(14659250),
  BigInt(15120250),
  BigInt(15586000),
  BigInt(16081250),
].map((v) => v * BigInt(1e18));

export const PRIMORDIAL_LEVEL_THRESHOLDS = [BigInt(250), BigInt(500), BigInt(750)].map(
  (v) => v * BigInt(1e18)
);

export const REALM_BONUSES = [
  10, -10, -5, 0, 5, -10, 10, -5, 5, 0, -5, 0, 10, 5, -10, 0, -5, 10, 10, -10, 5, 10, 0, -10, 10,
];

export const RARITY_BONUSES = [0, 0, 10, 20, 30, 50];

export const REALM_LOOKUPS = [
  0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4,
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
];
