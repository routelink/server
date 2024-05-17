import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Transport } from './transports.model';

@Table({ tableName: 'services' })
export class Service extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose()
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.TEXT)
  description!: string;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;

  @IsNotEmpty()
  @Column(DataType.INTEGER)
  length!: number;

  @IsNotEmpty()
  @Column(DataType.INTEGER)
  sum!: number;

  @ForeignKey(() => Transport)
  @Column(DataType.INTEGER)
  transport_id!: number;

  @BelongsTo(() => Transport)
  transport!: Transport;
}
