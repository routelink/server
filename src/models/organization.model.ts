import { Expose } from 'class-transformer';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Transport } from './transport.model';
import User from './user.model';

@Table({ tableName: 'organizations' })
export class Organization extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Expose({ groups: ['read'] })
  id!: number;

  @Column(DataType.STRING)
  @Expose({ groups: ['read', 'write'] })
  name!: string;

  @HasMany(() => User)
  users!: User[];

  @HasMany(() => Transport, {
    onDelete: 'CASCADE',
  })
  transports!: Transport[];
}
