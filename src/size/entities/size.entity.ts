import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { BaseModel } from 'src/utils/base-entity/base-entity.template';
import { ProductSize } from 'src/product/entities/product_size.entity';

@Entity()
export class Size extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  width: string;

  @Column()
  length: string;

  @OneToMany(
    () => ProductSize,
    (productSize: ProductSize) => productSize.product,
    {
      nullable: true,
    },
  )
  product_size: ProductSize[];
}
