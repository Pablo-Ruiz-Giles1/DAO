import { drizzleReactHooks } from '@drizzle/react-plugin';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




const { useDrizzle, useDrizzleState } = drizzleReactHooks;




const Daopropose2 = ({ traductores, longitud }) => {
  const { useCacheCall } = useDrizzle();




  const { drizzle } = useDrizzle();

  const drizzleState = useDrizzleState(state => state);



  const [selectedOption, setSelectedOption] = useState('');
  const [selectedData2Option1, setSelectedData2Option1] = useState('');
  const [selectedData2Option2, setSelectedData2Option2] = useState('');
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleChangeOption1 = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption('option1');
    setSelectedData2Option1(traductores[selectedIndex - 1]?.data2 || '');
  };

  const handleChangeOption2 = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption('option2');
    setSelectedData2Option2(traductores[selectedIndex - 1]?.data2 || '');
  };

  // Check if the form is filled whenever any of the input values change
  useEffect(() => {
    const isDropdownFilled = selectedOption !== '';
    const isTextInput1Filled = textInput1.trim() !== '';
    const isTextInput2Filled = textInput2.trim() !== '';

    setIsFormFilled(isDropdownFilled && isTextInput1Filled && isTextInput2Filled);
  }, [selectedOption, textInput1, textInput2]);




// Función que se ejecutará al hacer clic en el botón "Submit"
const handleSubmit = (ev) => {
    ev.preventDefault();
    if (selectedOption === 'option1') {
      // Lógica para la opción 
      
      console.log('Formulario enviado para la opción 1');
     
        const stackIdencoded = drizzle.contracts.Gestor.methods.modificarUNValor(textInput1, selectedData2Option1, 0).encodeABI();
        const gestoraddress = drizzle.contracts.Gestor.address;
   let  description = "Dar tokens a " + selectedData2Option2 + " " + textInput2;


        const proposeTx = drizzle.contracts.GovernorContract.methods.propose.cacheSend(
          [gestoraddress],
          [0],
          [stackIdencoded],
          description
          );
    

      
    } else if (selectedOption === 'option2') {
      // Lógica para la opción 2
      console.log('Formulario enviado para la opción 2');

      const stackIdencoded = drizzle.contracts.Gestor.methods.modificarUNValor(textInput1, selectedData2Option2, 1).encodeABI();
      const gestoraddress = drizzle.contracts.Gestor.address;
      let  description = "Quitar tokens a " + selectedData2Option2 + " " + textInput2;

      const proposeTx = drizzle.contracts.GovernorContract.methods.propose.cacheSend(
        [gestoraddress],
        [0],
        [stackIdencoded],
        description
        );
  

      // Aquí puedes realizar las acciones específicas para la opción 2
    } else if (selectedOption === 'option3') {
      // Lógica para la opción 3
      console.log('Formulario enviado para la opción 3');


      const stackIdencoded = drizzle.contracts.Gestor.methods.modificarValor(textInput1, 0).encodeABI();
      const gestoraddress = drizzle.contracts.Gestor.address;
        let  description = "Dar tokens a todos " + textInput2;

      const proposeTx = drizzle.contracts.GovernorContract.methods.propose.cacheSend(
        [gestoraddress],
        [0],
        [stackIdencoded],
        description
        );

    } else if (selectedOption === 'option4') {
      // Lógica para la opción 4
      console.log('Formulario enviado para la opción 4');
      const stackIdencoded = drizzle.contracts.Gestor.methods.modificarValor(textInput1, 1).encodeABI();
      const gestoraddress = drizzle.contracts.Gestor.address;

    let  description = "Quitar tokens a todos " + textInput2;

      const proposeTx = drizzle.contracts.GovernorContract.methods.propose.cacheSend(
        [gestoraddress],
        [0],
        [stackIdencoded],
        description
        );

    }
  };



  return (
    <div>
      <form>
        <label>
          Selecciona una opción:
          <select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
            <option value="">Seleccionar</option>
            <option value="option1">Dar tokens a traductor</option>
            <option value="option2">Quitar tokens a traductor</option>
            <option value="option3">Dar tokens a TODOS</option>
            <option value="option4">Quitar tokens a TODOS</option>
          </select>
        </label>
      </form>

      {selectedOption === 'option1' && (
  <div>
    <p></p>
    <form>
      <label>
        Selecciona un traductor:
        <select value={selectedData2Option1} onChange={handleChangeOption1}>
          <option value="">Seleccionar</option>
          {Array.from({ length: longitud }, (_, i) => (
            <option key={i} value={traductores[i]?.data2}> {/* Aquí se usa traductores[i]?.data2 */}
              {traductores[i]?.data1} {/* Aquí se muestra el nombre del traductor */}
            </option>
          ))}
        </select>
      </label>
    </form>
  </div>
)}
{selectedOption === 'option2' && (
  <div>
    <p></p>
    <form>
      <label>
        Selecciona un traductor:
        <select value={selectedData2Option2} onChange={handleChangeOption2}>
          <option value="">Seleccionar</option>
          {Array.from({ length: longitud }, (_, i) => (
            <option key={i} value={traductores[i]?.data2}> {/* Aquí se usa traductores[i]?.data2 */}
              {traductores[i]?.data1} {/* Aquí se muestra el nombre del traductor */}
            </option>
          ))}
        </select>
      </label>
    </form>
  </div>
)}

      <div>
    
      <p>Cantidad:</p>
<input
  type="number" // Cambiar el tipo de entrada a "number"
  min="0" // Establecer el valor mínimo a 0 para permitir solo números positivos
  value={textInput1}
  onChange={(e) => {
    const inputText = e.target.value;
    // Validar que solo se ingresen números positivos
    const sanitizedText = inputText.replace(/[^0-9]/g, ''); // Eliminar todos los caracteres no numéricos
    setTextInput1(sanitizedText);
  }}
/>

        <p>Descripción:</p>
        <input
          type="text"
          value={textInput2}
          onChange={(e) => setTextInput2(e.target.value)}
        />
      </div>

      {selectedOption === 'option1' && <p>cuenta: {selectedData2Option1}</p>}
      {selectedOption === 'option2' && <p>cuenta: {selectedData2Option2}</p>}

     <button disabled={!isFormFilled} onClick={handleSubmit}>Crear
      </button>
    </div>
  );
};

export default Daopropose2;
