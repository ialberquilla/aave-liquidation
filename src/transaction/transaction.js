/**
 * Function to call a smart contract method
 * 
 * @param {smart contract to call to} contract 
 * @param {method of smart contract to call to} method 
 * @param {from account of the transaction} from 
 * @param {to address of the contrat} to 
 * @param {array of args to pass to the method} args 
 */

export const createTx = async (contract, method, from, to, args) => {
    const methodCall = contract['methods'][method]
    const gasPrice = Number(await web3.eth.getGasPrice());
    const gas = await methodCall.apply(null, args).estimateGas({ from: from })
        .catch((e) => {
            throw Error(`Error calculating gas: ${e.message}`)
        })
    const tx = {
        from: from,
        to: to,
        data: methodCall.apply(null, args).encodeABI(),
        gas,
        gasPrice,
        gasLimit: gas * gasPrice,
    };
    return tx;
}

/**
 * Method to sign the transaction and send to the smart contrac
 * 
 * @param {transaction to send} tx 
 * @param {privateKey of the account that create the transaction} privateKey 
 */
export const signAndSendTransaction = async (tx, privateKey) => {
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    return web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction)
}


