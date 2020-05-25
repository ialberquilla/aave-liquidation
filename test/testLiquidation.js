import { expect } from 'chai';
import Web3 from 'web3'
import
LendingPoolAddressesProviderABI
    from "../abi/LendingPoolAddressesProvider.json"
import LendingPoolABI
    from "../abi/LendingPool.json"
import LendingPoolCoreABI
    from '../abi/LendingPoolCore.json'

require('dotenv').config()
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + process.env.INFURA_KEY));

import {
    getLpCoreAddress,
    getLendingPoolAddress,
} from '../src/contracts/contractInstances'
import { convertUnits } from '../src/utils/utils'

import {
    getUserAccountData,
    getUserBorrowBalances,
    getUserReserveData,
    getUserUnderlyingAssetBalance,
} from '../src/contracts/contractData'

describe('Liquidation integration test', () => {

    const collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" //Collateral address of the user that we want to liquidate
    const reserveAddress = "0xb36938c51c4f67e5e1112eb11916ed70a772bd75" //Reserve address that we are going to pay for ERC20 token
    const userLiquidated = "0x922257aefb9d47bfe36e7d72288c2cfb56457a40" //User that we are going to liquidate
    const purchaseAmount = 1 //Amount of the reserve that we are going to liquidate

    const lpAddressProviderAddress = '0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728';
    const lpAddressProviderContract = new
        web3.eth.Contract(
            LendingPoolAddressesProviderABI,
            lpAddressProviderAddress
        );

    var lpCoreAddress, lpContract, lpAddress, lpCoreContract


    it('should get the latest LendingPoolCore address', async () => {
        lpCoreAddress = await getLpCoreAddress(lpAddressProviderContract)
        expect(lpCoreAddress).contains('0x')
    });


    it('should Get the latest LendingPool contract address', async () => {
        lpAddress = await getLendingPoolAddress(lpAddressProviderContract)
        expect(lpAddress).contains('0x')
    });

    it('Should Get the lpContract', async () => {
        lpContract = await new web3.eth.Contract(LendingPoolABI, lpAddress)
        expect(lpContract._address).contains('0x')
    });

    it('Should Get the lpCoreContract', async () => {
        lpCoreContract = await new web3.eth.Contract(LendingPoolCoreABI, lpCoreAddress)
        expect(lpCoreContract._address).contains('0x')
    });

    it('Should have health factor below 1', async () => {
        const userData = await getUserAccountData(lpContract, userLiquidated);
        expect(convertUnits(userData.healthFactor)).lessThan(1)
    })

    it('Should have collateral enabled', async () => {
        const userReserveData = await getUserReserveData(lpContract, collateralAddress, userLiquidated);
        expect(userReserveData.usageAsCollateralEnabled).to.be.true
    })

    it('Should have collateral deposited', async () => {
        const userCollateralBalance = await getUserUnderlyingAssetBalance(
            lpCoreContract,
            collateralAddress,
            userLiquidated);
        expect(Number(userCollateralBalance)).to.be.greaterThan(0)
    })

    it('Should have enough reseve borrowed', async () => {
        const LIQUIDATION_CLOSE_FACTOR_PERCENT = 0.5
        const userBorrows = await getUserBorrowBalances(
            lpCoreContract,
            reserveAddress,
            userLiquidated);
        const userCompoundedBorrowBalance = convertUnits(userBorrows[1])
        expect(userCompoundedBorrowBalance * LIQUIDATION_CLOSE_FACTOR_PERCENT)
            .to.be.greaterThan(Number(purchaseAmount))
    })

})