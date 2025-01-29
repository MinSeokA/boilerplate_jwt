import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../common/decorator/users/get-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { Roles } from '../common/decorator/custom/roles.decorator';
import { RoleGuard } from '../common/guards/role.guard';

@Controller('users')
@ApiTags('Users - 사용자 관리 API')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser() user: UserInterface) {
    return user;
  }

  // Roles ADMIN
  @Get('list')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  getAdmin() {
    return this.usersService.findAll();
  }
}
