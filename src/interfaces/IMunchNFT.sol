// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

interface IMunchNFT {
    /// @notice Get the next token ID
    /// @return The next token ID
    function nextTokenId() external view returns (uint256);

    /// @notice Mint a new, empty token.  Restrict access to only the NFTOverlord
    /// @param _owner The owner of the newly minted NFT
    function mint(address _owner) external returns (uint256 _tokenId);

    /// @notice Update the token URL, restricted to off-chain role
    /// @param _tokenId The token ID to update
    /// @param _tokenURI The new URI, will be an IPFS hash
    function setTokenURI(uint256 _tokenId, string memory _tokenURI) external;
}
