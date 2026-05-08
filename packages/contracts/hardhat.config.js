import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.20",
  networks: {
    horizenTestnet: {
      url: "https://horizen-testnet.rpc.caldera.xyz/http",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
