import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeValueEntity } from './attribute-value.entity';
import { ProductAttributeEntity } from './product-attribute.entity';

@Entity('attribute_type')
export class AttributeTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AttributeValueEntity, (value) => value.type)
  values: AttributeValueEntity[];

  @OneToMany(
    () => ProductAttributeEntity,
    (productAttribute) => productAttribute.attributeType,
  )
  productAttributes: ProductAttributeEntity[];
}
