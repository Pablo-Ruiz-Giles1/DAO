import SoyAdmin from "../roles/SoyAdmin"
import SoyCompany from "../roles/SoyCompany"

import CompanyList from "./CompanyList"

import CreateCompany from "./CreateCompany";

import ADMINCompanybody from "./Companydelete/ADMINCompanybody";

const CompanyPage = () => (
    <section className="AppCompanys">
        <h2>Compañias</h2>

        <SoyAdmin>
            <CompanyList />
            <CreateCompany></CreateCompany>
            <ADMINCompanybody></ADMINCompanybody>
        </SoyAdmin>

        <SoyCompany>
            <CompanyList />
        </SoyCompany>



    </section>
);
export default CompanyPage;