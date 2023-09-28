module.exports = async callback => {
    try {
      console.log("Web3 version:", web3.version, "\n");
  
      // Get instances of all three contracts
      const conContract = artifacts.require("Gestor");
      const GovContract = artifacts.require("GovernorContract");
  
      // Abstracciones de los contratos:
      const contrato = await conContract.deployed();
      console.log("Gestor Contract deployed to:", contrato.address);
  
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
      let max = await contrato.valor();
      console.log("Gestor Valor:", max.toString());
  
      //Propose
      const newValue = 77;
      const proposalDescription = "Proposal #1 77 in the Box!";

      let propuestas = await govcontract.s_proposalCount();
      console.log("Propuestas:", propuestas.toString());


      console.log("Empezamos propuesta");
  
 
  
      // Propose the transaction
      const encodedFunctionCall = contrato.contract.methods.modificarValor(newValue, 0).encodeABI();
      console.log("ABI:,", encodedFunctionCall);

      console.log("Hacemos propuesta");
      let proposeTx = await govcontract.propose(
        [contrato.address],
        [0],
        [encodedFunctionCall],
        proposalDescription
      );
      console.log("Finalizamos propuesta");
      // Wait for the propose transaction to be mined

 

        let propuestas2 = await govcontract.s_proposalCount();
        console.log("Propuestas:", propuestas2.toString());

     // const proposeReceipt = await proposeTx.wait(1);
    //  const proposalId = proposeTx.events[0].args.proposalId;
  
    //  console.log(`Proposed with proposal ID:\n  ${proposalId}`);
    let proposalId = proposeTx.logs[0].args.proposalId;
    console.log("Proposal ID:", proposalId.toString());
    
        ///CASTEAR EL VOTO
        // Helper function to fast forward blocks
        const ff_blocks = async (n) => {
            const firstBlockNum = await web3.eth.getBlockNumber();
            while (true) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar un segundo
                const currentBlockNum = await web3.eth.getBlockNumber();
                if (firstBlockNum + n <= currentBlockNum) break;
                // console.log("Esperando por ", firstBlockNum + n - currentBlockNum, " blocks");
                //await counter.incr(); // por si no mina automaticamente la red blockchain

            }
            console.log("Moved", n, "blocks\n");
        }


      
        //
        //Volvemos a capturar la propuesta del array 

      // Llamar a la función proposesLength para obtener la longitud
    const proposesLength = await govcontract.s_proposalCount();
    console.log("Length of proposes array:", proposesLength.toString());

    // Obtener la última propuesta del array proposes
    const lastProposalIndex = proposesLength.subn(1);
    const lastProposalId = await govcontract.proposes(lastProposalIndex);
    const lastProposalData = await govcontract.datosPropose(lastProposalId);

    console.log("ID de la propuesta rescatada del contrato", lastProposalData.id)

     // Move past voting delay
     await ff_blocks(1);
     const reason = "It is a number"
     const voter1Addr = accounts[1];
     const voter2Addr = accounts[2];

     const voter3Addr = accounts[3];
     const voter4Addr = accounts[4];
     // Voter 1 and voter 2 vote against
     let vote = await govcontract.castVoteWithReason(lastProposalData.id, 0, reason,{ from: voter1Addr });
     console.log("V1 has voted against.")
     vote = await govcontract.castVoteWithReason(lastProposalData.id, 0, reason,{ from: voter2Addr });
     console.log("V2 has voted against.")

     // Voter 3 and voter 4 vote against
      vote = await govcontract.castVoteWithReason(lastProposalData.id, 1, reason,{ from: voter3Addr });
     console.log("V3 has voted in favor.")
     
     vote = await govcontract.castVoteWithReason(lastProposalData.id, 1, reason,{ from: voter4Addr });
     console.log("V4 has voted in favor.")

      vote = await govcontract.castVoteWithReason(lastProposalData.id, 1, reason,{ from: ownerAddr });
     console.log("V0 has voted in favor.")
     // Move 5 blocks
     await ff_blocks(5);

     // Get final result
     console.log("Final Result");


        // Proposal states as defined by OpenZeppelin/Compound
        const oz_states = ['Pending', 'Active', 'Canceled', 'Defeated',
            'Succeeded', 'Queued', 'Expired', 'Executed'];

        // Helper function to get proposal state
        const getProposalState = async (gov, proposalId) => {
             let propState = await gov.state(proposalId);
             console.log("Proposal State:", oz_states[propState.toNumber()]);
         }

            


     await getProposalState(govcontract, proposalId);   



        /////////////////////////////
        console.log("\Queuing proposal on DAO")
            // Execute task
            execute = await govcontract.queue(
              [lastProposalData.targets],
                [0],
                [lastProposalData.calldatas],
                web3.utils.sha3(lastProposalData.description)
            );
            
            await ff_blocks(5);
            await getProposalState(govcontract, proposalId);   
    // EXECUTE

            // Execute task
            execute = await govcontract.execute(
              [lastProposalData.targets],
                [0],
                [lastProposalData.calldatas],
                web3.utils.sha3(lastProposalData.description)
            );
            console.log("\nExecuting proposal on DAO")

            await ff_blocks(5);
            await getProposalState(govcontract, proposalId);   



    } catch (err) {
      console.log(`Error: ${err}`);
    } finally {
      console.log("FIN");
    }
  
    callback();
  };
  