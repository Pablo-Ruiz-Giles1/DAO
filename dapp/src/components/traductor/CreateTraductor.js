import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'



const { useDrizzle, useDrizzleState } = drizzleReactHooks;




const CreateTraductor = () => {
    const { drizzle } = useDrizzle();
    const drizzleState = useDrizzleState((state) => state);
 
    const address = drizzleState.accounts[0];
    const [setLastStackID] = useState(undefined)
    // Conservar los valores metidos en el formulario
    
     

    let [nombre, setNombre] = useState("");
    
    let [direccion, setDireccion] = useState("");



    return (<article className="AppMisDatos">

        <h3>Registrarse</h3>
        <form>
            <p> Nombre del traductor: &nbsp;
                <input key="nombre" type="text" name="nombre" value={nombre} placeholder="Nombre"
                    onChange={ev => setNombre(ev.target.value)} /> </p>

            <button key="submit" className="pure-button" type="button"
                onClick={ev => {
                    ev.preventDefault();
                    const stackId = drizzle.contracts.Traductores.methods.createTraductor.cacheSend(nombre);
                  //  setLastStackID(stackId);
                }}>Registrar</button>
        </form>

    </article>);

};
export default CreateTraductor;