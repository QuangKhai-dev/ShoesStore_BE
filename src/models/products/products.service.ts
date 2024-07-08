import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/products.dto';
import { AttributeTypeEntity } from './entity/attribute-type.entity';
import { AttributeValueEntity } from './entity/attribute-value.entity';
import { ProductAttributeEntity } from './entity/product-attribute.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntity: Repository<ProductEntity>,
    @InjectRepository(AttributeTypeEntity)
    private attributeTypeEntity: Repository<AttributeTypeEntity>,
    @InjectRepository(AttributeValueEntity)
    private attriValueEntity: Repository<AttributeValueEntity>,
    @InjectRepository(ProductAttributeEntity)
    private productAttriEntity: Repository<ProductAttributeEntity>,
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

  // lấy sản phẩm theo id
  async getById(id: number) {
    const isExist = await this.productEntity.findOne({
      where: { id },
      relations: ['category', 'productAttributes', 'images'],
    });
    if (!isExist) {
      throw new BadRequestException('Sản phẩm không tồn tại');
    }
    return isExist;
  }

  async createAttributeType(dto: { name: string }) {
    if (!dto.name) {
      throw new BadRequestException('Tên thuộc tính không được để trống');
    }
    const isExist = await this.attributeTypeEntity.findOne({
      where: { name: dto.name },
    });
    if (isExist) {
      throw new BadRequestException('Thuộc tính đã tồn tại');
    }
    const newAttributeType = this.attributeTypeEntity.create(dto);
    await this.attributeTypeEntity.save(newAttributeType);
    return 'Tạo thuộc tính thành công';
  }

  async createAttributeValue(dto: { typeId: number; values: string[] }) {
    const { typeId, values } = dto;
    const attributeType = await this.attributeTypeEntity.findOne({
      where: { id: typeId },
    });
    if (!attributeType) {
      throw new BadRequestException('Thuộc tính không tồn tại');
    }
    const newValues = values.map((value) => ({
      value,
      typeId,
    }));
    await this.attriValueEntity.save(newValues);
    return 'Tạo giá trị thuộc tính thành công';
  }

  async createProductAttribute(dto: {
    productId: number;
    attributeTypeId: number;
  }) {
    // check productId và attributeTypeId có tồn tại không
    const productAttri = await this.productAttriEntity.findOne({
      where: { productId: dto.productId, attributeTypeId: dto.attributeTypeId },
    });
    if (productAttri) {
      throw new BadRequestException('Thuộc tính đã tồn tại');
    }
    const newProductAttribute = this.productAttriEntity.create(dto);
    await this.productAttriEntity.save(newProductAttribute);
    return 'Tạo thuộc tính sản phẩm thành công';
  }

  async paginationListProduct(dto: {
    sort: string;
    page: number;
    limit: number;
  }) {
    console.log(dto);
  }
}
