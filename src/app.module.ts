import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleGuard } from './common/guards/role.guard';
import { RedisModule } from './common/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    process.env.EANBLE_REDIS === '1'
      ? CacheModule.register({
          useFactory: async (configService: ConfigService) => ({
            stores: [createKeyv(configService.getOrThrow('REDIS_URL'))],
          }),
          inject: [ConfigService],
          isGlobal: true,
        })
      : CacheModule.register({
          isGlobal: true,
        }),
    AppModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      database: 'test2',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoleGuard],
})
export class AppModule {}
