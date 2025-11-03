import { store, crypto, BigInt, Bytes, log } from '@graphprotocol/graph-ts'
import { Solution, User, SolutionContribution, DependencyContribution } from "../generated/schema"
import {
  Contributed,
  GoalExtended,
  PositionTransferred,
  Refunded,
  SolutionUpdated,
  Split,
  StakeUpdated,
} from "../generated/templates/Solution/Solution"

export function handleContributed(event: Contributed): void {
  let solution = Solution.load(event.address)!;
  solution.shares = event.params.totalShares;
  solution.tokensContributed = event.params.totalContributed;
  solution.save();

  let funder = User.load(event.params.addr);
  if (!funder) {
    funder = new User(event.params.addr);
    funder.save();
  }

  let id = contributionId(event.address, event.params.addr, event.params.positionIndex);
  let contribution = new SolutionContribution(id);
  contribution.solution = event.address;
  contribution.funder = event.params.addr;
  contribution.positionIndex = event.params.positionIndex;
  contribution.contribution = event.params.amount;
  contribution.refunded = false;
  contribution.createdTime = event.block.timestamp;
  contribution.save();

  let dependencyAddresses = event.params.dependencyAddresses;
  let dependencyChainIds = event.params.dependencyChainIds;
  let dependencyAmounts = event.params.dependencyAmounts;
  let dependencyCount = dependencyAddresses.length;

  for (let i = 0; i < dependencyCount; ++i) {
    let depAddress = dependencyAddresses[i];
    let depChainId = dependencyChainIds[i];
    let depAmount = dependencyAmounts[i];
    let dependency = new DependencyContribution(dependencyId(
      contribution.id,
      depChainId,
      depAddress
    ));

    dependency.primaryContribution = contribution.id;
    dependency.dependencyChainId = depChainId;
    dependency.dependencyAddress = depAddress;
    dependency.dependencyAmount = depAmount;

    if (event.params.amount.gt(BigInt.fromI32(0))) {
      dependency.ratioToPrimary = depAmount.toBigDecimal().div(event.params.amount.toBigDecimal());
    } else {
      dependency.ratioToPrimary = BigInt.fromI32(0).toBigDecimal();
    }

    dependency.save();
  }
}

export function handleGoalExtended(event: GoalExtended): void {
  let solution = Solution.load(event.address)!;
  solution.fundingGoal = event.params.goal;
  solution.deadline = event.params.deadline;
  solution.modifiedTime = event.block.timestamp;
  solution.save();
}

export function handlePositionTransferred(event: PositionTransferred): void {
  store.remove('SolutionContribution',
    contributionId(event.address, event.params.sender, event.params.senderPositionIndex).toHexString());

  let recipient = User.load(event.params.recipient);
  if (!recipient) {
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
  recipientPosition.createdTime = BigInt.fromI32(0);
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
  solution.modifiedTime = event.block.timestamp;
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
    c.createdTime = BigInt.fromI32(0);
    c.save();
  }

  let original = new SolutionContribution(
    contributionId(event.address, event.params.addr, event.params.originalPositionIndex));
  original.solution = event.address;
  original.funder = event.params.addr;
  original.positionIndex = event.params.originalPositionIndex;
  original.contribution = event.params.contributionLeftInOriginal;
  original.refunded = false;
  original.createdTime = BigInt.fromI32(0);
  original.save();
}

export function handleStakeUpdated(event: StakeUpdated): void {
  let solution = Solution.load(event.address)!;
  solution.stake = event.params.totalStake;
  solution.sweetness = event.params.totalStake.times(solution.funderReward);
  solution.save();
}

function contributionId(solutionAddress: Bytes, userAddress: Bytes, positionIndex: BigInt): Bytes {
  const concatBytes = solutionAddress.concat(userAddress).concatI32(positionIndex.toI32());
  return Bytes.fromByteArray(crypto.keccak256(concatBytes));
}

function dependencyId(primaryContributionId: Bytes, dependencyChainId: BigInt, dependencyAddress: Bytes): Bytes {
  const concatBytes = primaryContributionId.concatI32(dependencyChainId.toI32()).concat(dependencyAddress);
  return Bytes.fromByteArray(crypto.keccak256(concatBytes));
}
