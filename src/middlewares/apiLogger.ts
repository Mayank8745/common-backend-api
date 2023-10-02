import { transports, format } from "winston";
import { logger } from "express-winston";

export const apiLogger = logger({
  transports: [new transports.Console()],
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD hh:mm:ssA" }),
    format.printf(({ message, level, timestamp, stack }) => {
      if (stack) return `${timestamp} ${level}: ${message}\n${stack}`;
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  meta: false,
  colorize: true,
  statusLevels: true,
  skip: (req, _res) => req.method === "OPTIONS",
});

export const errorLogger = logger({
  transports: [new transports.Console()],
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD hh:mm:ssA" }),
    format.printf(({ message, level, timestamp, meta }) => {
      const error = JSON.stringify(meta?.error);
      const username = JSON.stringify(meta?.username);
      console.error({ timestamp, level, message, meta });
      return `${timestamp} ${level}: ${message}, username: ${username}, errors: ${error}`;
    })
  ),
  colorize: true,
  meta: true,
  requestField: null,
  dynamicMeta: (req, _res, next) => {
    return { url: req.url, body: req.body };
  },
  skip: (req, _res) => req.method === "OPTIONS",
});
