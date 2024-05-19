import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  CreatedAt,
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

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  name!: string;

  @BelongsToMany(() => MyUser, () => UserRole)
  users!: MyUser[];
}
