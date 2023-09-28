import { create } from 'ipfs-http-client';
import React, { useState } from "react";
import { useEffect } from 'react';

import Dropzone from "react-dropzone";
import axios from "axios";





import { drizzleReactHooks } from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const ipfs = create({ host: "localhost", port: 5001, protocol: "http" });

const Ipfsreact = () => {
  const { useCacheCall } = useDrizzle();
  const { drizzle } = useDrizzle();
  const [setLastStackID] = useState(undefined)
  
  const drizzleState = useDrizzleState(state => state);

  const address = drizzleState.accounts[0];

  const [hash, setHash] = useState("");
  const [isHashAvailable, setIsHashAvailable] = useState(0);
  const [fileBuffer, setFileBuffer] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  let [direccion, setDireccion] = useState("");

//Variables para enviar al contrato
const [nameToSubmit, setnameToSubmit] = useState("");
const [descriptionToSubmit, setdescriptionToSubmit] = useState("");
const [priceToSubmit, setpriceToSubmit] = useState("");
const [addressToSubmit, setaddressToSubmit] = useState("");


const [fileType, setFileType] = useState(""); // Variable to store the file type (0: image, 1: video, 2: audio)

  // Efecto para verificar si hash está disponible
useEffect(() => {
  if (hash !== "") {
    setIsHashAvailable(1); // Cambiar el valor de isHashAvailable a 1 cuando hash no sea una cadena vacía.
  }
  else{
    setIsHashAvailable(0); // Cambiar el valor de isHashAvailable a 1 cuando hash no sea una cadena vacía.
  }
}, [hash]);


// Efecto para ejecutar acciones cuando hash está disponible (isHashAvailable === 1)
useEffect(() => {
  if (isHashAvailable === 1) {
    console.log("Imagen:", nameToSubmit);
    console.log("Descripción:", descriptionToSubmit);
    console.log("Precio:", priceToSubmit);
    console.log("Dirección:", addressToSubmit);
    console.log("CID:", hash);
    console.log("Formato del archivo:", fileType);
    createNFT();
    // const stackId = drizzle.contracts.NFTContract.methods.createNFT.cacheSend(nameToSubmit, hash, descriptionToSubmit, priceToSubmit, addressToSubmit);
    // setLastStackID(stackId);
  }
}, [isHashAvailable]);



const handleDrop = async (acceptedFiles) => {
  try {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buffer = Buffer.from(reader.result); // Convert the buffer to Buffer
      setFileBuffer(buffer);
      setPreviewURL(URL.createObjectURL(file));

      // Determine the file type based on the file's extension
      
      
        const extension = file.name.split('.').pop().toLowerCase();
        console.log("Extension:", extension);
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'gif' || extension === 'png') {
          setFileType(0); // Image
        } else if (extension === 'mp4' || extension === 'avi' || extension === 'mkv' || extension === 'mov' || extension === 'wmv' || extension === 'flv' || extension === 'webm' || extension === 'm4v' || extension === '3gp') {
          setFileType(1); // Video
        } else if (extension === 'ogg' || extension === 'wav' || extension === 'mp3') {
          setFileType(2); // Audio
        } else {
          setFileType(0); // Unknown file type
        }
     
    };
  } catch (error) {
    console.error("Error reading the file:", error);
  }
};

  const uploadToIPFS = async () => {
    try {
      const { cid } = await ipfs.add(fileBuffer);
      setHash(cid.toString());
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }
  };

  const getFileFromIPFS = async () => {
    try {
      if (!hash) return;

      const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
      console.log("File content from IPFS:", response.data);
    } catch (error) {
      console.error("Error fetching file from IPFS:", error);
    }
  };


// Función que se ejecuta cuando se rellena el formulario
const handleSubmit = (event) => {
  event.preventDefault();
  // Asegurarse de que imageName tenga un valor predeterminado de "NFT" si está vacío.
 const  nameToSubmit1 = imageName.trim() === "" ? "NFT" : imageName;

  // Asegurarse de que description tenga un valor predeterminado de "NFT de traducción" si está vacío.
  const descriptionToSubmit1 = description.trim() === "" ? "NFT de traducción" : description;

  // Asegurarse de que price tenga un valor predeterminado de "1" si está vacío.
  const priceToSubmit1 = price.trim() === "" ? 1 : price;

  // Asegurarse de que direccion tenga un valor predeterminado de la persona que lo crea si está vacío.
  const  addressToSubmit1 = direccion.trim() === "" ? address : direccion;

  setnameToSubmit(nameToSubmit1);
  setdescriptionToSubmit(descriptionToSubmit1);
  setpriceToSubmit(priceToSubmit1);
  setaddressToSubmit(addressToSubmit1);
  // Aquí puedes hacer lo que desees con los datos del formulario, por ejemplo, enviarlos a un contrato inteligente o a una API.
  console.log("Entramos");
  // Subir a IPFS y esperar hasta que se complete la operación.
  uploadToIPFS();
  //SE activan los USeEffect
};



  const createNFT = async () => {
    try {
      console.log("CID de createNFT:", hash);
      const stackId = drizzle.contracts.NFTContract.methods.createNFT.cacheSend(
        nameToSubmit,
        hash,
        descriptionToSubmit,
        Number(priceToSubmit),
        addressToSubmit,
        fileType
      );
      setHash("");
     // setLastStackID(stackId);
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }
  };


  return (
    <tbody>
      <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Subir contenido a IPFS</h1>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })} style={{
              backgroundColor: 'blue',
              border: '2px dashed white',
              borderRadius: '5px',
              padding: '20px',
              textAlign: 'center',
              color: 'white',
              cursor: 'pointer',
            }}>
              <input {...getInputProps()} />
              <p>Arrastre y suelte un archivo aquí, o haga clic para seleccionarlo</p>
              {previewURL && <img src={previewURL} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
            </div>
          )}
        </Dropzone>

        <div style={{ width: '100%' }}>
          <h2>Información de la imagen:</h2>
          <form onSubmit={handleSubmit} >
          <p> Nombre de la imagen: &nbsp;
              <input type="text" value={imageName} onChange={(e) => setImageName(e.target.value)} />
              </p>

              <p> 
              Descripción: &nbsp;
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </p>

            <p> 
              Precio: &nbsp;
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </p>

              <p> Dirección del creador: &nbsp;
                <input key="direccion" type="address" name="direccion" value={direccion} placeholder="0x0000"
                    onChange={ev => setDireccion(ev.target.value)} /> </p>
            <button type="submit" disabled={!fileBuffer}>Guardar información</button>
          </form>
        </div>
      </div>
    </tbody>
  );
};

export default Ipfsreact;
