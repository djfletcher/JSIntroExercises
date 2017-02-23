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

addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));
