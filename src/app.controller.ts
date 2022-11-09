import { Controller, Get } from '@nestjs/common/decorators';

@Controller('/')
export class AppController {
  @Get()
  async root() {
    return `<h1>Welcome to MiTienda API</h1>`;
  }

  @Get('status')
  async getStatus() {
    return 'OK';
  }
}
