import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useParams, Link } from 'react-router-dom';


import Daopropose2 from './Daopropose2';
import DaoTraductorRow from './DaoTraductorRow';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Daopropose = ({ children }) => {
  const { useCacheCall, useCacheSend } = useDrizzle();
  const drizzleState = useDrizzleState((state) => state);

  const addr = drizzleState.accounts[0];
  const balance = drizzleState.accountBalances[addr];

  const [sharedData, setSharedData] = useState({});

  const handleDataChange = (traductorIndex, newData1, newData2) => {
    setSharedData((prevData) => ({
      ...prevData,
      [traductorIndex]: { data1: newData1, data2: newData2 },
    }));
  };

  let rows = [];

  const getTraductorLength = useCacheCall('Traductores', 'getTraductorLength') || 0;



  for (let i = 0; i < getTraductorLength; i++) {
    rows.push(<DaoTraductorRow key={'ab-' + i} TraductorIndex={i} onDataChange={handleDataChange} />);
  }

  return (
    <>
      {rows}
      <Daopropose2 traductores={sharedData} longitud={getTraductorLength}></Daopropose2>

    </>
  );
};

export default Daopropose;
