import { Expose } from 'class-transformer';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Organization } from './organization.model';
import { Type } from './type.model';
import User from './user.model';

@Table({ tableName: 'transports' })
export class Transport extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Expose({ groups: ['read', 'write'] })
  id!: number;

  @Column(DataType.STRING)
  @Expose({ groups: ['read'] })
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
  @Expose({ groups: ['read'] })
  regNumber!: string;

  @Column(DataType.INTEGER)
  avgConsumption!: number;

  @Column(DataType.STRING)
  unit!: string;

  @HasMany(() => User)
  user?: User;
}
