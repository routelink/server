import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  ForeignKey,
} from 'sequelize-typescript';

import { IsNotEmpty } from 'class-validator';
import { Transport } from './transport.model';
import { MyUser } from './my-user.model';

@Table({ tableName: 'insures' })
export class Insure extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @IsNotEmpty()
  @Column(DataType.BOOLEAN)
  is_user!: boolean;

  @ForeignKey(() => Transport)
  @Column(DataType.BIGINT)
  transport_id!: number;

  @ForeignKey(() => MyUser)
  @Column(DataType.BIGINT)
  user_id!: number;
}
