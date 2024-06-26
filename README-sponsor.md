# Munchables Common Core Contracts

## Directory structure

### Source code

`/src` - All smart contract code

`/lib` - Foundry dependencies

`/client` - Client code (specifically signer example)

`/guides` - Additional wikis for external facing actors and architecture overview

`/tests` - All Javascript tests

`/deployments` - Deployment scripts and cached previous deployments

### Auto-generated

`/abi` - Statically-typed ABI output from wagmi

`/docs` - Foundry-generated documentation

`/node_modules` - Node module output

`/out` - Foundry-generated bytecode and original ABI output

`/cache` - Cache documents (largely Foundry-related)

## Instructions

### Install external dependencies

Requires: node v20+ (recommend v20.12.2 or greater)

Requires: pnpm (recommend v8.15.6)

Requires: forge (recommend v0.2.0) (https://book.getfoundry.sh/getting-started/installation)

Requires: anvil v0.2.0 (if running tests)

```code
pnpm install
```

### General commands

`pnpm build:solidity` - Build from foundry

`pnpm build:abi` - Generate statically-typed ABI

`pnpm build` - Build from foundry and generate statically-typed ABI

`pnpm build:doc` - Build documentation from Foundry.

`pnpm serve:doc` - Start documentation server

`pnpm test` - Run all local tests

`pnpm example-signer` - Run example signer script

`pnpm deploy:contracts` - Run full deploy scripts

`pnpm deploy` - Full build and run deploy scripts
