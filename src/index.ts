/**
 * AAStar Shared Configuration Package
 *
 * @packageDocumentation
 */

export * from './branding';
export * from './contracts';
export * from './contract-versions';
export * from './networks';
export * from './constants';

// ABIs are available but not exported from main entry to avoid TypeScript declaration issues
// Import ABIs directly from JSON files when needed:
// import PaymasterV4ABI from '@aastar/shared-config/dist/abis/PaymasterV4.json';
