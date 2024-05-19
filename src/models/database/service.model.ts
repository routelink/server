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

@Table({ tableName: 'services' })
export class Service extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @IsNotEmpty()
  @Column(DataType.TEXT)
  description!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @IsNotEmpty()
  @Column(DataType.BIGINT)
  length!: number;

  @IsNotEmpty()
  @Column(DataType.BIGINT)
  sum!: number;

  @ForeignKey(() => Transport)
  @Column(DataType.BIGINT)
  transport_id!: number;
}
