import { setGlobals } from './globals';
import { liquidate } from './liquidation/liquidation'

require('dotenv').config()

setGlobals();

const collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" 
const reserveAddress = "0xb36938c51c4f67e5e1112eb11916ed70a772bd75"
const userLiquidated = "0x922257aefb9d47bfe36e7d72288c2cfb56457a40" 
const purchaseAmount = '10'
const receiveATokens = false

liquidate(
    collateralAddress,
    reserveAddress,
    userLiquidated,
    purchaseAmount,
    receiveATokens
)
