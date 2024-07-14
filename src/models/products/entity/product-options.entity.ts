import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OptionsEntity } from './options.entity';
import { ProductEntity } from './product.entity';
import { ProductStockEntity } from './product-stock.entity';

@Entity('product_option')
export class ProductOptionEntity {
  // Add your code here
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  optionId: number;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.productOptions)
  product: ProductEntity;

  @ManyToOne(() => OptionsEntity, (options) => options.productOption)
  option: OptionsEntity;

  @OneToMany(
    () => ProductStockEntity,
    (optionValue) => optionValue.productOptionId,
  )
  productStocks: ProductStockEntity[];
}
