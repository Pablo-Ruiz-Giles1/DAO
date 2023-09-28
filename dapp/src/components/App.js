import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../css/App.css';
import Loading from './Loading';

import Layout from './Layout';
import HomePage from './home/HomePage';

//import CustomersPage from "./customers/CustomersPage";
//import InterpretesPage from "./interpretes/InterpretesPage";
//import InterpreteDetail from "./interpretes/InterpreteDetail";
//import ProposesPage from "./proposes/ProposesPage";
//import MisCosasPage from "./misCosas/MisCosasPage";

import NoMatch from './NoMatch';

import Cuenta from './Cuenta';

import SoyAdmin from "./roles/SoyAdmin";
import SoyTraductor from "./roles/SoyTraductor";
import SoyCompany from "./roles/SoyCompany";

import SoyAlguien from "./roles/SoyAlguien";

//import IPFS from 'ipfs-core' 



import CompanyPage from "./company/CompanyPage";
import TraductorPage from "./traductor/TraductorPage";

import CompanyDetail from "./company/CompanyDetail";
import TraductorDetail from "./traductor/TraductorDetail";

import Ipfsreact from "./ipfs/Ipfsreact";
import Daopage from "./dao/Daopage";


import Daovotar from "./dao/Daolist/Daovotar";

function App() {
    return (
        <div className="App">

            <Loading>
            
                       
            <BrowserRouter>
                    <Routes>
                    
                        <Route path="/" element={<Layout/>}>
                        <Route index element={<SoyAlguien><HomePage/></SoyAlguien>}/>
                        
                        <Route path="company" element={<SoyAlguien><CompanyPage /> </SoyAlguien>} />
                         <Route path="Company/:addr" element={<CompanyDetail />} />
                         <Route path="videos" element={<SoyAlguien><Ipfsreact /></SoyAlguien>} />
                         <Route path="traductores" element={<TraductorPage />} />
                         <Route path="miscosas" element={<SoyAlguien><Cuenta /></SoyAlguien>} />
                         <Route path="propuestas" element={<SoyAlguien><Daopage /></SoyAlguien>} />
                         <Route path="dao/:index" element={<SoyAlguien><Daovotar /></SoyAlguien>} />
                         <Route path="Traductor/:addr" element={<TraductorDetail />} />
                        <Route path="*" element={<NoMatch/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Loading>
        </div>
    );
}

export default App;
