import { Bytes, BigInt } from "@graphprotocol/graph-ts"

// A struct to hold test case data
export class HexTestCase {
  id: Bytes
  ideaAddress: Bytes
  userAddress: Bytes
  positionIndex: BigInt
  
  constructor(id: Bytes, ideaAddress: Bytes, userAddress: Bytes, positionIndex: BigInt) {
    this.id = id
    this.ideaAddress = ideaAddress
    this.userAddress = userAddress
    this.positionIndex = positionIndex
  }
}

// Create a test case with realistic data
export function createHexTestCase(): HexTestCase {
  // Sample Ethereum addresses
  const ideaAddress = Bytes.fromHexString('0x1234567890123456789012345678901234567890') as Bytes
  const userAddress = Bytes.fromHexString('0xabcdef0123456789abcdef0123456789abcdef01') as Bytes
  const positionIndex = BigInt.fromI32(42)
  
  // Create a sample ID (could be any bytes)
  const id = Bytes.fromHexString('0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890') as Bytes
  
  return new HexTestCase(id, ideaAddress, userAddress, positionIndex)
}
