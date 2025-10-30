# Quick Start Guide

快速开始使用 @aastar/shared-config 来管理 AAstar 生态的合约地址和配置。

## 安装

```bash
pnpm add @aastar/shared-config
```

## 基础使用

### 1. 获取合约地址

```typescript
import { getSuperPaymasterV2, getPaymasterV4 } from '@aastar/shared-config';

// AOA+ 模式：使用共享的 SuperPaymaster V2
const superPaymaster = getSuperPaymasterV2('sepolia');
console.log(superPaymaster); // 0x50c4Daf685170aa29513BA6dd89B8417b5b0FE4a

// AOA 模式：使用独立的 PaymasterV4
const paymasterV4 = getPaymasterV4('sepolia');
console.log(paymasterV4); // 0x4D6A367aA183903968833Ec4AE361CFc8dDDBA38
```

### 2. 获取网络配置

```typescript
import { getNetwork, getChainId, getRpcUrl } from '@aastar/shared-config';

const network = getNetwork('sepolia');
console.log(network.name); // Sepolia
console.log(network.chainId); // 11155111

const chainId = getChainId('sepolia');
const rpcUrl = getRpcUrl('sepolia');
```

### 3. 生成区块浏览器链接

```typescript
import { getTxUrl, getAddressUrl } from '@aastar/shared-config';

// 生成交易链接
const txUrl = getTxUrl('sepolia', '0xabc123...');
// https://sepolia.etherscan.io/tx/0xabc123...

// 生成地址链接
const addressUrl = getAddressUrl('sepolia', '0xdef456...');
// https://sepolia.etherscan.io/address/0xdef456...
```

### 4. 使用合约 ABI

```typescript
import { PaymasterV4ABI } from '@aastar/shared-config';
import { ethers } from 'ethers';

const paymaster = new ethers.Contract(
  paymasterAddress,
  PaymasterV4ABI,
  provider
);

const isSupported = await paymaster.isSupportedSBT(sbtAddress);
```

## 完整示例：发送 Gasless 交易

```typescript
import { ethers } from 'ethers';
import {
  getSuperPaymasterV2,
  getEntryPoint,
  getRpcUrl,
  getChainId,
  getTxUrl,
} from '@aastar/shared-config';

async function sendGaslessTransaction() {
  const network = 'sepolia';

  // 1. 获取网络配置
  const rpcUrl = getRpcUrl(network);
  const chainId = getChainId(network);
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // 2. 获取合约地址
  const superPaymaster = getSuperPaymasterV2(network);
  const entryPoint = getEntryPoint(network);

  // 3. 构建 UserOperation
  const userOp = {
    sender: accountAddress,
    nonce: await account.getNonce(),
    initCode: '0x',
    callData: callData,
    callGasLimit: 100000,
    verificationGasLimit: 100000,
    preVerificationGas: 21000,
    maxFeePerGas: await provider.getFeeData().maxFeePerGas,
    maxPriorityFeePerGas: await provider.getFeeData().maxPriorityFeePerGas,
    paymaster: superPaymaster, // AOA+ 模式：使用共享 paymaster
    paymasterData: '0x',
    signature: '0x',
  };

  // 4. 签名并发送
  const tx = await entryPoint.handleOps([userOp], beneficiary);
  await tx.wait();

  // 5. 生成浏览器链接
  const txUrl = getTxUrl(network, tx.hash);
  console.log('Transaction:', txUrl);

  return tx;
}
```

## AOA 模式 vs AOA+ 模式

### AOA+ 模式（推荐）
使用共享的 SuperPaymaster V2，无需部署自己的 paymaster：

```typescript
import { getSuperPaymasterV2 } from '@aastar/shared-config';

const paymaster = getSuperPaymasterV2('sepolia');
// 直接使用，不需要额外配置
```

### AOA 模式
使用独立的 PaymasterV4，需要自己部署和管理：

```typescript
import { getPaymasterV4 } from '@aastar/shared-config';

const paymaster = getPaymasterV4('sepolia');
// 需要配置 SBT、xPNTs tokens 等
```

## 常用功能

### 获取所有核心合约

```typescript
import { getCoreContracts } from '@aastar/shared-config';

const core = getCoreContracts('sepolia');
console.log('SuperPaymaster V2:', core.superPaymasterV2);
console.log('Registry:', core.registry);
console.log('GToken:', core.gToken);
console.log('GTokenStaking:', core.gTokenStaking);
```

### 获取所有代币合约

```typescript
import { getTokenContracts } from '@aastar/shared-config';

const tokens = getTokenContracts('sepolia');
console.log('xPNTsFactory:', tokens.xPNTsFactory);
console.log('MySBT:', tokens.mySBT);
```

### 查询部署日期

```typescript
import { getDeploymentDate } from '@aastar/shared-config';

const deployDate = getDeploymentDate('sepolia', 'superPaymasterV2');
console.log(deployDate); // 2025-10-25
```

### 使用常量

```typescript
import {
  SERVICE_FEE_RATE,
  BPS_DENOMINATOR,
  NODE_STAKE_AMOUNTS,
} from '@aastar/shared-config';

// 计算手续费 (2%)
const fee = (amount * SERVICE_FEE_RATE) / BPS_DENOMINATOR;

// 节点质押要求
console.log('Lite Node:', NODE_STAKE_AMOUNTS.LITE, 'sGT'); // 30 sGT
console.log('Super Node:', NODE_STAKE_AMOUNTS.SUPER, 'sGT'); // 300 sGT
```

## TypeScript 支持

完整的类型定义支持：

```typescript
import type {
  ContractNetwork,
  NetworkContracts,
  ContractCategory,
} from '@aastar/shared-config';

function getMyContract(network: ContractNetwork) {
  const contracts: NetworkContracts = getContracts(network);
  // 类型安全！
}
```

## 更多信息

- 完整文档：[README.md](./README.md)
- 变更日志：[CHANGELOG.md](./CHANGELOG.md)
- GitHub: https://github.com/AAStarCommunity/aastar-shared-config
- AAstar 官网：https://aastar.io
