const Web3 = require('web3');

module.exports = async(contractFile,param1,param2,param3,param4,param5) =>{

    const bytecode = contractFile.evm.bytecode.object;
    const abi = contractFile.abi;

    const privKey = process.env.PRIVATE_KEY;
    const address = process.env.PUBLIC_KEY;
    const ropstenUrl = process.env.ROPSTEN_URL;
    const bscUrl = process.env.BSC_URL;
    const web3 = new Web3(bscUrl);

    console.log('Attempting to deploy from account:', address);
    const tokenContract = new web3.eth.Contract(abi);

    // console.log("contract ready--------------");

    const tokenTx = tokenContract.deploy({
        data: bytecode,
        arguments: [param1,param2,param3,param4,param5]
    });

    // console.log("Transaction ready--------------");
    const weiValue = Web3.utils.toWei('0.3', 'ether');

    const signedTransaction = await web3.eth.accounts.signTransaction({
            from: address,
            data: tokenTx.encodeABI(),
            value: weiValue,
            gas: 4000000 //'4294967295',
        },
        privKey
    );

    // console.log("Sign complete---------------");

    const createReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    // console.log('Contract deployed at address', createReceipt.contractAddress);

    // return signedTransaction.s;
    return createReceipt;
}


