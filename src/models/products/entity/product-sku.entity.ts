import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductStockEntity } from './product-stock.entity';
import { ProductImagesEntity } from './product-images.entity';

@Entity('product_sku')
export class ProductSkuEntity {
  // Add your code here
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  sku: string;

  @Column()
  color: string;

  @ManyToOne(() => ProductEntity, (product) => product.productSkus)
  product: ProductEntity;

  @OneToMany(() => ProductStockEntity, (optionValue) => optionValue.productSku)
  productStocks: ProductStockEntity[];

  @OneToMany(() => ProductImagesEntity, (images) => images.sku)
  images: ProductImagesEntity[];
}
