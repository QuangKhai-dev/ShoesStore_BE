import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntity: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateProductDto) {
    const { name, categoryId } = dto;
    const existingProduct = await this.productEntity.findOne({
      where: { name, categoryId },
    });

    if (existingProduct) {
      throw new BadRequestException('Sản phẩm đã tồn tại');
    }
    const newProduct = this.productEntity.create(dto);
    await this.productEntity.save(newProduct);
    return newProduct;
  }
}
