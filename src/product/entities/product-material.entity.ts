import { BaseModel } from 'src/utils/base-entity/base-entity.template';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Material } from 'src/material/entities/material.entity';

@Entity()
export class ProductMaterial extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product: Product) => product.id)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @ManyToOne(() => Material, (material: Material) => material.material_id)
  @JoinColumn({
    name: 'material_id',
  })
  material: Material;
}
