import SoyAdmin from "../roles/SoyAdmin"
import SoyCompany from "../roles/SoyCompany"
import SoyTraductor from "../roles/SoyTraductor"

import TraductorList from "./TraductorList"

import SoyNadie from "../roles/SoyNadie"

import CreateTraductor from "./CreateTraductor"

const TraductorPage = () => (
    <section className="AppCTraductor">
        <h2>Traductores</h2>

        <SoyAdmin>
            <TraductorList />
            
        </SoyAdmin>

        <SoyCompany>
            <TraductorList />
        </SoyCompany>

        <SoyTraductor>
            <TraductorList />
        </SoyTraductor>

        <SoyNadie>
            <CreateTraductor></CreateTraductor>
        </SoyNadie>
    </section>
);
export default TraductorPage;