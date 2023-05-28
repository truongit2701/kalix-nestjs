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
import { ProductSize } from './product_size.entity';
import { Material } from 'src/material/entities/material.entity';
import { ProductMaterial } from './product-material.entity';

@Entity()
export class Product extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  price: string;

  @Column()
  image: string;

  @Column()
  info: string;

  @OneToMany(() => Feedback, (feedback: Feedback) => feedback.product)
  feedback: Feedback[];

  @OneToMany(
    () => ProductMaterial,
    (productMaterial: ProductMaterial) => productMaterial.product,
    {
      nullable: true,
    },
  )
  product_material: ProductMaterial[];

  @OneToMany(
    () => ProductSize,
    (productSize: ProductSize) => productSize.product,
    {
      nullable: true,
    },
  )
  product_size: ProductSize[];
}
