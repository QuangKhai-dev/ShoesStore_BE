import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_images')
export class ProductImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
