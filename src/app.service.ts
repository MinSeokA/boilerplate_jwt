import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: "Backend is running!"
    }
  }

  getHealth() {
    return {
      message: "Backend is healthy!"
    }
  }
}
