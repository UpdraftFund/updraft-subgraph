# Subgraph Deployment Guide

This subgraph supports multiple networks using The Graph's `networks.json` configuration approach.

## Network Configuration

The `networks.json` file contains contract addresses and start blocks for different networks:

- **arbitrum-sepolia** (testnet) - Used in the `dev` branch
- **arbitrum-one** (mainnet) - Used in the `main` branch

Each network has two Updraft factory contracts:
- `UpdraftOld` - The original/old factory contract
- `Updraft` - The current contract

## Building for Different Networks

The subgraph uses the `--network` flag to automatically configure addresses and start blocks:

### For Arbitrum Sepolia (Testnet)
```bash
yarn build:arbitrum-sepolia
# or
graph build --network arbitrum-sepolia
```

### For Arbitrum One (Mainnet)
```bash
yarn build:arbitrum
# or
graph build --network arbitrum-one
```

## Deploying

### Deploy to Arbitrum Sepolia
```bash
yarn deploy:arbitrum-sepolia
```

### Deploy to Arbitrum One
```bash
yarn deploy:arbitrum
```

## How It Works

1. **networks.json** - Contains network-specific configuration
2. **subgraph.yaml** - Uses placeholder values that get replaced during build
3. **Build process** - The `graph build --network <name>` command reads from `networks.json` and updates the manifest

For example, when you run `graph build --network arbitrum-one`, it:
- Reads the `arbitrum-one` section from `networks.json`
- Updates the `network` field in `subgraph.yaml` to `arbitrum-one`
- Updates contract addresses and start blocks for `UpdraftOld` and `Updraft` data sources

## Idea Contract Versioning

The subgraph handles two versions of Idea contracts:

### IdeaOld Template
- Uses `abis/IdeaOld.json` (without `isAirdrop` parameter)
- Handles Ideas created by old Updraft factories
- Sets `isAirdrop = false` for all contributions
- Event signature: `Contributed(indexed address,uint256,uint256,uint256,uint256)`

### Idea Template
- Uses `abis/Idea.json` (with `isAirdrop` parameter)
- Handles Ideas created by new Updraft factories
- Reads `isAirdrop` from the event
- Event signature: `Contributed(indexed address,uint256,uint256,uint256,uint256,indexed bool)`

The `src/updraft.ts` handler automatically selects the correct template based on which Updraft contract created the Idea.

## Workflow for Dev → Main Branch Merge

### Current Workflow (Manual)
1. Work in `dev` branch with arbitrum-sepolia configuration
2. Test changes by deploying to testnet
3. Merge `dev` into `main`
4. **Manually update** `subgraph.yaml` in `main` branch to use arbitrum-one
5. Deploy to mainnet

### Recommended Workflow (Using networks.json)
1. Work in `dev` branch
2. Build and test: `yarn build:arbitrum-sepolia && yarn deploy:arbitrum-sepolia`
3. Merge `dev` into `main`
4. **No manual changes needed** - just run: `yarn build:arbitrum && yarn deploy:arbitrum`

The `networks.json` approach eliminates the need to manually update the manifest after merging, since the network configuration is determined at build time using the `--network` flag.

## Contract Addresses

### Arbitrum Sepolia (Testnet)
- Old Updraft: `0xB9eD909cA3c9070B6F6706d6b44396e33dA468a5` (block 157779564)
- New Updraft: `0xf548722c81f36b83690b60109427cc326eebb251` (block 206889580)

### Arbitrum One (Mainnet)
- Old Updraft: `0x08e87242f23904e22da12a392b2facbb56c2959a` (block 345598886)
- New Updraft: `0x09dcf63245cbd0bff3adb3c2ef751d7d0e6b9a0a` (block 391824530)

## Adding a New Network

To add support for a new network:

1. Add the network configuration to `networks.json`:
```json
{
  "new-network": {
    "Updraft": {
      "address": "0x...",
      "startBlock": 123456
    }
  }
}
```

2. Add build and deploy scripts to `package.json`:
```json
{
  "scripts": {
    "build:new-network": "graph build --network new-network",
    "deploy:new-network": "graph deploy ... --network new-network"
  }
}
```

## Testing

Run tests with:
```bash
yarn test
```

Note: Tests use mock events and don't depend on network configuration.

