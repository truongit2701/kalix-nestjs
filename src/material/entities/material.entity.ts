import { Product } from 'src/product/entities/product.entity';
import { BaseModel } from 'src/utils/base-entity/base-entity.template';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Material extends BaseModel {
  @PrimaryGeneratedColumn()
  material_id: number;

  @Column()
  material_name: string;

  @Column()
  description: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({
    name: 'material',
  })
  material: Product;
}
