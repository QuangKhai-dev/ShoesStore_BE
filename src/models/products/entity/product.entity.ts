import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriesEntity } from 'src/models/categories/entity/categories.entity';
import { productEnum } from 'src/enum/product.enum';
import { ProductOptionEntity } from './product-options.entity';
import { ProductSkuEntity } from './product-sku.entity';

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

  @Column()
  status: productEnum;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  categoryId: number;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: CategoriesEntity;

  @OneToMany(() => ProductOptionEntity, (option) => option.product)
  productOptions: ProductOptionEntity[];

  @OneToMany(() => ProductSkuEntity, (sku) => sku.product)
  productSkus: ProductSkuEntity[];
}
