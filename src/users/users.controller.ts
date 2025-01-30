import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../common/decorator/users/get-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { Roles } from '../common/decorator/custom/roles.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { RedisService } from '../common/redis/redis.service';

@Controller('users')
@ApiTags('Users - 사용자 관리 API')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,  
    private readonly redisService: RedisService,
    ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: UserInterface) {
    const cache = await this.redisService.get('users:me:' + user.id)

    if (!cache) {
      await this.redisService.set('users:me:' + user.id, user, 10);
      return user;
    }

    return cache;
  }

  // Roles ADMIN
  @Get('list')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  async getAdmin() {
    const cache = await this.redisService.get('admin:users:list');
    const users = await this.usersService.findAll();

    if (!cache) {
      await this.redisService.set('admin:users:list', users, 10);
      return this.usersService.findAll();
    }

    return cache;
  }
}
