import { store, crypto, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { Contributed, PositionTransferred, Split, Withdrew } from "../generated/templates/Idea/Idea"
import { Idea, User, IdeaContribution } from "../generated/schema"

export function handleContributed(event: Contributed): void {
  let idea = Idea.load(event.address)!;
  idea.shares = event.params.totalShares;
  idea.save();

  let funder = User.load(event.params.addr);
  if (!funder) {
    funder = new User(event.params.addr);
    funder.save();
  }

  let contribution = new IdeaContribution(
    contributionId(event.address, event.params.addr, event.params.positionIndex));
  contribution.idea = event.address;
  contribution.funder = event.params.addr;
  contribution.positionIndex = event.params.positionIndex;
  contribution.contribution = event.params.amount;
  contribution.save();
}

export function handlePositionTransferred(event: PositionTransferred,): void {
  store.remove('IdeaContribution',
    contributionId(event.address, event.params.sender, event.params.senderPositionIndex).toHex());

  let recipient = User.load(event.params.recipient);
  if (!recipient) {
    recipient = new User(event.params.recipient);
    recipient.save();
  }

  let recipientPosition = new IdeaContribution(
    contributionId(event.address, event.params.recipient, event.params.recipientPositionIndex));
  recipientPosition.idea = event.address;
  recipientPosition.funder = event.params.recipient;
  recipientPosition.positionIndex = event.params.recipientPositionIndex;
  recipientPosition.contribution = event.params.contribution;
  recipientPosition.save();
}

export function handleSplit(event: Split): void {
  let start = event.params.firstNewPositionIndex.toI32();
  let end = event.params.numNewPositions.toI32() + start;

  // Loop using i32 values
  for (let i = start; i < end; ++i) {
    let positionIndex = BigInt.fromI32(i);
    let contribution = new IdeaContribution(contributionId(event.address, event.params.addr, positionIndex));
    contribution.idea = event.address;
    contribution.funder = event.params.addr;
    contribution.positionIndex = positionIndex;
    contribution.contribution = event.params.contributionPerNewPosition;
    contribution.save();
  }

  let original = new IdeaContribution(
    contributionId(event.address, event.params.addr, event.params.originalPositionIndex));
  original.idea = event.address;
  original.funder = event.params.addr;
  original.positionIndex = event.params.originalPositionIndex;
  original.contribution = event.params.contributionLeftInOriginal;
  original.save();
}

export function handleWithdrew(event: Withdrew): void {
  let idea = Idea.load(event.address)!;
  idea.shares = event.params.totalShares;
  idea.save();

  store.remove('IdeaContribution',
    contributionId(event.address, event.params.addr, event.params.positionIndex).toHex());
}

function contributionId(ideaAddress: Bytes, userAddress: Bytes, positionIndex: BigInt): Bytes {
  const concatBytes = ideaAddress.concat(userAddress).concatI32(positionIndex.toI32());
  return Bytes.fromByteArray(crypto.keccak256(concatBytes));
}
