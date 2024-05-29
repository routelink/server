import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Transport } from './transport.model';

@Table({ tableName: 'services' })
export class Service extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose({ groups: ['read'] })
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.TEXT)
  @Expose({ groups: ['read'] })
  description!: string;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  updatedAt!: Date;

  @IsNotEmpty()
  @Column(DataType.INTEGER)
  @Expose({ groups: ['read'] })
  length!: number;

  @IsNotEmpty()
  @Column(DataType.INTEGER)
  @Expose({ groups: ['read'] })
  sum!: number;

  @ForeignKey(() => Transport)
  @Column(DataType.INTEGER)
  transport_id!: number;

  @BelongsTo(() => Transport)
  @Expose({ groups: ['read'] })
  transport!: Transport;
}
export default Service;
