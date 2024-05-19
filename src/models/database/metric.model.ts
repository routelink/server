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

@Table({ tableName: 'metrics' })
export class Metric extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @IsNotEmpty()
  @Column(DataType.DECIMAL)
  coords!: number;

  @ForeignKey(() => Transport)
  @Column(DataType.BIGINT)
  transport_id!: number;

  @ForeignKey(() => MyUser)
  @Column(DataType.BIGINT)
  user_id!: number;
}
