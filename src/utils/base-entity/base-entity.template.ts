import { BaseEntity, CreateDateColumn, UpdateDateColumn, ValueTransformer } from 'typeorm';
import * as moment from 'moment';

export const momentToTimestamp: ValueTransformer = {
  to: () => {
    return moment().toDate();
  },
  from: (value: Date) => value,
};
export class BaseModel extends BaseEntity {
  @UpdateDateColumn({
    type: 'timestamp',
    transformer: momentToTimestamp,
  })
  public timestamp: Date;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: momentToTimestamp,
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: momentToTimestamp,
  })
  public updated_at: Date;
}
