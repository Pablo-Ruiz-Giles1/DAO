import SoyAdmin from "../roles/SoyAdmin"
import SoyCompany from "../roles/SoyCompany"

import SoyTraductor from "../roles/SoyTraductor"
import Daolist from "./Daolist"

import Daopropose from "./Daolist/propose/Daopropose";

const Daopage = () => (
    <section className="AppDAO">
        <h2>Propuestas</h2>
    <Daopropose></Daopropose>
        <SoyAdmin>
            <Daolist />
           
        </SoyAdmin>

        <SoyCompany>
            <Daolist />
        </SoyCompany>

        <SoyTraductor>
            <Daolist />
        </SoyTraductor>


    </section>
);
export default Daopage;