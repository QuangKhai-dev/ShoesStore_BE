import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from './entity/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoriesDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoriesEntity: Repository<CategoriesEntity>,
  ) {}

  async create(dto: CreateCategoriesDto) {
    try {
      const category = this.categoriesEntity.create(dto);
      await this.categoriesEntity.save(category);
      return category;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
