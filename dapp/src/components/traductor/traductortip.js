import React, { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useParams, Link } from "react-router-dom";


const { useDrizzle, useDrizzleState } = drizzleReactHooks;


const Traductortip = () => {
    const { useCacheCall } = useDrizzle();
    const { drizzle } = useDrizzle();
    let { addr } = useParams();
    const datos = useCacheCall("Traductores", "datosHolders", addr);
    const tokens = useCacheCall("GovernanceToken", "balanceOf", addr);
    const drizzleState = useDrizzleState(state => state);
    const address = drizzleState.accounts[0];
    // State para el número ingresado en la casilla
    const [inputNumber, setInputNumber] = useState("");

    // Función para manejar el cambio en la casilla de entrada
    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setInputNumber(value);
    };

    // Función para desbloquear el botón
    const isButtonEnabled = inputNumber >= 1 && inputNumber <= 50;

    return (
        <>
           

            {/* Casilla de entrada */}
            <label>
                Valoración
                <input type="number" value={inputNumber} onChange={handleInputChange} min={1} max={10} />
            </label>

            {/* Botón desbloqueado si se ingresa un número válido */}
            {isButtonEnabled && (
                <button
                                    onClick={ev => {
                                        ev.preventDefault();
                                        const stackId = drizzle.contracts.GovernanceToken.methods.mintCompany.cacheSend(addr, inputNumber);
                                    }}
                >
                    Recompensa
                </button>
            )}

           

            
        </>
    );
};

export default Traductortip;
