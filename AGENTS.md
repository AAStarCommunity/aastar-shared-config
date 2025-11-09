# AAStar Shared Config - Agent Guidelines

## Build Commands
- `pnpm build` - Build CJS/ESM modules with types
- `pnpm dev` - Build with watch mode
- `pnpm verify` - Verify onchain contract versions
- `pnpm sync-abis` - Sync contract ABIs from SuperPaymaster repo
- `pnpm sync-versions` - Auto-sync contract versions from on-chain data
- `pnpm sync-all` - Sync both ABIs and versions
- `./sync-abis.sh` - Sync contract ABIs before publish

## Code Style
- **TypeScript**: Strict mode enabled, ES2020 target
- **Imports**: Use `export * from './module'` pattern in index.ts
- **Constants**: UPPER_SNAKE_CASE for all constants
- **Types**: Use `as const` for immutable objects
- **Functions**: JSDoc comments with @examples
- **Error Handling**: Throw descriptive Error messages with context
- **File Structure**: Separate addresses, contracts, constants, branding
- **Naming**: camelCase for functions, PascalCase for types
- **Comments**: JSDoc format with @param and @returns