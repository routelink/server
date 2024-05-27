import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import User from './user.model';

@Table({ tableName: 'roles' })
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Expose({ groups: ['read'] })
  id!: number;

  @Expose()
  @IsNotEmpty()
  @Column(DataType.STRING)
  @Expose({ groups: ['read'] })
  name!: string;

  @HasMany(() => User)
  users!: User[];
}
export default Role;
