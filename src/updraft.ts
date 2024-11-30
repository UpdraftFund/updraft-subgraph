import { BigInt, Bytes, JSONValue, json, log } from "@graphprotocol/graph-ts"
import { IdeaCreated, ProfileUpdated, SolutionCreated} from "../generated/Updraft/Updraft"
import { User, Idea, Solution } from "../generated/schema"
import { Idea as IdeaTemplate, Solution as SolutionTemplate } from '../generated/templates'

export function handleIdeaCreated(event: IdeaCreated): void {
  let idea = new Idea(event.params.idea);

  // Parse the JSON data from the bytes blob
  let jsonData = json.fromBytes(event.params.data as Bytes).toObject();

  // Extract the name if it exists
  let name = jsonData.get("name");
  if (name) {
    idea.name = name.toString();
  }

  // Extract the description if it exists
  let description = jsonData.get("description");
  if (description) {
    idea.description = description.toString();
  }

  // Extract the tags array if it exists
  let tags = jsonData.get("tags");
  if (tags) {
    idea.tags = tags.toArray().map<string>((value: JSONValue) => value.toString());
  }

  idea.creator = event.params.creator;
  idea.shares = event.params.contribution;
  idea.startTime = event.block.timestamp;
  idea.save();

  // Create a template instance to handle events from the new Idea contract
  IdeaTemplate.create(event.params.idea);
}

export function handleProfileUpdated(event: ProfileUpdated): void {
  let user = new User(event.params.owner);
  user.profile = event.params.data;
  user.save()
}

export function handleSolutionCreated(event: SolutionCreated): void {
  let solution = new Solution(event.params.solution)

  let idea = Idea.load(event.params.idea);
  if (idea === null) {
    log.error("Idea entity not found: {}", [event.params.idea.toString()]);
    return;
  }

  let drafter = User.load(event.params.creator);
  if (drafter == null) {
    drafter = new User(event.params.creator);
    drafter.save();
  }

  solution.idea = event.params.idea;
  solution.drafter = event.params.creator;
  solution.fundingToken = event.params.fundingToken;
  solution.startTime = event.block.timestamp;
  solution.deadline = event.params.deadline;
  solution.shares = BigInt.zero();
  solution.tokensContributed = BigInt.zero();
  solution.fundingGoal = event.params.goal;
  solution.stake = event.params.stake;
  solution.info = event.params.data;
  solution.save();

  // Create a template instance to handle events from the new Solution contract
  SolutionTemplate.create(event.params.solution);
}
