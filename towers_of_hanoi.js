const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.towers = [[3, 2, 1], [], []];
  }

  run(completionCallback) {
    if (this.isWon()) { return completionCallback(); }
    else {
      this.promptMove(completionCallback, (startTowerIdx, endTowerIdx) => {
        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      });
    }
  }

  promptMove(completionCallback, moveTowers) {
    // 1. prints the stacks
    this.printStacks();
    // 2. asks the user where to move. store the results in startTowerIdx and endTowerIdx
    reader.question('Choose start tower: ', startTowerIdx => {
      reader.question('Choose end tower: ', endTowerIdx => {
        if (this.isValidMove(startTowerIdx - 1, endTowerIdx - 1)) {
          moveTowers(startTowerIdx - 1, endTowerIdx - 1);
        }
        this.run(completionCallback);
      });
    });
    // 3. pass these to a callback that performs the move
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    if (![0, 1, 2].includes(startTowerIdx) || ![0, 1, 2].includes(endTowerIdx)) {
      console.log("Invalid move!");
      return false;
    }
    else if (this.towers[endTowerIdx].length === 0) { return true; }
    else if (!this.towers[startTowerIdx].length) {
      console.log("Invalid move!");
      return false;
    }
    else {
      return this.towers[startTowerIdx].slice(-1)[0] < this.towers[endTowerIdx].slice(-1)[0];
    }
  }

  printStacks() {
    for(let i = 0; i < this.towers.length; i++) {
      console.log(`Tower ${i + 1}: |${this.towers[i]}|`);
    }
  }

  isWon() {
    return this.towers[1].length === 3 || this.towers[2].length === 3;
  }
}


const test = new Game();
test.run(() => {
  console.log(`thank god, it's over..`);
  reader.close();
});
// test.printStacks();
// console.log(test.isWon());



















// reader.close();
