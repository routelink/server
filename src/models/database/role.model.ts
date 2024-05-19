import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';

import { IsNotEmpty } from 'class-validator';
import { MyUser } from './my-user.model';
import { UserRole } from './user-role.model';

@Table({ tableName: 'roles' })
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  name!: string;

  @BelongsToMany(() => MyUser, () => UserRole)
  users!: MyUser[];
}
