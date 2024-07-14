import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSkuEntity } from './product-sku.entity';
import { ProductOptionEntity } from './product-options.entity';
import { OptionValueEntity } from './option-value.entity';

@Entity('product_stock')
export class ProductStockEntity {
  // Add your code here
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productSkuId: number;

  @Column()
  productOptionId: number;

  @Column()
  optionValueId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ProductSkuEntity, (sku) => sku.productStocks)
  productSku: ProductSkuEntity;

  @ManyToOne(() => ProductOptionEntity, (option) => option.productStocks)
  productStocks: ProductOptionEntity;

  @ManyToOne(
    () => OptionValueEntity,
    (optionValue) => optionValue.productStocks,
  )
  optionValue: OptionValueEntity;
}
