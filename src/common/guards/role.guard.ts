import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No @Roles decorator, allow access (or change to false to deny)
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // This is where your JwtStrategy adds the user object

    if (!user || !user.roles || !user.roles.some((role: string) => roles.includes(role))) {
      throw new UnauthorizedException("you don't have permission to access this resource");
    }
    return true;
  }
}