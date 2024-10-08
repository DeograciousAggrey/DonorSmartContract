const fs = require("fs");

const main = async () => {
    // Base Sepolia USDC contract address
    const usdcTokenAddress = "0x2b04d9a7ed8ad4cf676c1e87af948a2d57d453d4";

    // Deploy DonorAfrica contract with USDC token address
    const contractFactoryDonorAfrica = await hre.ethers.getContractFactory("DonorAfrica");
    const contractDonorAfrica = await contractFactoryDonorAfrica.deploy(usdcTokenAddress); // Pass USDC address to constructor
    await contractDonorAfrica.deployed();
    
    console.log("DonorAfrica deployed to:", contractDonorAfrica.address);

    const contractInfoDonorAfrica = {
        address: contractDonorAfrica.address,
        abi: JSON.parse(contractDonorAfrica.interface.format("json"))
    };

    fs.writeFileSync("contractDonorAfricaAddress.json", JSON.stringify(contractInfoDonorAfrica, null, 2));
    fs.writeFileSync("contractDonorAfricaAddress.txt", contractDonorAfrica.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();
