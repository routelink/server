import {
  DataType,
  Model,
  Column,
  ForeignKey,
  Table,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Expose } from 'class-transformer';

@Table({ tableName: 'metrics' })
export class Metrics extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.JSON)
  coords!: { latitude: number; longitude: number };

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  userId!: number;

  @Column(DataType.STRING)
  transportId!: number;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;
}
