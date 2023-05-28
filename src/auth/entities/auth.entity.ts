import { User } from 'src/user/entities/user.entity';
import { BaseModel } from 'src/utils/base-entity/base-entity.template';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Auth extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  access_token: string;

  @Column({
    default: 0,
  })
  is_login: number;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
