import {
  assert,
  describe,
  test,
  log
} from "matchstick-as/assembly/index"
import { Bytes, crypto, BigInt } from "@graphprotocol/graph-ts"
import { createHexTestCase } from "./hex-methods-utils"

// Test to demonstrate the difference between toHex() and toHexString()
describe("Hex Methods Comparison", () => {
  test("toHex() and toHexString() produce different results", () => {
    // Create a test case with realistic addresses
    const testCase = createHexTestCase()
    
    // Get the results from both methods
    const hexResult = testCase.id.toHex()
    const hexStringResult = testCase.id.toHexString()
    
    // Log the results for inspection
    log.info("Original bytes length: {}", [testCase.id.length.toString()])
    log.info("toHex() result: {}", [hexResult])
    log.info("toHexString() result: {}", [hexStringResult])
    
    // Assert that they are different
    assert.assertNotEquals(hexResult, hexStringResult)
    
    // Check if the difference is just the 0x prefix
    if (hexStringResult.startsWith("0x")) {
      log.info("toHexString() adds 0x prefix, while toHex() does not", [])
      assert.assertTrue(hexStringResult.slice(2) == hexResult)
    }
    
    // Demonstrate the issue with store operations
    log.info("When creating entity: new Entity(id)", [])
    log.info("When removing with toHex(): store.remove('Entity', id.toHex())", [])
    log.info("When removing with toHexString(): store.remove('Entity', id.toHexString())", [])
    
    // Explain the issue
    log.warning("ISSUE: The entity created with ID from Bytes will not be found when removing with the wrong hex method!", [])
  })
  
  test("Simulating the issue with contribution IDs", () => {
    // Create a test case with realistic addresses
    const testCase = createHexTestCase()
    
    // Simulate the contributionId function from idea.ts
    const ideaAddress = testCase.ideaAddress
    const userAddress = testCase.userAddress
    const positionIndex = testCase.positionIndex
    
    // Create the ID using the same logic as in the codebase
    const concatBytes = ideaAddress.concat(userAddress).concatI32(positionIndex.toI32())
    const id = Bytes.fromByteArray(crypto.keccak256(concatBytes))
    
    // Log the ID with both methods
    log.info("Contribution ID with toHex(): {}", [id.toHex()])
    log.info("Contribution ID with toHexString(): {}", [id.toHexString()])
    
    // Simulate store operations
    log.info("Creating entity: new IdeaContribution(id)", [])
    log.info("Removing with toHex(): store.remove('IdeaContribution', id.toHex())", [])
    log.info("Removing with toHexString(): store.remove('IdeaContribution', id.toHexString())", [])
    
    // Assert that they are different
    assert.assertNotEquals(id.toHex(), id.toHexString())
    
    // Explain the solution
    log.info("SOLUTION: Always use the same method consistently (toHexString() recommended)", [])
  })
})
