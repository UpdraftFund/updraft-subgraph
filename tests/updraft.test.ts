import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { IdeaCreated } from "../generated/schema"
import { IdeaCreated as IdeaCreatedEvent } from "../generated/Updraft/Updraft"
import { handleIdeaCreated } from "../src/updraft"
import { createIdeaCreatedEvent } from "./updraft-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let idea = Address.fromString("0x0000000000000000000000000000000000000001")
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let contributorFee = BigInt.fromI32(234)
    let contribution = BigInt.fromI32(234)
    let data = Bytes.fromI32(1234567890)
    let newIdeaCreatedEvent = createIdeaCreatedEvent(
      idea,
      creator,
      contributorFee,
      contribution,
      data
    )
    handleIdeaCreated(newIdeaCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("IdeaCreated created and stored", () => {
    assert.entityCount("IdeaCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "IdeaCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "idea",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "IdeaCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "IdeaCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contributorFee",
      "234"
    )
    assert.fieldEquals(
      "IdeaCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contribution",
      "234"
    )
    assert.fieldEquals(
      "IdeaCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
