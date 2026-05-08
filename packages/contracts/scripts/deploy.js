import hre from "hardhat";
import fs from "fs";

async function main() {
  const verifierAddress = "0x000000000000000000000000000000000000dEaD"; // Mock verifier

  console.log("Deploying MockERC20...");
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const token = await MockERC20.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log(`MockERC20 deployed to: ${tokenAddress}`);

  console.log("Deploying FluxVault...");
  const FluxVault = await hre.ethers.getContractFactory("FluxVault");
  const vault = await FluxVault.deploy(tokenAddress, "Flux ZEN Vault", "fZEN", verifierAddress);

  await vault.waitForDeployment();
  const vaultAddress = await vault.getAddress();
  console.log(`FluxVault deployed to: ${vaultAddress}`);

  // Create deploy-log.json
  const log = {
    tokenAddress,
    vaultAddress,
    txHash: vault.deploymentTransaction().hash
  };
  fs.writeFileSync("deploy-log.json", JSON.stringify(log, null, 2));
  console.log("Saved deploy-log.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
