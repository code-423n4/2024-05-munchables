// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../interfaces/IMunchNFT.sol";
import "../interfaces/IAccountManager.sol";
import "../interfaces/IMigrationManager.sol";
import "../managers/BaseBlastManager.sol";
import "../interfaces/IMunchadexManager.sol";

contract MunchNFT is
    IMunchNFT,
    BaseBlastManager,
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Pausable,
    ReentrancyGuard
{
    /// @notice nextTokenId : Next token id
    uint256 public nextTokenId = 1;

    IAccountManager public accountManager;
    IMigrationManager public migrationManager;
    IMunchadexManager public munchadexManager;

    constructor(
        address _configStorage,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        __BaseConfigStorage_setConfigStorage(_configStorage);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
        munchadexManager.updateMunchadex(from, to, tokenId);
        super.transferFrom(from, to, tokenId);
    }

    function _reconfigure() internal {
        accountManager = IAccountManager(
            configStorage.getAddress(StorageKey.AccountManager)
        );
        migrationManager = IMigrationManager(
            configStorage.getAddress(StorageKey.MigrationManager)
        );
        munchadexManager = IMunchadexManager(
            configStorage.getAddress(StorageKey.MunchadexManager)
        );

        super.__BaseBlastManager_reconfigure();
    }

    function configUpdated() external override onlyConfigStorage {
        _reconfigure();
    }

    function mint(
        address _owner
    )
        external
        onlyConfiguredContract(StorageKey.NFTOverlord)
        returns (uint256 _tokenId)
    {
        uint256 tokenId = nextTokenId++;
        munchadexManager.updateMunchadex(address(0), _owner, tokenId);
        _mint(_owner, tokenId);
        _tokenId = tokenId;
    }

    function setTokenURI(
        uint256 _tokenId,
        string memory _tokenURI
    ) external onlyRole(Role.NFTOracle) {
        _setTokenURI(_tokenId, _tokenURI);
    }

    function _baseURI()
        internal
        pure
        override
        returns (string memory _baseUri)
    {
        return "ipfs://";
    }

    function _update(
        address _to,
        uint256 _tokenId,
        address _auth
    )
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(_to, _tokenId, _auth);
    }

    function _increaseBalance(
        address _account,
        uint128 _value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(_account, _value);
    }

    function tokenURI(
        uint256 _tokenId
    )
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory _uri)
    {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(
        bytes4 _interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool _supported)
    {
        return super.supportsInterface(_interfaceId);
    }
}
