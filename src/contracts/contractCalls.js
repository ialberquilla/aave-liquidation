import { signAndSendTransaction, createTx } from '../transaction/transaction'


/**
 * 
 * @param {Lending pool contrac} lpContract 
 * @param {*} lpAddress 
 * @param {*} collateralAddress 
 * @param {*} userLiquidated 
 * @param {*} purchaseAmount 
 * @param {*} reserve 
 * @param {*} receiveATokens 
 * @param {*} fromAccount 
 */
export const liquidationCall = async (
    lpContract,
    lpAddress,
    collateralAddress,
    userLiquidated,
    purchaseAmount,
    reserve,
    receiveATokens,
    fromAccount) => {
    const tx = await createTx(
        lpContract, //Contract to call to
        'liquidationCall', //method name
        fromAccount, //from 
        lpAddress, //to
        [collateralAddress, reserve, userLiquidated, purchaseAmount, receiveATokens]) //params
    return signAndSendTransaction(tx, privateKey)
}

/**
 * Approve to spend ERC20 tokens
 * @param {Erc20 contract to approve} contract 
 * @param {Address of the spender} spender 
 * @param {Amount to allow} amount 
 * @param {Address from the transaction} from 
 * @param {Address of the contrac} to 
 */
export const approveErc20 = async (contract, spender, amount, from, to) => {
    const tx = await createTx(
        contract, //Contract to call to
        'approve', //method name
        from, //from 
        to, //to
        [spender, amount]) //params
    return signAndSendTransaction(tx, privateKey)
}

