const GovernanceToken = artifacts.require("GovernanceToken");
const TimeLock = artifacts.require("TimeLock");
const GovernorContract = artifacts.require("GovernorContract");
const Traductores = artifacts.require("Traductores");
const Gestor = artifacts.require("Gestor");
const NFTContract = artifacts.require("NFTContract");

module.exports = async function (deployer) {
  // Usar las cuentas de usuario
  const accounts = await web3.eth.getAccounts();
  if (accounts.length < 8) {
    throw new Error("No hay cuentas.");
  }

  // Deploy the governance token contract
  await deployer.deploy(GovernanceToken,4);//4 indica el porcentaje de tokens que nos quedamos
  const token = await GovernanceToken.deployed();
  console.log("GovernanceToken Contract deployed to:", GovernanceToken.address);

  const deployerAccount = accounts[0];
  console.log(`Delegating to ${deployerAccount}`);
  await delegate(GovernanceToken.address, deployerAccount);
  console.log("Delegated!");

  // Deploy the TimeLock contract
  await deployer.deploy(TimeLock, 1, [], [], deployerAccount);
  const timelock = await TimeLock.deployed();
  console.log("Timelock contract deployed to:", timelock.address, "\n");

  // Deploy the GovernorContract contract
  await deployer.deploy(
    GovernorContract,
    GovernanceToken.address,
    timelock.address,
    4, //Quorum
    50, //Voting period
    1 //Voting delay
  );
  const governorContract2 = await GovernorContract.deployed();
  console.log("GovernorContract contract deployed to:", governorContract2.address, "\n");

///////////////////////////////////
//////////////////////////////////


//Asignamos roles
let proposerRole = await timelock.PROPOSER_ROLE();
let executorRole = await timelock.EXECUTOR_ROLE();
let adminRole = await timelock.TIMELOCK_ADMIN_ROLE();

// @ts-ignore
const proposerTx = await timelock.grantRole(proposerRole, governorContract2.address);
console.log("Proposer Transaction:", proposerTx.transactionHash);

const executorTx = await timelock.grantRole(executorRole, "0x0000000000000000000000000000000000000000");
console.log("Executor Transaction:", executorTx.transactionHash);

const revokeTx = await timelock.revokeRole(adminRole, deployerAccount);
console.log("Revoke Transaction:", revokeTx.transactionHash);



///////////////////////////////////
//////////////////////////////////

// Deploy the Traductores contract
await deployer.deploy(Traductores, GovernanceToken.address, "Pablo");
const traductores = await Traductores.deployed();
console.log("Traductores contract deployed to:", traductores.address, "\n");

// Deploy the Gestor contract
await deployer.deploy(Gestor, traductores.address);
const contrato = await Gestor.deployed();
console.log("Gestor Contract deployed to:", contrato.address);


//Transferimos Ownership de Gestor
const timeLock = await TimeLock.deployed();

const transferTx = await contrato.transferOwnership(timeLock.address, { from: deployerAccount });
//await transferTx.wait()
console.log("transferTx :", transferTx.transactionHash);
//await transferTx.wait(1);
//console.log(`${transferTx.address}`);

//Enlazarlo con Contrato a Traductores
const setowner = await traductores.setOwner(contrato.address);

console.log("Gestor Contract linked with Traductores Contract");


//NFT
// Deploy the NFT token contract
await deployer.deploy(NFTContract,"Traductores NFT", "NFTDAO",GovernanceToken.address);//4 indica el porcentaje de tokens que nos quedamos
const NFT = await NFTContract.deployed();
console.log("NFT Contract deployed to:", NFT.address);



///////////////IMPORTANTE///////////////   
await token.setOwner(traductores.address);
console.log("Owner establecido en GovernanceToken");

///////////////IMPORTANTE///////////////     
//Enlazar NFT con  GovernanceToken
const setNFT= await token.setNFT(NFT.address);

console.log("NFT establecido en GovernanceToken");
/////////////// /////////////// 
/////////////// /////////////// 

};
//Función para delegar
const delegate = async (governanceTokenAddress, delegatedAccount) => {
  const governanceToken = await GovernanceToken.deployed();
  const transactionResponse = await governanceToken.delegate(delegatedAccount);
  console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`);
};
