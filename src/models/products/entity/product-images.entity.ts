import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSkuEntity } from './product-sku.entity';

@Entity('product_images')
export class ProductImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  index: number;

  @Column()
  productSkuId: number;

  @ManyToOne(() => ProductSkuEntity, (sku) => sku.images)
  @JoinColumn({ name: 'productSkuId' })
  sku: ProductSkuEntity;
}
