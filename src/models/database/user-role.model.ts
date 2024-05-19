import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';

import { MyUser } from './my-user.model';
import { Role } from './role.model';

@Table({ tableName: 'user-role' })
export class UserRole extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  record_id!: number;

  @ForeignKey(() => MyUser)
  @Column(DataType.BIGINT)
  user_id!: number;

  @ForeignKey(() => Role)
  @Column(DataType.BIGINT)
  role_id!: number;
}
