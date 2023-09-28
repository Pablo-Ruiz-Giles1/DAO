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
  const [inputNumber, setInputNumber] = useState('');

  const [isFormFilled, setIsFormFilled] = useState(false);
  const address = drizzleState.accounts[0];

  const handleChangeOption1 = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption('option1');
    setSelectedData2Option1(traductores[selectedIndex - 1]?.data2 || '');
  };

  // Check if the form is filled whenever any of the input values change
  useEffect(() => {
    const isInputNumberValid = Number(inputNumber) > 0; // Validar que el número ingresado sea positivo

    // Utilizar operador ternario para asignar isDropdownFilled en función de la comparación
    const isDropdownFilled = address === selectedData2Option1 ? selectedOption !== '' : false;

    setIsFormFilled(isDropdownFilled && isInputNumberValid);
  }, [selectedOption, inputNumber, address, selectedData2Option1]);

  // Función que se ejecutará al hacer clic en el botón "Submit"
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('Formulario enviado para la opción 1');
    console.log('Número ingresado:', inputNumber); // Mostrar el valor del número ingresado

    //TransferCompany
    const stackId = drizzle.contracts.Traductores.methods.TransferCompany.cacheSend(inputNumber, selectedData2Option1);
  };

  const handleInputChange = (event) => {
    // Validar que el valor ingresado sea un número positivo
    const value = event.target.value;
    if (Number(value) >= 0 || value === '') {
      setInputNumber(value);
    }
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
          <br />
          <label>
          Cantidad de tokens:
            <input type="number" value={inputNumber} onChange={handleInputChange} />
          </label>
          <br />
          <button onClick={handleSubmit} disabled={!isFormFilled}>
            Dar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenCompanyswitch;
