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
import { Transport } from './transports.model';
import { User } from './users.model';

@Table({ tableName: 'insures' })
export class Insure extends Model {
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

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @Expose()
  @Column(DataType.BOOLEAN)
  is_user!: boolean;
}
