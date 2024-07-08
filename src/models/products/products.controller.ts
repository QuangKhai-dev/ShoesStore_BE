import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  multerConfigLocal,
  multerOptionsLocal,
} from 'src/config/multer/multer-local.config';
import { ConfigService } from '@nestjs/config';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  // Tạo danh sách các thuộc tính của sản phẩm - Mỗi sản phẩm có các thuộc tính khác nhau
  @Post('create-product-attribute')
  async createProductAttribute(
    @Body() dto: { productId: number; attributeTypeId: number },
  ) {
    return this.productsService.createProductAttribute(dto);
  }

  // Tạo danh sách các thuộc tính mẫu của sản phẩm
  @Post('create-attribute-type')
  async createAttributeType(@Body() dto: { name: string }) {
    return this.productsService.createAttributeType(dto);
  }

  // Tạo danh sách các giá trị cho thuộc tính của sản phẩm
  @Post('create-attribute-value')
  async createAttributeValue(
    @Body() dto: { typeId: number; values: string[] },
  ) {
    return this.productsService.createAttributeValue(dto);
  }

  // Tạo sản phẩm
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // Lấy thông tin sản phẩm theo id
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getById(id);
  }

  // Upload ảnh sản phẩm
  @Post('upload-images')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 8 }], {
      storage: multerConfigLocal.storage,
      fileFilter: multerOptionsLocal.fileFilter,
    }),
  )
  async uploadImagesLocal(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
  ) {
    if (!files || !files.image) {
      throw new BadRequestException('Không tìm thấy file image');
    }

    const baseUrl = this.configService.get('BASE_URL_LOCAL');
    const imagePath = files.image.map((file) => {
      return `${baseUrl}/media/${file.filename}`;
    });
    return imagePath;
  }
}
