import { Product } from 'src/product/entities/product.entity';
import { BaseModel } from 'src/utils/base-entity/base-entity.template';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Order extends BaseModel {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  order_code: string;

  @Column()
  note: string;

  @Column()
  email_customer: string;

  @Column()
  address_customer: string

  @Column()
  phone_customer: number;

  @OneToMany(() => Product, (product: Product) => product.id)
  product: Product
}