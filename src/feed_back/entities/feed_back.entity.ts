import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { BaseModel } from 'src/utils/base-entity/base-entity.template';

@Entity()
export class Feedback extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({
    name: 'product'
  })
  product: Product;
}