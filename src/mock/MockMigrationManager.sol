// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import "../managers/MigrationManager.sol";

contract MockMigrationManager is MigrationManager {
    constructor(address _configStorage) MigrationManager(_configStorage) {}

    function setUserMigrationCompletedDataForTest(
        address _user,
        MigrationTotals memory _userMigrationCompletedData,
        bool _didMigrate
    ) external {
        _userClaimedOnce[_user] = _didMigrate;
        _userLockedAmounts[_user] = _userMigrationCompletedData;
    }

    function callMintForMigrationForTest(
        address _player,
        MunchablesCommonLib.NFTAttributes memory _attributes,
        MunchablesCommonLib.NFTImmutableAttributes memory _immutableAttributes,
        MunchablesCommonLib.NFTGameAttribute[] memory _gameAttributes
    ) external {
        _nftOverlord.mintForMigration(
            _player,
            _attributes,
            _immutableAttributes,
            _gameAttributes
        );
    }

    function burnNFTsForPoints(
        address _player,
        uint8[] memory _rarities
    ) external {
        IClaimManager(configStorage.getAddress(StorageKey.ClaimManager))
            .burnNFTsForPoints(_player, _rarities);
    }

    function burnUnrevealedForPoints(
        address _player,
        uint256 numUnrevealed
    ) external {
        IClaimManager(configStorage.getAddress(StorageKey.ClaimManager))
            .burnUnrevealedForPoints(_player, numUnrevealed);
    }
}
