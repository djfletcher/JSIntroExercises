class Clock {
  constructor() {
    const date = new Date();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
    // this._tick();
    setInterval(this._tick.bind(this), 1000);
  }

  _addZero(time) {
    if (time < 10) {
      return '0' + time;
    }
    return time;
  }

  printTime() {
    const rawTime = [this.hour, this.minute, this.second];
    // const time = rawTime.map(t => this._addZero(t));
    console.log(rawTime.join(':'));
  }

  _tick () {
    this.second++;

    if (this.second === 60){
      this.second = 0;
      this.minute++;
    }

    if (this.minute === 60){
      this.minute = 0;
      this.hour++;
    }

    if (this.hour === 24) {
      this.hour = 0;
    }

    this.printTime();
  }

}

// const clock = new Clock();
// clock.printTime();

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0){
    reader.question('Enter a number: ', response => {
      const num = parseInt(response);
      sum += num;
      numsLeft--;
      console.log(`Current sum is ${sum}`);
      addNumbers(sum, numsLeft, completionCallback);
    });
  }
  if (numsLeft === 0) {
    completionCallback(sum);
    reader.close();
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));


function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else { sortCompletionCallback(arr); }
  }
  outerBubbleSortLoop(true);
}

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}? `, response => {
    if (response === 'yes') { callback(true); }
    else { callback(false); }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], isGreaterThan => {
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
  if (i === (arr.length - 1)) {
    outerBubbleSortLoop(madeAnySwaps);
  }
}
reader.close();
// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

Function.prototype.myBind = function(context) {
  return () => {
    this.apply(context);
  };
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"
