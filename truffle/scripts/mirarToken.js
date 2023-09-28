

module.exports = async callback => {

    try {
        console.log("Web3 version:", web3.version, "\n");

        // Get instances of all three contracts
        const TraductoresContract = artifacts.require("Traductores");

        // Abstracciones de los contratos:
        const traductores = await TraductoresContract.deployed();
        console.log("Traductores Contract deployed to:", traductores.address);





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
        console.log("Cuenta del owner =", ownerAddr);
   
        const voter1Addr = accounts[1];

        //await traductores.createTraductor("Alberto",{from: voter1Addr});
        console.log("Tokens del voter 1 =", (await token.balanceOf(voter1Addr)).toString(), "\n");


        const voter2Addr = accounts[2];

      //  await traductores.createTraductor("Paco",{from: voter2Addr});
        console.log("Tokens del voter 2 =", (await token.balanceOf(voter2Addr)).toString(), "\n");


       //await token.mint(ownerAddr, 0);
       console.log("Tokens del owner =", (await token.balanceOf(ownerAddr)).toString(), "\n");
       
       // const voter1Addr = accounts[2];
        console.log("Cuenta del voter 1 =", voter1Addr);
       // await token.mint(voter1Addr, 50, { gas: 9000000 });

        console.log("Tokens del voter 1 =", (await token.balanceOf(voter1Addr)).toString(), "\n");

 
        console.log("Cuenta del voter 2 =", voter2Addr);
        //await token.mint(voter2Addr, 20, {gas: 9000000});
        console.log("Tokens del voter 2 =", (await token.balanceOf(voter2Addr)).toString(), "\n");

        let longitud = await traductores.getTraductorLength();
        console.log("Cantidad de holders", longitud.toString());

        for (let i = 0; i < longitud; i++) {
            const proposalId = await traductores.s_traductores(i);
             
            console.log("Holder:", proposalId.toString());
        }
    } catch (err) {   // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }

    callback();      // Terminar
};
