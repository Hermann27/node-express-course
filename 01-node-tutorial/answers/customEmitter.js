const EventEmitter = require("events");
const customEmitter = new EventEmitter();

customEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
  customEmitter.emit("ask", name);
});

customEmitter.on("ask", (name) => {
  console.log(`${name}, how are you today?`);
  customEmitter.emit("respond", name, "I'm doing great!");
});

customEmitter.on("respond", (name, response) => {
  console.log(`${name} says: "${response}"`);
});

customEmitter.emit("greet", "Mary alice");
