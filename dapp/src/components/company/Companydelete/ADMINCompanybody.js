import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useParams, Link } from 'react-router-dom';





import ADMINCompanyRow from './ADMINCompanyRow';
import ADMINCompanydelete from './ADMINCompanydelete';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const ADMINCompanybody = ({ children }) => {
  const { useCacheCall, useCacheSend } = useDrizzle();
  const drizzleState = useDrizzleState((state) => state);

  const addr = drizzleState.accounts[0];
  const balance = drizzleState.accountBalances[addr];

  const [sharedData, setSharedData] = useState({});

  const handleDataChange = (traductorIndex, newData1, newData2, newData3) => {
    setSharedData((prevData) => ({
      ...prevData,
      [traductorIndex]: { data1: newData1, data2: newData2, data3: newData3  },
    }));
  };

  let rows = [];

  const getCompanyLength = useCacheCall("Traductores", "getCompanyLength") || 0;
  for (let i = 0; i < getCompanyLength; i++) {
    rows.push(<ADMINCompanyRow key={'ab-' + i} TraductorIndex={i} onDataChange={handleDataChange} />);
  }

  return (
    <>
    <h3>Eliminar Compañía</h3>
      {rows}
      <ADMINCompanydelete traductores={sharedData} longitud={getCompanyLength}></ADMINCompanydelete>

    </>
  );
};

export default ADMINCompanybody;
