import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, message, timestamp }) =>
        `${timestamp} [${level.toUpperCase()}] : ${message}`
    )
  ),

  //thiết lập nơi lưu log
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/err.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
