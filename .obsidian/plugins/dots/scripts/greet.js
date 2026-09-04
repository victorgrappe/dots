// One function per file. The file name is the function name.
module.exports = function greet(name = 'stranger') {
  return `Hello, ${name}! It is ${new Date().toLocaleTimeString()} !`;
};


