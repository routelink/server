import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Org } from './orgs.model';
import { Type } from './types.model';

@Table({ tableName: 'transports' })
export class Transport extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose()
  @Column(DataType.INTEGER)
  id!: number;

  @Expose()
  @IsNotEmpty()
  @Column(DataType.STRING)
  name!: string;

  @ForeignKey(() => Type)
  @Column(DataType.INTEGER)
  type_id!: number;

  @BelongsTo(() => Type)
  type!: Type;

  @ForeignKey(() => Org)
  @Column(DataType.INTEGER)
  org_id!: number;

  @BelongsTo(() => Org)
  org!: Org;

  @Column(DataType.STRING(9))
  reg_number!: string;

  @Column(DataType.INTEGER)
  avg_consumption!: number;

  @Column(DataType.STRING)
  unit!: string;
}
