const EventEmitter = require('events');

class UserActionTracker extends EventEmitter {
  constructor() {
    super();
    this.actions = [];
  }

  logAction(action) {
    this.actions.push(action);
    this.emit('actionLogged', action);

    if (this.actions.length > 5) {
      this.emit('maxActions', this.actions.length);
    }
  }

  getActionCount() {
    return this.actions.length;
  }
}

const tracker = new UserActionTracker();

tracker.on('actionLogged', (action) => {
  console.log(`Action logged: ${action}`);
});

tracker.on('maxActions', (count) => {
  console.log(`Maximum actions exceeded! Total actions count: ${count}`);
});

tracker.logAction('login');
tracker.logAction('viewProfile');
tracker.logAction('logout');
tracker.logAction('login');
tracker.logAction('updateProfile');
tracker.logAction('logout');

console.log(`Total actions count: ${tracker.getActionCount()}`);
