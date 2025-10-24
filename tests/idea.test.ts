import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Contributed } from "../generated/schema"
import { Contributed as ContributedEvent } from "../generated/Idea/Idea"
import { handleContributed } from "../src/idea"
import { createContributedEvent } from "./idea-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let positionIndex = BigInt.fromI32(234)
    let amount = BigInt.fromI32(234)
    let totalShares = BigInt.fromI32(234)
    let totalTokens = BigInt.fromI32(234)
    let isAirdrop = false
    let newContributedEvent = createContributedEvent(
      addr,
      positionIndex,
      amount,
      totalShares,
      totalTokens,
      isAirdrop
    )
    handleContributed(newContributedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Contributed created and stored", () => {
    assert.entityCount("Contributed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Contributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Contributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "positionIndex",
      "234"
    )
    assert.fieldEquals(
      "Contributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Contributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalShares",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
