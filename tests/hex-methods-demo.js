/**
 * This is a JavaScript demonstration of the difference between toHex() and toHexString()
 * in The Graph's AssemblyScript API.
 *
 * To run this demonstration:
 * node tests/hex-methods-demo.js
 *
 * This test demonstrates why idea contributions weren't being removed from the graph.
 */

// Mock implementation of Bytes class with toHex and toHexString methods
class MockBytes {
  constructor(hexValue) {
    this.value = hexValue;
  }

  // Simulates toHex() - returns hex without 0x prefix
  toHex() {
    // Remove 0x prefix if it exists
    return this.value.startsWith('0x') ? this.value.slice(2) : this.value;
  }

  // Simulates toHexString() - returns hex with 0x prefix
  toHexString() {
    // Ensure 0x prefix
    return this.value.startsWith('0x') ? this.value : `0x${this.value}`;
  }
}

// Simulate a realistic contribution ID
const mockContributionId = new MockBytes('0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890');

console.log('Demonstration of toHex() vs toHexString() difference:');
console.log('Original ID:', mockContributionId.value);
console.log('ID with toHex():', mockContributionId.toHex());
console.log('ID with toHexString():', mockContributionId.toHexString());

// Simulate store operations
console.log('\nSimulating store operations:');

// Mock store with entities
const mockStore = {
  entities: {},

  // Add entity with ID
  add(entityType, id, entity) {
    if (!this.entities[entityType]) {
      this.entities[entityType] = {};
    }
    this.entities[entityType][id] = entity;
    console.log(`Added ${entityType} with ID: ${id}`);
  },

  // Remove entity with ID
  remove(entityType, id) {
    if (this.entities[entityType] && this.entities[entityType][id]) {
      delete this.entities[entityType][id];
      console.log(`Removed ${entityType} with ID: ${id}`);
      return true;
    } else {
      console.log(`Failed to remove: ${entityType} with ID: ${id} not found!`);
      return false;
    }
  },

  // Show all entities
  showEntities() {
    console.log('\nCurrent store contents:');
    for (const entityType in this.entities) {
      console.log(`${entityType}:`, Object.keys(this.entities[entityType]));
    }
  }
};

// Scenario 1: Create with ID from toHexString, try to remove with both methods
console.log('\n--- Scenario 1: Create with toHexString, remove with both methods ---');
const idWithHexString = mockContributionId.toHexString();
mockStore.add('IdeaContribution', idWithHexString, { data: 'Contribution data' });
mockStore.showEntities();

console.log('\nTrying to remove with toHex():');
const removeWithHexResult = mockStore.remove('IdeaContribution', mockContributionId.toHex());
mockStore.showEntities();

console.log('\nTrying to remove with toHexString():');
const removeWithHexStringResult = mockStore.remove('IdeaContribution', mockContributionId.toHexString());
mockStore.showEntities();

// Scenario 2: Create with ID from toHex, try to remove with both methods
console.log('\n--- Scenario 2: Create with toHex, remove with both methods ---');
mockStore.entities = {}; // Reset store
const idWithHex = mockContributionId.toHex();
mockStore.add('IdeaContribution', idWithHex, { data: 'Contribution data' });
mockStore.showEntities();

console.log('\nTrying to remove with toHexString():');
const removeWithHexStringResult2 = mockStore.remove('IdeaContribution', mockContributionId.toHexString());
mockStore.showEntities();

console.log('\nTrying to remove with toHex():');
const removeWithHexResult2 = mockStore.remove('IdeaContribution', mockContributionId.toHex());
mockStore.showEntities();

// Conclusion
console.log('\n--- Conclusion ---');
console.log('This demonstrates why using different hex conversion methods can cause issues:');
console.log('1. toHex() returns:', mockContributionId.toHex(), '(without 0x prefix)');
console.log('2. toHexString() returns:', mockContributionId.toHexString(), '(with 0x prefix)');
console.log('\nIf your subgraph creates entities with one format but tries to remove them with');
console.log('the other format, the entities won\'t be found and won\'t be removed from the store.');

console.log('\n--- Fix Applied to Codebase ---');
console.log('We updated the following files to use toHexString() consistently:');
console.log('1. src/idea.ts - Changed store.remove() calls to use .toHexString()');
console.log('2. src/solution.ts - Changed store.remove() calls to use .toHexString()');
console.log('\nThis ensures that entity IDs are consistent when creating and removing entities.');
console.log('Idea contributions should now be properly removed from the graph.');
