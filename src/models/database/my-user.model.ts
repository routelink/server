import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';

import { IsNotEmpty } from 'class-validator';
import { UserRole } from './user-role.model';
import { Role } from './role.model';
import { Insure } from './insure.model';
import { Org } from './org.model';
import { Metric } from './metric.model';

@Table({ tableName: 'my_users' })
export class MyUser extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  name!: string;

  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @IsNotEmpty()
  @Column(DataType.STRING)
  username!: string;

  @IsNotEmpty()
  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @HasMany(() => Insure)
  insures!: Insure[];

  @HasMany(() => Org)
  orgs!: Org[];

  @HasMany(() => Metric)
  metrics!: Metric[];

  @BelongsToMany(() => Role, () => UserRole)
  role!: Role[];
}
