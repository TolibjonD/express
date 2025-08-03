import eventEmitter from "events";

class Logger extends eventEmitter {
  log(method, route) {
    this.emit("message", { method, route });
  }
}

export default Logger;
