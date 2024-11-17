import {
  Contributed as ContributedEvent,
  PositionTransferred as PositionTransferredEvent,
  Split as SplitEvent,
  Withdrew as WithdrewEvent,
} from "../generated/Idea/Idea"
import {
  Contributed,
  PositionTransferred,
  Split,
  Withdrew,
} from "../generated/schema"

export function handleContributed(event: ContributedEvent): void {
  let entity = new Contributed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.addr = event.params.addr
  entity.positionIndex = event.params.positionIndex
  entity.amount = event.params.amount
  entity.totalShares = event.params.totalShares

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

export function handleSplit(event: SplitEvent): void {
  let entity = new Split(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.addr = event.params.addr
  entity.originalPositionIndex = event.params.originalPositionIndex
  entity.numNewPositions = event.params.numNewPositions
  entity.firstNewPositionIndex = event.params.firstNewPositionIndex
  entity.amountPerNewPosition = event.params.amountPerNewPosition

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrew(event: WithdrewEvent): void {
  let entity = new Withdrew(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.addr = event.params.addr
  entity.positionIndex = event.params.positionIndex
  entity.amount = event.params.amount
  entity.shares = event.params.shares
  entity.totalShares = event.params.totalShares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
