# Hex Methods Test

This directory contains tests that demonstrate the difference between `.toHex()` and `.toHexString()` methods in The Graph's AssemblyScript API and how this difference can cause issues with entity removal.

## Files

- `hex-methods.test.ts` - AssemblyScript test for The Graph's matchstick testing framework
- `hex-methods-utils.ts` - Utility functions for the AssemblyScript test
- `hex-methods-demo.js` - JavaScript demonstration that can be run directly with Node.js

## The Issue

When working with the Graph Protocol, there are two methods to convert a `Bytes` object to a hex string:

1. **`.toHex()`** - Returns a hex string **without** the `0x` prefix
   - Example: `abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890`

2. **`.toHexString()`** - Returns a hex string **with** the `0x` prefix
   - Example: `0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890`

This difference can cause issues when:
- Creating entities with one format
- Trying to remove entities with the other format

## Running the Tests

### JavaScript Demonstration

To run the JavaScript demonstration, simply use Node.js:

```bash
node tests/hex-methods-demo.js
```

This will show a clear example of how using different hex methods can cause entities to not be found when trying to remove them.

### AssemblyScript Test

The AssemblyScript test is part of the standard Graph Protocol test suite and can be run with the Graph CLI:

```bash
graph test
```

## Solution

To avoid issues with entity removal, always use the same method consistently throughout your codebase. The recommended approach is to use `.toHexString()` for all entity ID operations, as this is the format used by The Graph's internal code.

In the subgraph code, we've updated all `store.remove()` calls to use `.toHexString()` instead of `.toHex()` to ensure consistency.
