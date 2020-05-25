import { setGlobals } from './globals';
import { liquidate } from './liquidation/liquidation'

require('dotenv').config()

setGlobals();

const collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" 
const reserveAddress = "0xf80a32a835f79d7787e8a8ee5721d0feafd78108"
const userLiquidated = "0xe4509F2ce63DED82e74e9e7E648c1A69e90cD2C4" 
const purchaseAmount = '5'
const receiveATokens = false

liquidate(
    collateralAddress,
    reserveAddress,
    userLiquidated,
    purchaseAmount,
    receiveATokens
)
