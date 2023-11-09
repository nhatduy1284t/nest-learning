import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Access and log the headers
    // console.log("Token in header: ", req.headers.authorization);
    next();
  }
}
