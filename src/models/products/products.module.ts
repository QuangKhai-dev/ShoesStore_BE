import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from 'src/upload/cloudinary.module';
import { OptionsEntity } from './entity/options.entity';
import { OptionValueEntity } from './entity/option-value.entity';
import { ProductOptionEntity } from './entity/product-options.entity';
import { ProductImagesEntity } from './entity/product-images.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      ProductEntity,
      OptionsEntity,
      OptionValueEntity,
      ProductOptionEntity,
      ProductImagesEntity,
    ]),
    CloudinaryModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ConfigService],
})
export class ProductsModule {}
