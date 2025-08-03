import Logger from "./modules/logger.js";

const logger = new Logger();

logger.on("message", (data) => {
  console.log(data);
});

logger.log("GET", "/users");
logger.log("GET", "/users/profile");
