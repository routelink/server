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

@Table({ tableName: 'transports' })
export class Transport extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @IsNotEmpty()
  @Column(DataType.STRING)
  name!: string;

  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  username!: string;

  @IsNotEmpty()
  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @HasMany(() => Service)
  services!: Service[];

  @HasMany(() => Insure)
  insures!: Insure[];

  @HasMany(() => Metric)
  metrics!: Metric[];

  @ForeignKey(() => Type)
  @Column(DataType.BIGINT)
  type_id!: number;
}
