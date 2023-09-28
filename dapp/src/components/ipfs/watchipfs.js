import { drizzleReactHooks } from '@drizzle/react-plugin';
import Oneipfs from './oneipfs';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Watchipfs = ({ children, address }) => { // Agregamos "address" como prop
  const { useCacheCall } = useDrizzle();
  const drizzleState = useDrizzleState(state => state);

  // Utilizamos el prop "address" que se pasa como parámetro
  const nftsidResponse = useCacheCall("NFTContract", "getNFTsByOwner", address) || [];

  console.log("Valor de nftsidResponse", nftsidResponse);
  
  // Utiliza el método map para separar cada valor y llamar al componente Oneipfs
  const renderedRows = nftsidResponse.map((nftsidValue, index) => (
    <Oneipfs key={"ab-" + index} nftsid={nftsidValue} address={address}/>
  ));

  return (
    <tbody>
      <h3>NFT holdeados</h3>
      {renderedRows}
    </tbody>
  );
};

export default Watchipfs;
