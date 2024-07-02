import { ProductEntity } from 'src/models/products/entity/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column()
  categoryParentId: number;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
