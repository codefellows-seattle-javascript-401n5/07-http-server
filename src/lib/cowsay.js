'use strict';

class Cowsay {
  constructor() {

    message: '',
    
    say(message) {
      this.message = message;
      error = 'Invalid request.  Text query required.';
    };
  }
};

module.exports = Cowsay;