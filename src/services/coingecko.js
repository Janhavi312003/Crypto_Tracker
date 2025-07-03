// // src/services/coingecko.js

// export async function getPrices(coinIds) {
//   const ids = coinIds.join(",");
//   const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Failed to fetch prices");
//   }
//   const data = await response.json();
//   return data;
// }
