/**
 * Returns the Account data of the user
 * @param {Lending pool contract} lpContract 
 * @param {User id to get the data} user 
 */
export const getUserAccountData = (lpContract, user) => {
    return lpContract.methods
        .getUserAccountData(user)
        .call()
        .catch((e) => {
            throw Error(`Error getting user account data: ${e.message}`)
        })
}

/**
 * 
 * @param {Lending pool contract} lpContract 
 * @param {Token reserve address} reserve 
 * @param {User id to get the data} user 
 */
export const getUserReserveData = (lpContract, reserve, user) => {
    return lpContract.methods
        .getUserReserveData(reserve, user)
        .call()
        .catch((e) => {
            throw Error(`Error getting user account data: ${e.message}`)
        })
}

/**
 * 
 * @param {Lending pool core contract} lpCoreContract 
 * @param {Collateral address} collateral 
 * @param {User id to get the data} user 
 */
export const getUserUnderlyingAssetBalance = (lpCoreContract, collateral, user) => {
    return lpCoreContract.methods
        .getUserUnderlyingAssetBalance(collateral, user)
        .call()
        .catch((e) => {
            throw Error(`Error getting user account data: ${e.message}`)
        })
}

/**
 * 
 * @param {Lending pool core contract} lpCoreContract 
 * @param {Collateral address} collateral 
 * @param {User id to get the data} user 
 */
export const getUserBorrowBalances = (lpCoreContract, collateral, user) => {
    return lpCoreContract.methods
        .getUserBorrowBalances(collateral, user)
        .call()
        .catch((e) => {
            throw Error(`Error getting user account data: ${e.message}`)
        })
}

/**
 * 
 * @param {er20 token contract} erc20Contract 
 * @param {owner address of the token} owner 
 * @param {spender address of the token} spender 
 */
export const allowance = (erc20Contract, owner, spender) => {
    return erc20Contract.methods
        .allowance(owner, spender)
        .call()
        .catch((e) => {
            throw Error(`Error getting user account data: ${e.message}`)
        })
}
