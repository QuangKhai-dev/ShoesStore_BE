import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OptionValueEntity } from './option-value.entity';
import { ProductOptionEntity } from './product-options.entity';

@Entity('options')
export class OptionsEntity {
  // Add your code here
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => OptionValueEntity, (value) => value.option)
  values: OptionValueEntity[];

  @OneToMany(() => ProductOptionEntity, (value) => value.option)
  productOption: ProductOptionEntity[];
}
