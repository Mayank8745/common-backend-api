import { createLogger, transports, format } from "winston";

const logLevel = process.env.NODE_ENV === "production" ? "verbose" : "debug";

const consoleTransports = new transports.Console({
  level: logLevel,
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD hh:mm:ssA" }),
    format.printf((info) => {
      if (info.stack) return `${info.timestamp} ${info.level} ${info.message}\n${info.stack}`;
      if (info.name === "API_ERROR") return `${info.timestamp} ${info.level}: ${info.type}`;
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
});

const winstonLogger = createLogger({
  transports: consoleTransports,
  exceptionHandlers: consoleTransports,
  exitOnError: false,
});

export const logger = winstonLogger;
