'use strict';

const readline = require('readline');
const System = require('./StudentManageSystem');

const sysReadLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let system = new System(sysReadLine);
console.log(System.getWELCOME());
console.log(System.getCommand());
sysReadLine.on('line', (input) => {
  console.log(system.parseInput(input));
  if (system.isClosed()) {
    sysReadLine.close();
  } else if (system.isNeedToShowCommands()) {
    console.log(System.getCommand());
  }
});