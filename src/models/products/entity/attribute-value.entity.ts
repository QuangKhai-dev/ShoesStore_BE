import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttributeTypeEntity } from './attribute-type.entity';

@Entity('attribute_value')
export class AttributeValueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  typeId: number;

  @ManyToOne(() => AttributeTypeEntity, (type) => type.values)
  @JoinColumn({ name: 'typeId' })
  type: AttributeTypeEntity;
}
