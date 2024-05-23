import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  CreatedAt,
} from 'sequelize-typescript';
import Transport from './transports.model';
import { User } from './users.model';

@Table({ tableName: 'insures' })
export class Insure extends Model {
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

  @Column(DataType.BOOLEAN)
  isUser!: boolean;
}
export default Insure;
