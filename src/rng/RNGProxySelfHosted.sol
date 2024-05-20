// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "../interfaces/IRNGProxy.sol";
import "../interfaces/IRNGProxySelfHosted.sol";
import "../config/BaseConfigStorage.sol";
import "./BaseRNGProxy.sol";

contract RNGProxySelfHosted is BaseRNGProxy, IRNGProxySelfHosted {
    constructor(address _configStorage) BaseRNGProxy(_configStorage) {}

    function provideRandom(
        uint256 _index,
        bytes calldata _rand
    ) public onlyRole(Role.NFTOracle) {
        super._callback(_index, _rand);
    }
}
