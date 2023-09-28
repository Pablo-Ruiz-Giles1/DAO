// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


import "./GovernanceToken.sol";


contract NFTContract is ERC721Enumerable, Ownable {
    struct NFTMetadata {
        string name;
        string cid;
        string description;
        address creator;
        uint256 price;
        uint8 format;
    }

    mapping(uint256 => NFTMetadata) public _nftMetadata;
    uint256 private _tokenIdCounter;

    //Para enalzarlo con GovernanceTokenContract
    address public GovernanceTokenContract;

    constructor(string memory name, string memory symbol, address _GovernanceTokenContract) ERC721(name, symbol) {
        _tokenIdCounter = 1;
        GovernanceTokenContract = _GovernanceTokenContract;
    }

    function createNFT(string memory name, string memory cid, string memory description, uint256 price, address _creator, uint8 _format) public {
        require(price > 0, "Price must be greater than zero");

        uint256 tokenId = _tokenIdCounter;
        _safeMint(_creator, tokenId);
        _nftMetadata[tokenId] = NFTMetadata(name, cid, description, _creator, price, _format);
        _tokenIdCounter++;
    }

    function getNFTMetadata(uint256 tokenId) public view returns (string memory name, string memory cid, string memory description, address creator, uint256 price) {
        require(_exists(tokenId), "Token ID does not exist");
        NFTMetadata memory metadata = _nftMetadata[tokenId];
        return (metadata.name, metadata.cid, metadata.description, metadata.creator, metadata.price);
    }

    //Para vender un NFT tuyo a otro
    function exchangeNFT(uint256 tokenId, address recipient) public {
        require(_exists(tokenId), "Token ID does not exist");
        require(GovernanceToken(GovernanceTokenContract).balanceOf(recipient) > _nftMetadata[tokenId].price, "Saldo insuficiente");

        address owner = ownerOf(tokenId);
        require(owner == msg.sender || getApproved(tokenId) == msg.sender || isApprovedForAll(owner, msg.sender), "You are not allowed to transfer this NFT");
        
        // Transfiere el NFT al destinatario
                
        GovernanceToken(GovernanceTokenContract).burn(recipient, _nftMetadata[tokenId].price);
        GovernanceToken(GovernanceTokenContract).mint(msg.sender, _nftMetadata[tokenId].price);
        
        _transfer(owner, recipient, tokenId);
    }


    //Para comprar un NFT a otro
function exchangeNFTOther(uint256 tokenId, address recipient) public {
    require(_exists(tokenId), "Token ID does not exist");

    // Asegurarse de que el comprador es el que llama a la función
    require(recipient == msg.sender, "You are not the recipient");

    address owner = ownerOf(tokenId);

    // Verificar que el vendedor y el comprador sean diferentes
    require(owner != recipient, "The seller and buyer cannot be the same address");

    // Verificar que el precio del NFT es mayor que cero
    require(_nftMetadata[tokenId].price > 0, "NFT price must be greater than zero");

    // Verificar que el comprador tiene suficientes tokens de gobierno para comprar el NFT
    require(GovernanceToken(GovernanceTokenContract).balanceOf(recipient) >= _nftMetadata[tokenId].price, "Insufficient balance");

    // Transfiere los tokens de gobierno del comprador al vendedor y viceversa
    GovernanceToken(GovernanceTokenContract).burn(recipient, _nftMetadata[tokenId].price);
    GovernanceToken(GovernanceTokenContract).mint(owner, _nftMetadata[tokenId].price);

    // Transfiere el NFT al destinatario
    _transfer(owner, recipient, tokenId);
}


    //Tras eliminar una empresa
function NFTCompanydelete(address recipient) public {


    

    uint256 balance = balanceOf(recipient);
    uint256[] memory ownedNFTs = new uint256[](balance);

    for (uint256 i = 0; i < balance; i++) {
            ownedNFTs[i] = tokenOfOwnerByIndex(recipient, i);
        _transfer(msg.sender, recipient, ownedNFTs[i]);

            }


}
        

    // Obtener la dirección del poseedor actual del NFT
    function getCurrentOwner(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Token ID does not exist");
        return ownerOf(tokenId);
    }


        // Obtener la cantidad de NFT creados
    function getNFTlength() public view returns (uint256) {
        
        return (_tokenIdCounter - 1);
    }


    // Obtener todos los IDs de los NFT que posee una dirección
    function getNFTsByOwner(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory ownedNFTs = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            ownedNFTs[i] = tokenOfOwnerByIndex(owner, i);
        }

        return ownedNFTs;
    }
}
