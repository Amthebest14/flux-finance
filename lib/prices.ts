export async function getZenPrice(): Promise<number> {
  try {
    // Calling CoinGecko API for Horizen (ZEN) price
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=horizen&vs_currencies=usd");
    const data = await response.json();
    return data.horizen.usd || 7.55;
  } catch (error) {
    console.error("Failed to fetch ZEN price:", error);
    return 7.55; // Fallback to user's mentioned price
  }
}
