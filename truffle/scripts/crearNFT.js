

module.exports = async callback => {

    try {
        console.log("Web3 version:", web3.version, "\n");

        // Get instances of all three contracts
        const NFTContract = artifacts.require("NFTContract");

        // Abstracciones de los contratos:
        const NFT = await NFTContract.deployed();
        console.log("NFT Contract deployed to:", NFT.address);





        // Get instances of all three contracts
        const tokenContract = artifacts.require("GovernanceToken");

        // Abstracciones de los contratos:
        const token = await tokenContract.deployed();
        console.log("Token Contract deployed to:", token.address);

        // Usar las cuentas de usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 8) {
            throw new Error("No hay cuentas.");
        }

        // Addresses:
        const ownerAddr = accounts[0];
        console.log("Cuenta del Admin =", ownerAddr);

        const voter1Addr = accounts[1];
        //Creamos un NFT
        await NFT.createNFT("Playa", "cid1", "Es Caribe", "25", voter1Addr, 2,{from: voter1Addr});
        console.log("NFT del voter 1 =", (await NFT.getNFTsByOwner(voter1Addr)).toString(), "\n");
        let cantidad = await NFT.getNFTlength();
        console.log("Cantidad de NFT", cantidad.toString(), "\n");

        const voter2Addr = accounts[2];
        //Compramos NFT
        await NFT.exchangeNFT(cantidad, voter2Addr,{from: voter1Addr});
        console.log("Comprado NFT , saldo actual del comprador =", (await token.balanceOf(voter2Addr)).toString(), "\n");
        console.log("Vendido NFT , saldo actual del vendedor =", (await token.balanceOf(voter1Addr)).toString(), "\n");

        cantidad = await NFT.getNFTlength();
        console.log("Cantidad de NFT", cantidad.toString(), "\n");

        await NFT.exchangeNFTOther(cantidad, voter1Addr,{from: voter1Addr});
        console.log("Comprado NFT , saldo actual del comprador =", (await token.balanceOf(voter1Addr)).toString(), "\n");
        console.log("Vendido NFT , saldo actual del vendedor =", (await token.balanceOf(voter2Addr)).toString(), "\n");



        
    } catch (err) {   // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }

    callback();      // Terminar
};
