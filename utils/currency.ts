const toEthPow: Record<any, any> = {
  wei: -18,
  kwei: -15,
  mwei: -12,
  gwei: -9,
  szabo: -6,
  finney: -3,
  ether: 1,
  kether: 3,
  mether: 6,
  gether: 9,
};

export const getEth = (hexValue: string, unit: string, usdFactor: number | null) => {
  let eth = '-'
  let usd = '-'
 
  let ethDecimalValue = parseInt(hexValue, 16);
  let pow = toEthPow[unit.toLowerCase()];
  if (!pow) {
    console.log(`Error: Invalid unit: ${unit}`);
    return null;
  }
  ethDecimalValue = ethDecimalValue * Math.pow(10, pow);
  if (usdFactor) {
    usd = (ethDecimalValue * usdFactor).toLocaleString('fullwide', { useGrouping: false });
  }
  eth = ethDecimalValue.toFixed(12);
  console.log(eth, ethDecimalValue)
  return {
    eth,
    usd 
  };
};
