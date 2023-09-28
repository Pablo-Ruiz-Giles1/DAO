module.exports = async callback => {
  try {
    console.log("Web3 version:", web3.version, "\n");

    // Get instances of all three contracts
    const boxContract = artifacts.require("Gestor");
    const GovContract = artifacts.require("GovernorContract");

    // Abstracciones de los contratos:
    const box = await boxContract.deployed();
    console.log("Gestor Contract deployed to:", box.address);

    const govcontract = await GovContract.deployed();
    console.log("GovernorContract deployed to:", govcontract.address);

    // Usar las cuentas de usuario
    const accounts = await web3.eth.getAccounts();
    if (accounts.length < 8) {
      throw new Error("No hay cuentas.");
    }

    // Addresses:
    const ownerAddr = accounts[0];
    console.log("Cuenta del owner =", ownerAddr);

    // Llamar a la función proposesLength para obtener la longitud
    const proposesLength = await govcontract.s_proposalCount();
    console.log("Length of proposes array:", proposesLength.toString());

    // Leer todos los campos de cada propuesta en el array proposes
    for (let i = 0; i < proposesLength; i++) {
      const proposalId = await govcontract.proposes(i);
      const proposalData = await govcontract.datosPropose(proposalId);

      console.log("Proposal ID:", proposalData.id.toString());
      console.log("Targets:", proposalData.targets);
      console.log("Calldatas:", proposalData.calldatas);
      console.log("Description:", proposalData.description);
      console.log("------------------------------------");
    }

  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    console.log("FIN");
  }

  callback();
};
