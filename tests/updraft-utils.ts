import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  IdeaCreated,
  OwnershipTransferred,
  ProfileUpdated,
  SolutionCreated
} from "../generated/Updraft/Updraft"

export function createIdeaCreatedEvent(
  idea: Address,
  creator: Address,
  contributorFee: BigInt,
  contribution: BigInt,
  data: Bytes
): IdeaCreated {
  let ideaCreatedEvent = changetype<IdeaCreated>(newMockEvent())

  ideaCreatedEvent.parameters = new Array()

  ideaCreatedEvent.parameters.push(
    new ethereum.EventParam("idea", ethereum.Value.fromAddress(idea))
  )
  ideaCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  ideaCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contributorFee",
      ethereum.Value.fromUnsignedBigInt(contributorFee)
    )
  )
  ideaCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contribution",
      ethereum.Value.fromUnsignedBigInt(contribution)
    )
  )
  ideaCreatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return ideaCreatedEvent
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

export function createProfileUpdatedEvent(
  owner: Address,
  data: Bytes
): ProfileUpdated {
  let profileUpdatedEvent = changetype<ProfileUpdated>(newMockEvent())

  profileUpdatedEvent.parameters = new Array()

  profileUpdatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  profileUpdatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return profileUpdatedEvent
}

export function createSolutionCreatedEvent(
  solution: Address,
  creator: Address,
  idea: Address,
  fundingToken: Address,
  stake: BigInt,
  goal: BigInt,
  deadline: BigInt,
  contributorFee: BigInt,
  data: Bytes
): SolutionCreated {
  let solutionCreatedEvent = changetype<SolutionCreated>(newMockEvent())

  solutionCreatedEvent.parameters = new Array()

  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam("solution", ethereum.Value.fromAddress(solution))
  )
  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam("idea", ethereum.Value.fromAddress(idea))
  )
  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "fundingToken",
      ethereum.Value.fromAddress(fundingToken)
    )
  )
  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam("stake", ethereum.Value.fromUnsignedBigInt(stake))
  )
  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam("goal", ethereum.Value.fromUnsignedBigInt(goal))
  )
  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )
  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contributorFee",
      ethereum.Value.fromUnsignedBigInt(contributorFee)
    )
  )
  solutionCreatedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return solutionCreatedEvent
}
