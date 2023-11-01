import React from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const IPFS_BASE_URL = "https://ipfs.io/ipfs/";

const Oneipfs = ({ nftsid , address}) => {
  const { useCacheCall } = useDrizzle();
  const { drizzle } = useDrizzle();
  const drizzleState = useDrizzleState(state => state);
  const addr = drizzleState.accounts[0];
  let data = useCacheCall("NFTContract", "_nftMetadata", nftsid);
  console.log("data", data);



  console.log("ID NFT", nftsid);
  console.log("Address:", address);

  const renderContent = () => {
    if (!data) {
      return <p>Loading...</p>;
    }

    switch (data.format) {
      case "0":
        return (
          <>
            <img
              src={IPFS_BASE_URL + data.cid}
              alt="Imagen IPFS"
              style={{ width: "200px", height: "200px" }}
            />
            <table>
              <tbody>
                <tr>
                  <th>A<sub>{nftsid}</sub></th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Descripción</th>
                  <td>{data.description}</td>
                </tr>
                <tr>
                  <th>Creator</th>
                  <td>{data.creator}</td>
                </tr>
                <tr>
                  <th>Precio</th>
                  <td>{data.price}</td>
                </tr>
              </tbody>
            </table>
            
         
          </>
        );
        
      case "1":
        return (
          <>
            <video
              controls
              src={IPFS_BASE_URL + data.cid}
              style={{ width: "200px", height: "200px" }}
            />
            <table>
              <tbody>
                <tr>
                  <th>A<sub>{nftsid}</sub></th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Descripción</th>
                  <td>{data.description}</td>
                </tr>
                <tr>
                  <th>Creator</th>
                  <td>{data.creator}</td>
                </tr>
                <tr>
                  <th>Precio</th>
                  <td>{data.price}</td>
                </tr>
              
                <tr>
                </tr>
                
              </tbody>
            </table>
          </>
        );
      case "2":
        return (
          <>
            <audio
              controls
              src={IPFS_BASE_URL + data.cid}
            />
            <table>
              <tbody>
                <tr>
                  <th>A<sub>{nftsid}</sub></th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Descripción</th>
                  <td>{data.description}</td>
                </tr>
                <tr>
                  <th>Creator</th>
                  <td>{data.creator}</td>
                </tr>
                <tr>
                  <th>Precio</th>
                  <td>{data.price}</td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
            
          </>
        );
      default:
        return <p>Formato desconocido</p>;
    }
  };

  return (
    <>

   
{renderContent()}
      {/* Mostrar el botón en una nueva fila de la tabla si se cumple la condición */}
      {addr !== address && (
        <>
        <table>
          <tbody>
            <tr>
              <th>Comprar</th>
              <td>
                <button
                  key="submit"
                  className="pure-button"
                  type="button"
                  onClick={(ev) => {
                    ev.preventDefault();
  
                    const stackId = drizzle.contracts.NFTContract.methods.exchangeNFTOther.cacheSend(
                      Number(nftsid),
                      addr
                    );
                    //   setLastStackID(stackId);
                  }}
                >
                  Comprar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
         <div style={{ marginBottom: "20px" }}></div>
        </>
      )
      }
         
    </>
  );
};

export default Oneipfs;
