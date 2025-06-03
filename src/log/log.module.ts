import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { LogMiddleware } from "./log.middleware";

@Module({

})
export class LogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET }
      )
      .forRoutes('*');
  }
};