
import TraductorHead from "./TraductorHead"
import TraductorBody from "./TraductorBody"

const CompanyList = () => (
    <section className="AppACompany">
        <h3>Todos los Traductores</h3>
        <table>
            <TraductorHead/>
            <TraductorBody/>
                    </table>
    </section>
);
export default CompanyList;