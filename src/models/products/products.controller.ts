import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
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
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  // Thêm option cho các sản phẩm đã có
  @Post('add-option-product')
  async addOptionProduct(@Body() dto: { productId: number; optionId: number }) {
    return this.productsService.addOptionProduct(dto);
  }

  // Tạo option mẫu cho sản phẩm
  @Post('create-options')
  async createOptions(@Body() dto: { name: string }) {
    return this.productsService.createOptions(dto);
  }

  // Tạo giá trị cho option
  @Post('create-option-values')
  async createOptionValues(
    @Body() dto: { values: string[]; optionId: number },
  ) {
    return this.productsService.createOptionValues(dto);
  }

  // Tạo sản phẩm
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // Lấy thông tin sản phẩm theo id
  @Get(':id/:sku')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('sku') sku: string,
  ) {
    console.log(sku);
    return this.productsService.getById(id, sku);
  }

  // Upload ảnh sản phẩm
  @Post('upload-images-local')
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

  @Post('upload-images/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 8 }]))
  async uploadImages(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (!files || !files.image) {
      throw new BadRequestException('Không tìm thấy file image');
    }

    return this.productsService.uploadImageCloudinary(files.image, id);
  }

  // Phân trang cho sản phẩm
  @Get()
  async paginationListProduct(
    @Query()
    query: {
      page: number;
      limit: number;
      sort: string;
      order: 'ASC' | 'DESC';
    },
  ) {
    const { page = 1, limit = 10, sort = 'id', order = 'ASC' } = query;
    return this.productsService.paginationListProduct({
      page,
      limit,
      sort,
      order,
    });
  }
}
