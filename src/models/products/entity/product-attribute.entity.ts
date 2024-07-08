import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { AttributeTypeEntity } from './attribute-type.entity';

@Entity('product_attribute')
export class ProductAttributeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  attributeTypeId: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ManyToOne(() => AttributeTypeEntity, (attributeType) => attributeType.id, {
    eager: true,
  })
  @JoinColumn({ name: 'attributeTypeId' })
  attributeType: AttributeTypeEntity;
}
