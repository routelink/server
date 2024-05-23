import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
} from 'sequelize-typescript';
import Transport from './transports.model';
import { User } from './users.model';

@Table({ tableName: 'metrics' })
export class Metric extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @ForeignKey(() => Transport)
  @Column(DataType.INTEGER)
  transportId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.JSON)
  coords!: { latitude: number; longitude: number };
}
