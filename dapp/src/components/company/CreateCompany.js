import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle } = drizzleReactHooks;



const CreateCompany = () => {
    const { drizzle } = useDrizzle();
    const [setLastStackID] = useState(undefined)
    // Conservar los valores metidos en el formulario
    
     

    let [nombre, setNombre] = useState("");
    
    let [direccion, setDireccion] = useState("");

    return (<article className="AppMisDatos">

        <h3>Añadir Compañía</h3>
        <form>
            <p> Nombre de la empresa: &nbsp;
                <input key="nombre" type="text" name="nombre" value={nombre} placeholder="Nombre"
                    onChange={ev => setNombre(ev.target.value)} /> </p>
            <p> Dirección de la empresa: &nbsp;
                <input key="direccion" type="address" name="direccion" value={direccion} placeholder="0x0000"
                    onChange={ev => setDireccion(ev.target.value)} /> </p>

            <button key="submit" className="pure-button" type="button"
                onClick={ev => {
                    ev.preventDefault();
                    const stackId = drizzle.contracts.Traductores.methods.createCompany.cacheSend(nombre, direccion);
                  //  setLastStackID(stackId);
                }}>Añadir Empresa</button>
        </form>

    </article>);

};
export default CreateCompany;