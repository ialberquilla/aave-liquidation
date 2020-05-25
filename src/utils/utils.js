/**
 * Function to convert units with 18 decimals
 * @param {Amount to convert} amount 
 */
export const convertUnits = (amount) => {
  return amount / 1e18
}


export const getAbiReserve = (reserves, reserve) => {
  return reserves.filter((element) => {
    return (element['id'] == reserve);
  })[0].abi;
}



