import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImagesEntity } from './product-images.entity';
import { CategoriesEntity } from 'src/models/categories/entity/categories.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  categoryId: number;

  @OneToMany(() => ProductImagesEntity, (image) => image.product)
  images: ProductImagesEntity[];

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: CategoriesEntity;
}