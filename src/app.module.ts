import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { CategoriesModule } from './models/categories/categories.module';
import { ProductsModule } from './models/products/products.module';
import { AuthModule } from './auth/auth.module';
import { MySqlProviderModule } from './providers/database/mysql/mysql.module';

@Module({
  imports: [
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
