import { crypto, BigInt, Bytes } from "@graphprotocol/graph-ts";

import {
  Contributed as ContributedEvent,
  FeesCollected as FeesCollectedEvent,
  FundsWithdrawn as FundsWithdrawnEvent,
  GoalExtended as GoalExtendedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PositionTransferred as PositionTransferredEvent,
  Refunded as RefundedEvent,
  SolutionUpdated as SolutionUpdatedEvent,
  Split as SplitEvent,
  StakeUpdated as StakeUpdatedEvent,
  StakeTransferred as StakeTransferredEvent,
} from "../generated/templates/Solution/Solution"
import {
  SolutionContributed,
  FeesCollected,
  FundsWithdrawn,
  GoalExtended,
  OwnershipTransferred,
  PositionTransferred,
  Refunded,
  SolutionUpdated,
  Split,
  Stake,
} from "../generated/schema"

export function handleContributed(event: ContributedEvent): void {
  let entity = new SolutionContributed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.addr = event.params.addr
  entity.positionIndex = event.params.positionIndex
  entity.amount = event.params.amount
  entity.totalTokens = event.params.totalTokens
  entity.totalShares = event.params.totalShares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeesCollected(event: FeesCollectedEvent): void {
  let entity = new FeesCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.addr = event.params.addr
  entity.positionIndex = event.params.positionIndex
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundsWithdrawn(event: FundsWithdrawnEvent): void {
  let entity = new FundsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGoalExtended(event: GoalExtendedEvent): void {
  let entity = new GoalExtended(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.goal = event.params.goal
  entity.deadline = event.params.deadline

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePositionTransferred(
  event: PositionTransferredEvent,
): void {
  let entity = new PositionTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.senderPositionIndex = event.params.senderPositionIndex
  entity.recipientPositionIndex = event.params.recipientPositionIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRefunded(event: RefundedEvent): void {
  let entity = new Refunded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.addr = event.params.addr
  entity.amount = event.params.amount
  entity.stakeCollected = event.params.stakeCollected

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSolutionUpdated(event: SolutionUpdatedEvent): void {
  let entity = new SolutionUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSplit(event: SplitEvent): void {
  let entity = new Split(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.addr = event.params.addr
  entity.originalPositionIndex = event.params.originalPositionIndex
  entity.numNewPositions = event.params.numNewPositions
  entity.firstNewPositionIndex = event.params.firstNewPositionIndex
  entity.contributionPerNewPosition = event.params.contributionPerNewPosition

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakeUpdated(event: StakeUpdatedEvent): void {
  let stake = new Stake(stakeId(event.address, event.params.addr));
  stake.user = event.params.addr;
  stake.solution = event.address;
  stake.amount = event.params.stake;
  stake.save();
}

export function handleStakeTransferred(event: StakeTransferredEvent): void {
  let stakeFrom = new Stake(stakeId(event.address, event.params.from));
  stakeFrom.user = event.params.from;
  stakeFrom.solution = event.address;
  stakeFrom.amount = BigInt.zero();
  stakeFrom.save();

  let stakeTo = new Stake(stakeId(event.address, event.params.to));
  stakeTo.user = event.params.to;
  stakeTo.solution = event.address;
  stakeTo.amount = event.params.newStake;
  stakeTo.save();
}

function stakeId(solutionAddress: Bytes, userAddress: Bytes): Bytes {
  const stakeBytes = Bytes.fromUTF8("stake");
  const concatBytes = stakeBytes.concat(solutionAddress).concat(userAddress);
  return Bytes.fromByteArray(crypto.keccak256(concatBytes));
}
