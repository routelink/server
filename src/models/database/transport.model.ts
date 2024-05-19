import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

import { IsNotEmpty } from 'class-validator';

import { Type } from './type.model';
import { Service } from './service.model';
import { Insure } from './insure.model';
import { Metric } from './metric.model';
import { Org } from './org.model';

@Table({ tableName: 'transports' })
export class Transport extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @IsNotEmpty()
  @Column(DataType.STRING)
  name!: string;

  @IsNotEmpty()
  @Column(DataType.STRING)
  reg_number!: string;

  @Column(DataType.BIGINT)
  avg_consumption!: number;

  @IsNotEmpty()
  @Column(DataType.STRING)
  unit!: string;

  @ForeignKey(() => Type)
  @Column(DataType.BIGINT)
  type_id!: number;

  @ForeignKey(() => Org)
  @Column(DataType.BIGINT)
  org_id!: number;

  @HasMany(() => Service)
  services!: Service[];

  @HasMany(() => Insure)
  insures!: Insure[];

  @HasMany(() => Metric)
  metrics!: Metric[];
}
