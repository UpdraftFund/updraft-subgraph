import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Contributed,
  FeesCollected,
  FundsWithdrawn,
  GoalExtended,
  OwnershipTransferred,
  PositionTransferred,
  Refunded,
  SolutionUpdated,
  Split,
  StakeAdded,
  StakeRemoved
} from "../generated/Solution/Solution"

export function createContributedEvent(
  addr: Address,
  positionIndex: BigInt,
  amount: BigInt,
  totalTokensContributed: BigInt,
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
      "totalTokensContributed",
      ethereum.Value.fromUnsignedBigInt(totalTokensContributed)
    )
  )
  contributedEvent.parameters.push(
    new ethereum.EventParam(
      "totalShares",
      ethereum.Value.fromUnsignedBigInt(totalShares)
    )
  )

  return contributedEvent
}

export function createFeesCollectedEvent(
  addr: Address,
  positionIndex: BigInt,
  amount: BigInt
): FeesCollected {
  let feesCollectedEvent = changetype<FeesCollected>(newMockEvent())

  feesCollectedEvent.parameters = new Array()

  feesCollectedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  feesCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "positionIndex",
      ethereum.Value.fromUnsignedBigInt(positionIndex)
    )
  )
  feesCollectedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feesCollectedEvent
}

export function createFundsWithdrawnEvent(
  to: Address,
  amount: BigInt
): FundsWithdrawn {
  let fundsWithdrawnEvent = changetype<FundsWithdrawn>(newMockEvent())

  fundsWithdrawnEvent.parameters = new Array()

  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundsWithdrawnEvent
}

export function createGoalExtendedEvent(
  goal: BigInt,
  deadline: BigInt
): GoalExtended {
  let goalExtendedEvent = changetype<GoalExtended>(newMockEvent())

  goalExtendedEvent.parameters = new Array()

  goalExtendedEvent.parameters.push(
    new ethereum.EventParam("goal", ethereum.Value.fromUnsignedBigInt(goal))
  )
  goalExtendedEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return goalExtendedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
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

export function createRefundedEvent(
  addr: Address,
  amount: BigInt,
  stakeAwarded: BigInt
): Refunded {
  let refundedEvent = changetype<Refunded>(newMockEvent())

  refundedEvent.parameters = new Array()

  refundedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  refundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  refundedEvent.parameters.push(
    new ethereum.EventParam(
      "stakeAwarded",
      ethereum.Value.fromUnsignedBigInt(stakeAwarded)
    )
  )

  return refundedEvent
}

export function createSolutionUpdatedEvent(data: Bytes): SolutionUpdated {
  let solutionUpdatedEvent = changetype<SolutionUpdated>(newMockEvent())

  solutionUpdatedEvent.parameters = new Array()

  solutionUpdatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return solutionUpdatedEvent
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

export function createStakeAddedEvent(
  addr: Address,
  amount: BigInt,
  totalStake: BigInt
): StakeAdded {
  let stakeAddedEvent = changetype<StakeAdded>(newMockEvent())

  stakeAddedEvent.parameters = new Array()

  stakeAddedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  stakeAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stakeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "totalStake",
      ethereum.Value.fromUnsignedBigInt(totalStake)
    )
  )

  return stakeAddedEvent
}

export function createStakeRemovedEvent(
  addr: Address,
  amount: BigInt,
  totalStake: BigInt
): StakeRemoved {
  let stakeRemovedEvent = changetype<StakeRemoved>(newMockEvent())

  stakeRemovedEvent.parameters = new Array()

  stakeRemovedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  stakeRemovedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stakeRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "totalStake",
      ethereum.Value.fromUnsignedBigInt(totalStake)
    )
  )

  return stakeRemovedEvent
}
