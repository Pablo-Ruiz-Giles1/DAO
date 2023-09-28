import { drizzleReactHooks } from '@drizzle/react-plugin';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const TokenCompanyswitch = ({ traductores, longitud }) => {
  const { useCacheCall } = useDrizzle();
  const { drizzle } = useDrizzle();
  const drizzleState = useDrizzleState(state => state);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedData2Option1, setSelectedData2Option1] = useState('');

  const [selectedData3Option1, setSelectedData3Option1] = useState('');

  const [inputNumber, setInputNumber] = useState('');
    // Utilizar el estado selectedOption para determinar si el botón debe estar activo
  




  const address = drizzleState.accounts[0];

  const handleChangeOption1 = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption('option1');
    setSelectedData2Option1(traductores[selectedIndex - 1]?.data2 || '');
    setSelectedData3Option1(traductores[selectedIndex - 1]?.data3 || '');
  };



  // Función que se ejecutará al hacer clic en el botón "Submit"
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('Formulario enviado para la opción 1');

    console.log("Tokens:",selectedData3Option1);

    //Hacernos con los NFT
    const stackId2 = drizzle.contracts.NFTContract.methods.NFTCompanydelete.cacheSend(selectedData2Option1);
    //Eliminar Compañia

    const stackId = drizzle.contracts.Traductores.methods.BurnCompany.cacheSend(selectedData3Option1, selectedData2Option1);


    
  };


  return (
    <div>
      <div>
        <p></p>
        <form>
          <label>
            Selecciona empresa
            <select value={selectedData2Option1} onChange={handleChangeOption1}>
              <option value="">Seleccionar</option>
              {Array.from({ length: longitud }, (_, i) => (
                <option key={i} value={traductores[i]?.data2}>
                  {traductores[i]?.data1} {/* Aquí se muestra el nombre del traductor */}
                </option>
              ))}
            </select>
          </label>
          <button onClick={handleSubmit} >
            Eliminar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenCompanyswitch;
