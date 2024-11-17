import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Contributed,
  PositionTransferred,
  Split,
  Withdrew
} from "../generated/Idea/Idea"

export function createContributedEvent(
  addr: Address,
  positionIndex: BigInt,
  amount: BigInt,
  totalShares: BigInt
): Contributed {
  let contributedEvent = changetype<Contributed>(newMockEvent())

  contributedEvent.parameters = new Array()

  contributedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  contributedEvent.parameters.push(
    new ethereum.EventParam(
      "positionIndex",
      ethereum.Value.fromUnsignedBigInt(positionIndex)
    )
  )
  contributedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  contributedEvent.parameters.push(
    new ethereum.EventParam(
      "totalShares",
      ethereum.Value.fromUnsignedBigInt(totalShares)
    )
  )

  return contributedEvent
}

export function createPositionTransferredEvent(
  sender: Address,
  recipient: Address,
  senderPositionIndex: BigInt,
  recipientPositionIndex: BigInt
): PositionTransferred {
  let positionTransferredEvent = changetype<PositionTransferred>(newMockEvent())

  positionTransferredEvent.parameters = new Array()

  positionTransferredEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  positionTransferredEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  positionTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "senderPositionIndex",
      ethereum.Value.fromUnsignedBigInt(senderPositionIndex)
    )
  )
  positionTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "recipientPositionIndex",
      ethereum.Value.fromUnsignedBigInt(recipientPositionIndex)
    )
  )

  return positionTransferredEvent
}

export function createSplitEvent(
  addr: Address,
  originalPositionIndex: BigInt,
  numNewPositions: BigInt,
  firstNewPositionIndex: BigInt,
  amountPerNewPosition: BigInt
): Split {
  let splitEvent = changetype<Split>(newMockEvent())

  splitEvent.parameters = new Array()

  splitEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  splitEvent.parameters.push(
    new ethereum.EventParam(
      "originalPositionIndex",
      ethereum.Value.fromUnsignedBigInt(originalPositionIndex)
    )
  )
  splitEvent.parameters.push(
    new ethereum.EventParam(
      "numNewPositions",
      ethereum.Value.fromUnsignedBigInt(numNewPositions)
    )
  )
  splitEvent.parameters.push(
    new ethereum.EventParam(
      "firstNewPositionIndex",
      ethereum.Value.fromUnsignedBigInt(firstNewPositionIndex)
    )
  )
  splitEvent.parameters.push(
    new ethereum.EventParam(
      "amountPerNewPosition",
      ethereum.Value.fromUnsignedBigInt(amountPerNewPosition)
    )
  )

  return splitEvent
}

export function createWithdrewEvent(
  addr: Address,
  positionIndex: BigInt,
  amount: BigInt,
  shares: BigInt,
  totalShares: BigInt
): Withdrew {
  let withdrewEvent = changetype<Withdrew>(newMockEvent())

  withdrewEvent.parameters = new Array()

  withdrewEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  withdrewEvent.parameters.push(
    new ethereum.EventParam(
      "positionIndex",
      ethereum.Value.fromUnsignedBigInt(positionIndex)
    )
  )
  withdrewEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrewEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  withdrewEvent.parameters.push(
    new ethereum.EventParam(
      "totalShares",
      ethereum.Value.fromUnsignedBigInt(totalShares)
    )
  )

  return withdrewEvent
}
