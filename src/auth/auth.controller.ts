import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth - 인증 관련 API')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiProperty({
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: ''
      },
      password: {
        type: 'string',
        example: ''
      },
    },
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiProperty({
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: ''
      },
      password: {
        type: 'string',
        example: ''
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiProperty({
    type: 'object',
    properties: {
      refreshToken: {
        type: 'string',
        example: ''
      },
    },
  })
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}
