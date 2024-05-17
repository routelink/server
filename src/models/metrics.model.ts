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
import { User } from './users.model';
import { Transport } from './transports.model';

@Table({ tableName: 'metrics' })
export class Metric extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose()
  @Column(DataType.INTEGER)
  id!: number;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;

  @ForeignKey(() => Transport)
  @Column(DataType.INTEGER)
  transport_id!: number;

  @BelongsTo(() => Transport)
  transport!: Transport;

  @Column(DataType.GEOMETRY('POINT'))
  coords!: any;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;
}
