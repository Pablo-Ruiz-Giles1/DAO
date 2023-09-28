import {drizzleReactHooks} from '@drizzle/react-plugin'
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
const {useDrizzle} = drizzleReactHooks;

const ADMINCompanyRow = ({TraductorIndex, onDataChange}) => {
 const {useCacheCall} = useDrizzle();
 let {addr, datos} = useCacheCall(['Traductores'],
 call => {
 const addr = call("Traductores", "companies", TraductorIndex);
 const datos = addr && call("Traductores", "datosCompanies", addr);
  return {addr, datos};
 }
 
 );

 let tokens = useCacheCall("GovernanceToken", "balanceOf", addr) || 0;


 useEffect(() => {
  if (datos && addr) {
    onDataChange(TraductorIndex, datos, addr, tokens);
  }
}, [TraductorIndex, datos, addr, tokens]);





};
export default ADMINCompanyRow;