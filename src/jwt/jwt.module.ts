import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtServiceCustom } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '90m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtServiceCustom],
  exports: [JwtServiceCustom, NestJwtModule],
})
export class JwtModuleCustom {}
