import {
  AutoIncrement,
  BelongsTo,
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
  @Column({ field: 'organization_id', type: DataType.INTEGER })
  organizationId!: number;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @ForeignKey(() => Type)
  @Column({ field: 'type_id', type: DataType.INTEGER })
  typeId!: number;

  @BelongsTo(() => Type)
  type!: Type;

  @Column(DataType.STRING)
  regNumber!: string;

  @Column(DataType.INTEGER)
  avgConsumption!: number;

  @Column(DataType.STRING)
  unit!: string;
}
