// scripts/deploy.cjs
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("🚀 Deploying contracts with account:", deployer.address);

    const CrimeLifeCycle = await ethers.getContractFactory("CrimeLifeCycle");
    const contract = await CrimeLifeCycle.deploy();
    console.log("⏳ Waiting for deployment transaction to be mined...");
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    console.log("✅ Contract deployed at:", await contract.getAddress());

    // === Call testLog() function
    const message = await contract.testLog();
    console.log("📝 testLog() says:", message);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Error:", error)
        process.exit(1)
    })
