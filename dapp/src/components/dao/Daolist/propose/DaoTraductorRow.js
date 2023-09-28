import {drizzleReactHooks} from '@drizzle/react-plugin'
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
const {useDrizzle} = drizzleReactHooks;

const DaoTraductorRow = ({TraductorIndex, onDataChange}) => {
 const {useCacheCall} = useDrizzle();
 let {addr, datos} = useCacheCall(['Traductores'],
 call => {
 const addr = call("Traductores", "s_traductores", TraductorIndex);
 const datos = addr && call("Traductores", "datosHolders", addr);
 return {addr, datos};
 }
 
 );


 useEffect(() => {
  if (datos && addr) {
    onDataChange(TraductorIndex, datos, addr);
  }
}, [TraductorIndex, datos, addr]);





};
export default DaoTraductorRow;