import { CORE_ADDRESSES } from './src/contract-addresses.ts';

console.log("=== 从 shared-config 读取合约地址 ===\n");
console.log("MySBT:         ", CORE_ADDRESSES.mySBT);
console.log("GTokenStaking: ", CORE_ADDRESSES.gTokenStaking);
console.log("Registry:      ", CORE_ADDRESSES.registry);
console.log("DAO Multisig:  ", CORE_ADDRESSES.daoMultisig);
