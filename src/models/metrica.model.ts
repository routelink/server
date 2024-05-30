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
import { User } from './user.model';

@Table({ tableName: 'metrics' })
export class Metrica extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @ForeignKey(() => Transport)
  @Column({ field: 'transport_id', type: DataType.INTEGER })
  transportId!: number;

  @BelongsTo(() => Transport)
  transport!: Transport;

  @ForeignKey(() => User)
  @Column({ field: 'id', type: DataType.INTEGER })
  userId!: number;

  @Column(DataType.JSON)
  coords!: { latitude: number; longitude: number };
}
