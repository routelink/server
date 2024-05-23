import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Organization } from './organization.model';
import { Type } from './type.model';

@Table({ tableName: 'transports' })
export class Transport extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @ForeignKey(() => Organization)
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
