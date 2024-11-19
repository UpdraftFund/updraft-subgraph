import {
  IdeaCreated as IdeaCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProfileUpdated as ProfileUpdatedEvent,
  SolutionCreated as SolutionCreatedEvent
} from "../generated/Updraft/Updraft"
import {
  IdeaCreated,
  OwnershipTransferred,
  SolutionCreated,
  User
} from "../generated/schema"
import {
  Idea,
  Solution
} from '../generated/templates'

export function handleIdeaCreated(event: IdeaCreatedEvent): void {
  let entity = new IdeaCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.idea = event.params.idea
  entity.creator = event.params.creator
  entity.contributorFee = event.params.contributorFee
  entity.contribution = event.params.contribution
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  Idea.create(event.params.idea);
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProfileUpdated(event: ProfileUpdatedEvent): void {
  let user = new User(event.params.owner);
  user.profile = event.params.data;
  user.save()
}

export function handleSolutionCreated(event: SolutionCreatedEvent): void {
  let entity = new SolutionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.solution = event.params.solution
  entity.creator = event.params.creator
  entity.idea = event.params.idea
  entity.fundingToken = event.params.fundingToken
  entity.stake = event.params.stake
  entity.goal = event.params.goal
  entity.deadline = event.params.deadline
  entity.contributorFee = event.params.contributorFee
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  Solution.create(event.params.solution);
}
