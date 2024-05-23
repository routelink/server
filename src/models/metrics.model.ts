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

  /* TODO : FIX THIS. Because it's transport id in insusers table   */
  @Column(DataType.STRING)
  transportId!: number;

  /* TODO: Add insusers table  */

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;
}
