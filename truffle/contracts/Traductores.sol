// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./GovernanceToken.sol";
contract Traductores {
    uint public valorTraductores;
    address public owner; //Gestor.sol es decir el contrato a Gobernar
   



 ///////////////// Admin //////////////////////////////

 address public admin; //Cuenta de admin, se usa para posteriormente añadir Compañias

    /// Datos.
    struct DatosAdmin {
        string name;
    }

    /// Acceder a los datos del ADMIN dado su address
    mapping (address => DatosAdmin) public datosAdmin;

 ////////////////////////////////////////////////////// 


//////////////////  TRADUCTORES  //////////////////////
    // Number of holders(traductores)
    address[] public s_traductores;

    /// Datos de una propuesta.
    struct DatosHolders {
        string name;
    }
      // Mappings para saber si ya se han registrado
    mapping(address => bool) public s_claimedTokens;

    /// Acceder a los datos de los holders dado su address
    mapping (address => DatosHolders) public datosHolders;


     uint256 constant TOKENS_PER_USER = 100;
    /////////////////////////////////////////


    //////////////////////// COMPANIAS /////////////////////////

    // Number of holders(companias)
    address[] public companies;

    /// Datos de una propuesta.
    struct DatosCompanies {
        string name;

    }
      // Mappings para saber si ya se han registrado
    mapping(address => bool) public companies_claimedTokens;

    /// Acceder a los datos de los companies dado su address
    mapping (address => DatosCompanies) public datosCompanies;

    uint256 constant TOKENS_PER_COMPANY = 1 * 10**18;

   

/////////////////////////////////////////
    //Para enalzarlo con GovernanceTokenContract
    address public GovernanceTokenContract;

    event ValorTraductoresModificado(uint nuevoValorTraductores);

    modifier onlyOwner() {
        require(owner == msg.sender, "El owner tiene que hacerlo");
        _;
    }

    modifier onlyAdmin() {
        require(admin == msg.sender, "El admin tiene que hacerlo");
        _;
    }

    //Constructor que inicializa owner y admin y posterirmente agrega la dirección del admin y mina tokens
    constructor(address _GovernanceTokenContract, string memory _name) {
        owner = address(0);
        admin = msg.sender;
        GovernanceTokenContract = _GovernanceTokenContract;
        
        DatosAdmin memory datos = DatosAdmin(_name);
        datosAdmin[msg.sender] = datos;
        
        GovernanceToken(GovernanceTokenContract).claimTokens(msg.sender,TOKENS_PER_USER);
        

    }
    //Función para indicar el nuevo owner una única vez
    function setOwner(address _newOwner) external onlyAdmin {
        require(owner == address(0), "La direccion del owner al principio debe ser 0");
        require(_newOwner != address(0), "La direccion del owner no puede ser 0");
        owner = _newOwner;



    }

    //////////////////////////////////////////////////////////////////////////////


        //Función para crear las companies, solo lo puede crear el ADMIN
    function createCompany(string memory _name, address _direccion) onlyAdmin public{
         require(!companies_claimedTokens[_direccion], "Already claimed tokens");
   //     s_traductores.push(msg.sender);
        DatosCompanies memory datos = DatosCompanies(_name);
        datosCompanies[_direccion] = datos;
        companies_claimedTokens[_direccion] = true;
        GovernanceToken(GovernanceTokenContract).claimTokens(_direccion, TOKENS_PER_COMPANY);
        companies.push(_direccion);

    }

        //Función para ver el numero de compañias que hay
        function getCompanyLength() external view returns (uint256) {
        return companies.length;
    }

        //Función para Eliminar una Compañia
        function BurnCompany(uint _nuevoValorCompany, address _companyaddress) external onlyAdmin {
        require(companies_claimedTokens[_companyaddress], "Company doesnt exist");

        GovernanceToken(GovernanceTokenContract).burn(_companyaddress, _nuevoValorCompany);

        delete datosCompanies[_companyaddress];
        companies_claimedTokens[_companyaddress] = false;

        // Eliminar la compañía del array de companies
        for (uint i = 0; i < companies.length; i++) {
            if (companies[i] == _companyaddress) {
                companies[i] = companies[companies.length - 1];
                companies.pop();
                break;
            }
        }
        
   }


   function TransferCompany(uint256 _amount, address recipient) public {
   
    // Verificar que el comprador tiene suficientes tokens de gobierno para comprar el NFT
    require(GovernanceToken(GovernanceTokenContract).balanceOf(msg.sender) >= _amount, "Insufficient balance");

    // Transfiere los tokens de gobierno de una compañia a otra
    GovernanceToken(GovernanceTokenContract).burn(msg.sender, _amount);
    GovernanceToken(GovernanceTokenContract).mint(recipient, _amount);

  
}


    ///////////////////////////////////////////////////////////////////////////////


    //Función para crear los traductores
    function createTraductor(string memory _name) public{
         require(!s_claimedTokens[msg.sender], "Already claimed tokens");
   //     s_traductores.push(msg.sender);
        DatosHolders memory datos = DatosHolders(_name);
        datosHolders[msg.sender] = datos;
        s_claimedTokens[msg.sender] = true;
        GovernanceToken(GovernanceTokenContract).claimTokens(msg.sender, TOKENS_PER_USER);
        s_traductores.push(msg.sender);

    }

        //Función para ver el numero de traductores que hay
        function getTraductorLength() external view returns (uint256) {
        return s_traductores.length;
    }


        //Función para minar los tokens 
    function modificarValorTraductores(uint _nuevoValorTraductores) external onlyOwner {
        valorTraductores = _nuevoValorTraductores;

        for(uint i=0; i< s_traductores.length; i++)
        {
        GovernanceToken(GovernanceTokenContract).mint(s_traductores[i], _nuevoValorTraductores);
        emit ValorTraductoresModificado(valorTraductores);
        }
        
       


    }

        //Función para quemar los tokens 
        function BurnTraductores(uint _nuevoValorTraductores) external onlyOwner {
        valorTraductores = _nuevoValorTraductores;

        for(uint i=0; i< s_traductores.length; i++)
        {
        GovernanceToken(GovernanceTokenContract).burn(s_traductores[i], _nuevoValorTraductores);
        emit ValorTraductoresModificado(valorTraductores);
        }
        
       


    }

        //Función para quemar los tokens de 1 address en concreto
        function BurnONETraductores(uint _nuevoValorTraductores, address _traductoraddress) external onlyOwner {
        valorTraductores = _nuevoValorTraductores;

      
        GovernanceToken(GovernanceTokenContract).burn(_traductoraddress, _nuevoValorTraductores);
        //emit ValorTraductoresModificado(valorTraductores);
        
        
       


    }
        //Función para minar los tokens de 1 address en concreto
           function MintONETraductores(uint _nuevoValorTraductores, address _traductoraddress) external onlyOwner {
        valorTraductores = _nuevoValorTraductores;

      
        GovernanceToken(GovernanceTokenContract).mint(_traductoraddress, _nuevoValorTraductores);
        //emit ValorTraductoresModificado(valorTraductores);
        }
        
       


    


    /*
      uint256 cantidad = datosHolders[msg.sender].amount;
      DatosHolders memory datos = DatosHolders(cantidad + amount);
      datosHolders[msg.sender] = datos;

      if(s_claimedTokens[msg.sender] != true)
      {
      s_claimedTokens[msg.sender] = true;
      s_traductores.push(msg.sender);  
    }

    */
}
