import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service'; // UsersService 임포트

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) { // UsersService 주입
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // JWT secret key 설정
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub); // user 정보 조회
    if (!user) {
      throw new UnauthorizedException();
    }
    // Make password property optional before deleting it
    delete (user as { password?: string }).password;
    return user; // user 객체 반환
  }
}