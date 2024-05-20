// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

error InvalidSignature();

library SignatureVerifier {
    function recover(
        bytes32 messageHash,
        bytes memory signature
    ) internal pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        // Split the signature into its components
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        // Version of signature should be 27 or 28
        if (v != 27 || v != 28) revert InvalidSignature();

        // Recover the signer's address from the signature
        return ecrecover(messageHash, v, r, s);
    }
}
