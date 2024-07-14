import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OptionsEntity } from './options.entity';
import { ProductStockEntity } from './product-stock.entity';

@Entity('option_values')
export class OptionValueEntity {
  // Add your code here
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  optionId: number;

  @ManyToOne(() => OptionsEntity, (options) => options.values)
  @JoinColumn({ name: 'optionId' })
  option: OptionsEntity;

  @OneToMany(() => ProductStockEntity, (optionValue) => optionValue.optionValue)
  productStocks: ProductStockEntity[];
}
