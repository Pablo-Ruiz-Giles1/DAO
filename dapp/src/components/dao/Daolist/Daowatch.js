import { drizzleReactHooks } from '@drizzle/react-plugin';
import { Link } from 'react-router-dom';
import web3 from 'web3';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Daowatch = ({ DaoIndex }) => {
  const { useCacheCall } = useDrizzle();
  const drizzleState = useDrizzleState((state) => state);
  const { drizzle } = useDrizzle();
  const address = drizzleState.accounts[0];
  const balance = drizzleState.accountBalances[address];

  

  const oz_states = [
    'Pending',
    'Active',
    'Canceled',
    'Defeated',
    'Succeeded',
    'Queued',
    'Expired',
    'Executed',
  ];

  // Función para obtener el estado basado en el valor de propState
  const getPropState = (propState) => {
    return oz_states[propState] || 'Unknown'; // Devolvemos el estado correspondiente o 'Unknown' si no se encuentra
  };

  let { addr, datos, propState, proposalData } = useCacheCall(
    ['GovernorContract'],
    (call) => {
      const addr = call('GovernorContract', 'proposes', DaoIndex);
      const datos = addr && call('GovernorContract', 'datosPropose', addr);
      const propState = addr && datos && call('GovernorContract', 'state', datos.id);
      const proposalData= addr && datos && propState && call('GovernorContract', 'datosPropose', datos.id);
      return { addr, datos, propState, proposalData };
    }
  );
    
    
  // Renderizar el elemento apropiado basado en propState
  const renderActionElement = () => {
    if (propState == 1 || propState == 0) {
      // Estado "Active"
      return <Link to={`/dao/${DaoIndex}`}>Votar</Link>;
    } 
    
    else if (propState == 4) {
      // Estado "Succeeded"
      return <button onClick={ejecutarPropuesta}>Poner en cola</button>;
    }
    else if (propState == 5) {
      // Estado "Succeeded"
      return <button onClick={ejecutarPropuesta2}>Ejecutar</button>;
    }
     else {
      return (null);
    }
  };

// Función para ejecutar la propuesta (llamar a la función "ejecutarPropuesta" según tu contrato)
const ejecutarPropuesta = async () => {
  try {
    // Lógica para ejecutar la propuesta aquí, según el contrato
    const queueTx = drizzle.contracts.GovernorContract.methods.queue.cacheSend(
      [proposalData.targets],
      [0],
      [proposalData.calldatas],
      web3.utils.sha3(proposalData.description)
    );

    // Espera a que la primera transacción se complete antes de continuar con la segunda
    await queueTx;


  } catch (error) {
    console.log('Error al ejecutar la propuesta:', error);
  }
};




// Función para ejecutar la propuesta (llamar a la función "ejecutarPropuesta" según tu contrato)
const ejecutarPropuesta2 = async () => {
  try {

    const executeTx = drizzle.contracts.GovernorContract.methods.execute.cacheSend(
      [proposalData.targets],
      [0],
      [proposalData.calldatas],
      web3.utils.sha3(proposalData.description)
    );

    // Espera a que la segunda transacción se complete antes de continuar con el resto de la lógica
    await executeTx;
  } catch (error) {
    console.log('Error al ejecutar la propuesta:', error);
  }
};

  /*
  // Función para ejecutar la propuesta (llamar a la función "ejecutarPropuesta" según tu contrato)
  const ejecutarPropuesta = async () => {
    try {
      // Lógica para ejecutar la propuesta aquí, según el contrato
      const queueTx = drizzle.contracts.GovernorContract.methods.queue.cacheSend([proposalData.targets],[0],[proposalData.calldatas], web3.utils.sha3(proposalData.description));


      const executeTx = drizzle.contracts.GovernorContract.methods.execute.cacheSend([proposalData.targets],[0],[proposalData.calldatas], web3.utils.sha3(proposalData.description));


    } catch (error) {
      console.log('Error al ejecutar la propuesta:', error);
    }
  };

*/





  return (
    <tr key={'Dao-' + DaoIndex}>
      <th>A<sub>{DaoIndex}</sub></th>
      <td>{datos?.description}</td>
      <td>{getPropState(propState)}</td>
      <td>{renderActionElement()}</td>
    </tr>
  );
};

export default Daowatch;
