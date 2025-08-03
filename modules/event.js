import EventEmitter from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});

eventEmitter.emit("greet", "Said");

