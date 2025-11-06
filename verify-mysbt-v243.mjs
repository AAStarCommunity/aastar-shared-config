import { ethers } from "ethers";

const MYSBT_ADDRESS = "0xD1e6BDfb907EacD26FF69a40BBFF9278b1E7Cf5C"; // MySBT v2.4.3
const RPC_URL = "https://rpc.ankr.com/eth_sepolia";

const MYSBT_ABI = [
  "function VERSION() view returns (string)",
  "function VERSION_CODE() view returns (uint256)"
];

async function verify() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const mySBT = new ethers.Contract(MYSBT_ADDRESS, MYSBT_ABI, provider);
  
  try {
    const version = await mySBT.VERSION();
    const versionCode = await mySBT.VERSION_CODE();
    console.log("✅ MySBT v2.4.3 Verification:");
    console.log("   Address:", MYSBT_ADDRESS);
    console.log("   VERSION:", version);
    console.log("   VERSION_CODE:", versionCode.toString());
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

verify();
