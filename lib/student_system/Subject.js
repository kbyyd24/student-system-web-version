'use strict';

class Subject {
  constructor(math, chinese, english, program) {
    this.math = math;
    this.chinese = chinese;
    this.english = english;
    this.program = program;
    this.total = this.math + this.chinese + this.english + this.program;
    this.average = this.total / 4;
  }
  calTotal() {
    return this.total;
  }
  calAverage() {
    return this.average;
  }
  isCompletion() {
    return (!Number.isNaN(this.math)) &&
      (!Number.isNaN(this.chinese)) &&
      (!Number.isNaN(this.english)) &&
      (!Number.isNaN(this.program));
  }
}

module.exports = Subject;