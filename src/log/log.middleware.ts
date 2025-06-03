import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

import * as os from 'os';
import { Log } from "./log.dto";

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(
  ) { }

  private logger = new Logger();

  use(req: any, res: any, next: (error?: Error | any) => void) {
    const start = Date.now();

    const originalSend = res.send;
    let responseBody: any;
    let parsedResponseBody: any;

    // Override res.send to capture response body
    res.send = function (body: any) {
      responseBody = body; // Capture the body
      if (typeof responseBody === 'string')
        parsedResponseBody = JSON.parse(responseBody);
      return originalSend.call(this, body); // Call the original res.send
    };

    res.on('finish', async () => {
      const duration = Date.now() - start;

      const logBody: Log = {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        reqBody: req.body,
        res: parsedResponseBody,
        rtt: duration,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        logDateStr: new Date().toISOString(),
        host: os.hostname(),
      };
      
      this.logger.log(JSON.stringify(logBody));
      console.log(JSON.stringify(logBody));
      // await this.logService.log(logBody);
    });

    next();
  }
}