import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiLink, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './plugins/decorators/user.decorator';

class HealthCheckResponseDto {
  message: string;
}

@ApiTags('Utility - Health Check API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Health Check',
    description: '서버 상태를 확인합니다.',
  })
  getHealth(): HealthCheckResponseDto {
    return this.appService.getHealth();
  }
}
