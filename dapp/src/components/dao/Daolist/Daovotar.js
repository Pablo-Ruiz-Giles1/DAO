import React, { useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useParams, Link } from 'react-router-dom';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Daovotar = ({ children }) => {
  const { useCacheCall, useCacheSend } = useDrizzle(); // Agregamos useCacheSend para poder enviar transacciones
  const drizzleState = useDrizzleState((state) => state);


  const { drizzle } = useDrizzle();

 


  let { index } = useParams();

  // Creamos un estado local para almacenar la selección del usuario (1 o 0) y el valor del cuadro de texto
  const [voto, setVoto] = useState(null);
  const [cuadroTexto, setCuadroTexto] = useState('');

  let { addr, datos, proposalData } = useCacheCall(
    ['GovernorContract'],
    (call) => {
      const addr = call('GovernorContract', 'proposes', index);
      const datos = addr && call('GovernorContract', 'datosPropose', addr);
      const proposalData = addr && datos && call('GovernorContract', 'datosPropose', datos.id);
      return { addr, datos, proposalData };
    }
  );

  // Función para manejar el envío del voto
  const handleVotoSubmit = (event) => {
    event.preventDefault();

    // Verificamos que se haya seleccionado una opción y se haya rellenado el cuadro de texto
    if (voto !== null && cuadroTexto.trim() !== '') {
      console.log("Voto:", voto);
      console.log("Texto del cuadro:", cuadroTexto);

      const proposeTx = drizzle.contracts.GovernorContract.methods.castVoteWithReason.cacheSend(datos.id,voto,cuadroTexto);


      // Reiniciamos los estados para la próxima votación
      setVoto(null);
      setCuadroTexto("");
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '20px' }}>Votar Propuesta</h3>
        <h5>Descripción:     <br></br></h5>
        <p></p>
        <p>   {proposalData?.description}</p>
      </div>
      <form onSubmit={handleVotoSubmit}>
        <label>
          <input
            type="radio"
            value={1}
            checked={voto === 1}
            onChange={(e) => setVoto(parseInt(e.target.value))}
          />
          A favor
        </label>

        <label>
          <input
            type="radio"
            value={0}
            checked={voto === 0}
            onChange={(e) => setVoto(parseInt(e.target.value))}
          />
          En contra
        </label>

        {/* Agregamos un cuadro de texto */}
        <input
          type="text"
          value={cuadroTexto}
          onChange={(e) => setCuadroTexto(e.target.value)}
          placeholder="Escribe tu voto aquí"
        />

        {/* Deshabilitamos el botón hasta que se haya seleccionado una opción y se haya rellenado el cuadro de texto */}
        <button type="submit" disabled={voto === null || cuadroTexto.trim() === ''}>
          Enviar Voto
        </button>
      </form>
      <Link to="/propuestas">Volver</Link>
    </>
  );
};

export default Daovotar;
