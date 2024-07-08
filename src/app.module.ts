import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { CategoriesModule } from './models/categories/categories.module';
import { ProductsModule } from './models/products/products.module';
import { AuthModule } from './auth/auth.module';
import { MySqlProviderModule } from './providers/database/mysql/mysql.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'media'),
      serveRoot: '/media',
    }),
    MySqlProviderModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
