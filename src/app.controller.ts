import { Controller, Get } from '@nestjs/common/decorators';

@Controller('/')
export class AppController {
  @Get('status')
  async getStatus() {
    return 'OK';
  }
}
