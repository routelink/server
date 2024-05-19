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
import { MyUser } from './my-user.model';
import { Transport } from './transport.model';

@Table({ tableName: 'orgs' })
export class Org extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @IsNotEmpty()
  @Column(DataType.STRING)
  name!: string;

  @HasMany(() => MyUser)
  users!: MyUser[];

  @HasMany(() => Transport)
  transports!: Transport[];
}
