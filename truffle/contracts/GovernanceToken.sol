// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
contract GovernanceToken is ERC20Votes {

 // uint256 public s_maxSupply = 1000000000000000000000000;

// Events
  event TokenMinted(address indexed to, uint256 amount);
  event TokenBurned(address indexed from, uint256 amount);
  //EL que despliega el contrato
  address private owner;
  // max tokens per user
  uint256 constant TOKENS_PER_USER = 1 * 10**18;
  uint256 constant TOTAL_SUPPLY = 100 * 10**18;
  //uint256 constant TOTAL_SUPPLY = 10000;

     
    address public admin; //Cuenta de admin, se usa para posteriormente añadir cosas



      // Mappings
  mapping(address => bool) public s_claimedTokens;

    // Number of holders
  address[] public s_traductores;

    /// Datos de una propuesta.
    struct DatosHolders {
        uint256 amount;
    }

   /// Acceder a los datos de los holders dado su address
    mapping (address => DatosHolders) public datosHolders;
    
    address NFT;



      //Construcotr que inicia owner y admin, y posteriormente mina un porcentaje de tokens
    constructor(uint256 _keepPercentage)
        ERC20("TokenDAO", "TDAO")
        ERC20Permit("TokenDAO")
    {
        uint256 keepAmount = (TOTAL_SUPPLY * _keepPercentage) / 100;
        _mint(msg.sender, TOTAL_SUPPLY);

        owner = address(0);
        admin = msg.sender;

       //   mint(msg.sender, TOTAL_SUPPLY - keepAmount);
        _transfer(msg.sender, address(this), TOTAL_SUPPLY - keepAmount);
        s_claimedTokens[msg.sender] = true;
      //  _mint(msg.sender, TOKENS_PER_USER * 10**18);
      _mint(msg.sender, TOKENS_PER_USER);
        s_traductores.push(msg.sender);

    }
     
      //Solo el Owner puede modificarlo
        modifier onlyOwner() {
        require(owner == msg.sender, "El owner tiene que hacerlo");
        _;
    }
      //Solo el Admin puede modificarlo
    modifier onlyAdmin() {
        require(admin == msg.sender, "El admin tiene que hacerlo");
        _;
    }

    modifier onlyNFToronlyOwner() {
        require(msg.sender == owner || NFT == msg.sender, "Debe ser el owner o el NFT");
        _;
    }


    

      //Función para modificar el Owner una unica vez
    function setOwner(address _newOwner) external onlyAdmin {
        require(owner == address(0), "La direccion del owner al principio debe ser 0");
        require(_newOwner != address(0), "La direccion del owner no puede ser 0");
        owner = _newOwner;



    }


          //Función para modificar el Owner una unica vez
    function setNFT(address _nft) external onlyAdmin {
        require(NFT == address(0), "La direccion de NFT al principio debe ser 0");
        require(_nft != address(0), "La direccion de NFT no puede ser 0");
        NFT = _nft;



    }
    

    // Función para pedir tokens por primera vez
    function claimTokens(address _sender, uint256 _dato) external {

    //    _mint(_sender, TOKENS_PER_USER * 10**18);

    _mint(_sender, _dato);
    }



  //Para quemar los tokens de una cuenta en concreto
    function burn(address to, uint256 amount) onlyNFToronlyOwner public {
             _burn(to, amount);

    }

  //Para minar los tokens de una cuenta en concreto
      function mint(address to, uint256 amount) onlyNFToronlyOwner public {
             _mint(to, amount);

    }

  //Para quemar los tokens de una cuenta en concreto
    function burnComapny(address to, uint256 amount)  public {
     require(amount <= 500, "Debe ser el inferior la cantidad");
        _burn(to, amount);

    }

  //Para minar los tokens de una cuenta en concreto
      function mintCompany(address to, uint256 amount)  public {
     require(amount <= 500, "Debe ser el inferior la cantidad");
        _mint(to, amount);

    }

function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20Votes) {
    super._afterTokenTransfer(from, to, amount);
  }
function _mint(address to, uint256 amount) internal override(ERC20Votes) {
    super._mint(to, amount);
    emit TokenMinted(to, amount);
  }
function _burn(address account, uint256 amount) internal override(ERC20Votes) {
    super._burn(account, amount);
    emit TokenBurned(account, amount);
  }
}