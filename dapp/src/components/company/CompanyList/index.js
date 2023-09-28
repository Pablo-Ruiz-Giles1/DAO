
import CompanyHead from "./CompanyHead"
import CompanyBody from "./CompanyBody"

const CompanyList = () => (
    <section className="AppACompany">
        <h3>Todos las Compañias</h3>
        <table>
            <CompanyHead/>
            <CompanyBody/>
                    </table>
    </section>
);
export default CompanyList;