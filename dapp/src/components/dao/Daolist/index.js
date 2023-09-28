import Daohead from "./Daohead";
import Daobody from "./Daobody";

const Daolist = () => (
    <section className="Appdao">
        <h3>Todos las propuestas</h3>
        <table>
            <Daohead />
            <Daobody />
        </table>
    </section>
);
export default Daolist;