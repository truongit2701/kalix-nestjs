import { Feedback } from 'src/feed_back/entities/feed_back.entity';
import { Size } from 'src/size/entities/size.entity';
import { BaseModel } from 'src/utils/base-entity/base-entity.template';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductSize extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product: Product) => product.id)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @ManyToOne(() => Size, (size: Size) => size.id)
  @JoinColumn({
    name: 'size_id',
  })
  size: Size;

  @Column({
    nullable: true,
  })
  price: string;
}
