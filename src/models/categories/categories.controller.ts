import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/categories.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  create(@Body() dto: CreateCategoriesDto) {
    return this.categoriesService.create(dto);
  }
}
