import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import { Org } from './orgs.model';
import Type from './types.model';

@Table({ tableName: 'transports' })
export class Transport extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @ForeignKey(() => Org)
  @Column(DataType.INTEGER)
  orgId!: number;

  @ForeignKey(() => Type)
  @Column(DataType.INTEGER)
  typeId!: number;

  @Column(DataType.STRING)
  regNumber!: string;

  @Column(DataType.INTEGER)
  avgConsumption!: number;

  @Column(DataType.STRING)
  unit!: string;
}
export default Transport;
