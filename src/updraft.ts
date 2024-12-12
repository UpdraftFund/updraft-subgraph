import { BigInt, Bytes, JSONValue, json, JSONValueKind, log } from "@graphprotocol/graph-ts"
import { IdeaCreated, ProfileUpdated, SolutionCreated} from "../generated/Updraft/Updraft"
import { User, Idea, Solution, TagCount } from "../generated/schema"
import { Idea as IdeaTemplate, Solution as SolutionTemplate } from '../generated/templates'

export function handleIdeaCreated(event: IdeaCreated): void {
  let idea = new Idea(event.params.idea);

  // Parse the JSON data from the bytes blob
  let result = json.try_fromBytes(event.params.data as Bytes);
  if (result.isOk && result.value.kind === JSONValueKind.OBJECT) {
    let jsonData = result.value.toObject();

    // Extract the name if it's a string
    let name = jsonData.get("name");
    if (name && name.kind === JSONValueKind.STRING) {
      idea.name = name.toString();
    }

    // Extract the description if it's a string
    let description = jsonData.get("description");
    if (description && description.kind === JSONValueKind.STRING) {
      idea.description = description.toString();
    }

    // Extract the tags if it's an array of strings
    let tags = jsonData.get("tags");
    if (tags && tags.kind === JSONValueKind.ARRAY) {
      const tagArray = tags.toArray()
        .filter(tag => tag.kind === JSONValueKind.STRING)
        .map<string>(tag => tag.toString());

      if(tagArray){
        idea.tags = tagArray;

        for (let i = 0; i < tagArray.length; ++i){
          let tag = tagArray[i];
          let tagCount = TagCount.load(tag);
          if (tagCount) {
            tagCount.count += 1;
          } else {
            tagCount = new TagCount(tag);
            tagCount.count = 1;
          }
          tagCount.save();
        }
      }
    }
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
  if (!idea) {
    log.warning("Idea entity not found: {} , Solution: {} not created", [
      event.params.idea.toString(),
      event.params.solution.toString()
    ]);
    return;
  }

  let drafter = User.load(event.params.creator);
  if (!drafter) {
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
