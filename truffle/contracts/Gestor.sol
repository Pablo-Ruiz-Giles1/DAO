// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Traductores.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity ^0.8.0;

contract Gestor is Ownable {
    uint public valor;
    address public traductoresContract;

    event ValorModificado(uint nuevoValor);

    //Constructor que alamcena la dirección del contrato Traductores
    constructor(address _traductoresContract) {
        traductoresContract = _traductoresContract;
    }

      //Función para minar o quemar los tokens de TODOS dependiendo de si _valor vale 0 o no
    function modificarValor(uint256 _nuevoValor, uint8 _valor) public  {
        valor = _nuevoValor;
        if(_valor == 0)
        {
        emit ValorModificado(valor);

        Traductores(traductoresContract).modificarValorTraductores(valor);
        }
        else {

        emit ValorModificado(valor);

        Traductores(traductoresContract).BurnTraductores(valor);
        }
    }
      //Función para minar o quemar los tokens de 1 address en concreto dependiendo de si _valor vale 0 o no
    function modificarUNValor(uint256 _nuevoValor,address _traductor ,uint8 _valor) public {
        valor = _nuevoValor;
        if(_valor == 0)
        {
        emit ValorModificado(valor);

        Traductores(traductoresContract).MintONETraductores(valor, _traductor);
        }
        else {

        emit ValorModificado(valor);

        Traductores(traductoresContract).BurnONETraductores(valor, _traductor);
        }
    }


}


