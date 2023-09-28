import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useParams, Link } from 'react-router-dom';





import TokenCompanyRow from './TokenCompanyRow';
import TokenCompanyswitch from './TokenCompanyswitch';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const TokenCompanybody = ({ children }) => {
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

  const getCompanyLength = useCacheCall("Traductores", "getCompanyLength") || 0;
  for (let i = 0; i < getCompanyLength; i++) {
    rows.push(<TokenCompanyRow key={'ab-' + i} TraductorIndex={i} onDataChange={handleDataChange} />);
  }

  return (
    <>
      {rows}
      <TokenCompanyswitch traductores={sharedData} longitud={getCompanyLength}></TokenCompanyswitch>

    </>
  );
};

export default TokenCompanybody;
