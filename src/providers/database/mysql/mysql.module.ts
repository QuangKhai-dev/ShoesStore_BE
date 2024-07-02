import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlConfigModule } from 'src/config/database/mysql/app.module';
import { MySqlConfigService } from 'src/config/database/mysql/app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useFactory: (mysqlConfigService: MySqlConfigService) => ({
        type: 'mysql',
        host: mysqlConfigService.getHost(),
        port: mysqlConfigService.getPort(),
        username: mysqlConfigService.getUsername(),
        password: mysqlConfigService.getPassword(),
        database: mysqlConfigService.getDatabase(),
        // các entities được lưu trong thư mục entities của mỗi thư mục trong models
        entities: [__dirname + './../../../models/**/entity/*.entity{.ts,.js}'],
        // synchronize: true để tự động tạo bảng khi chạy ứng dụng sẽ không sử dụng trong môi trường production
        synchronize: true,
      }),
      inject: [MySqlConfigService],
    }),
  ],
})
export class MySqlProviderModule {}
