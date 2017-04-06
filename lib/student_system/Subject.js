'use strict';

class Subject {
  constructor(math, chinese, english, program) {
    this.math = math;
    this.chinese = chinese;
    this.english = english;
    this.program = program;
  }
  calTotal() {
    return this.math + this.chinese + this.english + this.program;
  }
  calAverage() {
    return this.calTotal() / 4;
  }
  isCompletion() {
    return (typeof this.math === 'number') &&
      (typeof this.chinese === 'number') &&
      (typeof this.english === 'number') &&
      (typeof this.program === 'number');
  }
}

module.exports = Subject;