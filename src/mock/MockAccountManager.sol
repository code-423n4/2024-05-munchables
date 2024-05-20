// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import "../managers/AccountManager.sol";

contract MockAccountManager is AccountManager {
    constructor(address _configStorage) {
        BaseBlastManagerUpgradeable.initialize(_configStorage);
        _reconfigure();
    }

    function giveSchnibbles(
        address _playerAddress,
        uint256 _schnibbles
    ) external {
        players[_playerAddress].unfedSchnibbles += _schnibbles;
    }
}
