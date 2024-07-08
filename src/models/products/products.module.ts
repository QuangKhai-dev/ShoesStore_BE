import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { AttributeTypeEntity } from './entity/attribute-type.entity';
import { AttributeValueEntity } from './entity/attribute-value.entity';
import { ProductAttributeEntity } from './entity/product-attribute.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      ProductEntity,
      AttributeTypeEntity,
      AttributeValueEntity,
      ProductAttributeEntity,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ConfigService],
})
export class ProductsModule {}
