import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MySqlConfigService } from './app.service';
import * as Joi from 'joi';
import configuration from './mysql.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASS: Joi.string().required(),
      }),
    }),
  ],
  providers: [MySqlConfigService, ConfigService],
  exports: [MySqlConfigService, ConfigService],
})
export class MySqlConfigModule {}
