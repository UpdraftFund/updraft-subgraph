import { store, crypto, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { Solution, User, SolutionContribution, Stake } from "../generated/schema"
import {
  Contributed,
  GoalExtended,
  PositionTransferred,
  Refunded,
  SolutionUpdated,
  Split,
  StakeUpdated,
  StakeTransferred,
} from "../generated/templates/Solution/Solution"

export function handleContributed(event: Contributed): void {
  let solution = Solution.load(event.address)!;
  solution.shares = event.params.totalShares;
  solution.save();

  let funder = User.load(event.params.addr);
  if (funder == null) {
    funder = new User(event.params.addr);
    funder.save();
  }

  let contribution = new SolutionContribution(
    contributionId(event.address, event.params.addr, event.params.positionIndex));
  contribution.solution = event.address;
  contribution.funder = event.params.addr;
  contribution.positionIndex = event.params.positionIndex;
  contribution.contribution = event.params.amount;
  contribution.refunded = false;
  contribution.save();
}

export function handleGoalExtended(event: GoalExtended): void {
  let solution = Solution.load(event.address)!;
  solution.fundingGoal = event.params.goal;
  solution.deadline = event.params.deadline;
  solution.save();
}

export function handlePositionTransferred(event: PositionTransferred): void {
  store.remove('SolutionContribution',
    contributionId(event.address, event.params.sender, event.params.senderPositionIndex).toHex());

  let recipient = User.load(event.params.recipient);
  if (recipient == null) {
    recipient = new User(event.params.recipient);
    recipient.save();
  }

  let recipientPosition = new SolutionContribution(
    contributionId(event.address, event.params.recipient, event.params.recipientPositionIndex));
  recipientPosition.solution = event.address;
  recipientPosition.funder = event.params.recipient;
  recipientPosition.positionIndex = event.params.recipientPositionIndex;
  recipientPosition.contribution = event.params.contribution;
  recipientPosition.refunded = false;
  recipientPosition.save();
}

export function handleRefunded(event: Refunded): void {
  let contribution = SolutionContribution.load(
    contributionId(event.address, event.params.addr, event.params.positionIndex))!;
  contribution.refunded = true;
  contribution.save();
}

export function handleSolutionUpdated(event: SolutionUpdated): void {
  let solution = Solution.load(event.address)!;
  solution.info = event.params.data;
  solution.save();
}

export function handleSplit(event: Split): void {
  let start = event.params.firstNewPositionIndex.toI32();
  let end = event.params.numNewPositions.toI32() + start;

  // Loop using i32 values
  for (let i = start; i < end; ++i) {
    let positionIndex = BigInt.fromI32(i);
    let c = new SolutionContribution(contributionId(event.address, event.params.addr, positionIndex));
    c.solution = event.address;
    c.funder = event.params.addr;
    c.positionIndex = positionIndex;
    c.contribution = event.params.contributionPerNewPosition;
    c.refunded = false;
    c.save();
  }

  let original = new SolutionContribution(
    contributionId(event.address, event.params.addr, event.params.originalPositionIndex));
  original.solution = event.address;
  original.funder = event.params.addr;
  original.positionIndex = event.params.originalPositionIndex;
  original.contribution = event.params.contributionLeftInOriginal;
  original.refunded = false;
  original.save();
}

export function handleStakeUpdated(event: StakeUpdated): void {
  let solution = Solution.load(event.address)!;
  solution.stake = event.params.totalStake;
  solution.save();

  let staker = User.load(event.params.addr);
  if (staker == null) {
    staker = new User(event.params.addr);
    staker.save();
  }

  let stake = new Stake(stakeId(event.address, event.params.addr));
  stake.staker = event.params.addr;
  stake.solution = event.address;
  stake.amount = event.params.stake;
  stake.save();
}

export function handleStakeTransferred(event: StakeTransferred): void {
  store.remove('Stake', stakeId(event.address, event.params.from).toHex());

  let staker = User.load(event.params.to);
  if (staker == null) {
    staker = new User(event.params.to);
    staker.save();
  }

  let stakeTo = new Stake(stakeId(event.address, event.params.to));
  stakeTo.staker = event.params.to;
  stakeTo.solution = event.address;
  stakeTo.amount = event.params.newStake;
  stakeTo.save();
}

function contributionId(solutionAddress: Bytes, userAddress: Bytes, positionIndex: BigInt): Bytes {
  const concatBytes = solutionAddress.concat(userAddress).concatI32(positionIndex.toI32());
  return Bytes.fromByteArray(crypto.keccak256(concatBytes));
}

function stakeId(solutionAddress: Bytes, userAddress: Bytes): Bytes {
  const concatBytes = solutionAddress.concat(userAddress);
  return Bytes.fromByteArray(crypto.keccak256(concatBytes));
}
