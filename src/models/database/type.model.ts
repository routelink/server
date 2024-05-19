import {
  DataType,
  Model,
  Column,
  HasMany,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { IsNotEmpty } from 'class-validator';
import { Transport } from './transport.model';

@Table({ tableName: 'types' })
export class Type extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  name!: string;

  @IsNotEmpty()
  @Column(DataType.STRING)
  image!: string;

  @HasMany(() => Transport)
  transports!: Transport[];
}
