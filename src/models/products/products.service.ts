import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/products.dto';
import { CloudinaryService } from 'src/upload/cloudinary.service';
import { OptionsEntity } from './entity/options.entity';
import { OptionValueEntity } from './entity/option-value.entity';
import { ProductOptionEntity } from './entity/product-options.entity';
import { ProductImagesEntity } from './entity/product-images.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntity: Repository<ProductEntity>,
    @InjectRepository(OptionsEntity)
    private optionsEntity: Repository<OptionsEntity>,
    @InjectRepository(OptionValueEntity)
    private optionValueEntity: Repository<OptionValueEntity>,
    @InjectRepository(ProductOptionEntity)
    private prodOptionEntity: Repository<ProductOptionEntity>,
    @InjectRepository(ProductImagesEntity)
    private productImageEntity: Repository<ProductImagesEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addOptionProduct(dto: { productId: number; optionId: number }) {
    const { productId, optionId } = dto;
    const product = await this.productEntity.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new BadRequestException('Sản phẩm không tồn tại');
    }
    const option = await this.optionsEntity.findOne({
      where: { id: optionId },
    });
    if (!option) {
      throw new BadRequestException('Option không tồn tại');
    }
    const newProdOption = this.prodOptionEntity.create({
      productId,
      optionId,
    });
    await this.prodOptionEntity.save(newProdOption);
    return newProdOption;
  }

  async createOptionValues(dto: { values: string[]; optionId: number }) {
    const { values, optionId } = dto;
    const option = await this.optionsEntity.findOne({
      where: { id: optionId },
    });
    if (!option) {
      throw new BadRequestException('Thuộc tính không tồn tại');
    }
    const newValues = values.map((item) => {
      return this.optionValueEntity.create({
        value: item,
        optionId,
      });
    });
    await this.optionValueEntity.save(newValues);
    return newValues;
  }

  async createOptions(dto: { name: string }) {
    const newOption = this.optionsEntity.create(dto);
    await this.optionsEntity.save(newOption);
    return newOption;
  }

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
  async getById(id: number, sku: string) {
    const product = await this.productEntity
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productOptions', 'productOptions')
      .leftJoinAndSelect('productOptions.option', 'option')
      .leftJoinAndSelect('product.productSkus', 'productSkus')
      .leftJoinAndSelect('productSkus.images', 'images')
      .leftJoinAndSelect('productSkus.productStocks', 'productStocks')
      .leftJoinAndSelect('productStocks.optionValue', 'optionValue')
      .where('product.id = :id', { id })
      .andWhere('productSkus.sku = :sku', { sku })
      .getOne();

    if (!product) {
      throw new BadRequestException(
        'Sản phẩm không tồn tại hoặc SKU không tồn tại',
      );
    }

    // Lấy danh sách tất cả các SKU của sản phẩm
    const skus = await this.productEntity
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productSkus', 'productSkus')
      .leftJoinAndSelect('productSkus.images', 'images', 'images.index = 1')
      .where('product.id = :id', { id })
      .select(['productSkus.sku', 'images'])
      .getRawMany();

    return { ...product, skus };
  }

  async paginationListProduct(dto: {
    sort: string;
    page: number;
    limit: number;
    order: 'ASC' | 'DESC';
  }) {
    const { sort, page, limit } = dto;
    const skip = (page - 1) * limit;
    const [products, total] = await this.productEntity.findAndCount({
      order: {
        [sort]: dto.order,
      },
      skip,
      take: limit,
    });
    return { products, total };
  }

  async uploadImageCloudinary(files: Express.Multer.File[], skuId: number) {
    const listUrl = await this.cloudinaryService.uploadImages(files);
    console.log(listUrl);
    const newImages = listUrl.map((url: string, index: number) => {
      return this.productImageEntity.create({
        index: index + 1,
        productSkuId: skuId,
        imageUrl: url,
      });
    });
    await this.productImageEntity.save(newImages);
    return newImages;
  }
}
