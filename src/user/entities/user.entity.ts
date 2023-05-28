import { BaseModel } from 'src/utils/base-entity/base-entity.template';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  is_admin: number;
}
