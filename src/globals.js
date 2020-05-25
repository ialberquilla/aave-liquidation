import Web3 from "web3"

export const setGlobals = () => {
    global.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + process.env.INFURA_KEY));
    global.fromAccount = process.env.FROM_ACCOUNT
    global.privateKey = process.env.PRIVATE_KEY
    global.lpAddressProviderAddress = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728"
}