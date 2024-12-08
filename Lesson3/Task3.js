const EventEmitter = require('events');

class Timer extends EventEmitter {
  constructor(duration) {
    super();
    this.duration = duration; 
  }

  start() {
    this.emit('start', this.duration);
    let remainingTime = this.duration;

    while (remainingTime > 0) {
      this.emit('tick', remainingTime);
      const startTime = Date.now();
      while (Date.now() - startTime < 1000) {}
      remainingTime -= 1;
    }

    this.emit('end');
  }
}

const timer = new Timer(5);

timer.on('start', (duration) => {
  console.log(`Timer started with duration: ${duration} seconds`);
});

timer.on('tick', (timeLeft) => {
  console.log(`Time left: ${timeLeft} seconds`);
});

timer.on('end', () => {
  console.log('Timer has ended!');
});

timer.start();
