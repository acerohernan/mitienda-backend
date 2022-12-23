import { Controller, Get } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller('/')
export class AppController {
  @Get('')
  async root() {
    return `<h1>Welcome to MiTienda API with CI/CD</h1>`;
  }

  @Get('status')
  async getStatus() {
    return 'OK';
  }
}
