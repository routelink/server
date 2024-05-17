import {
  DataType,
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Role } from './roles.model';

@Table({ tableName: 'user_role' })
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  role_id!: number;

  @BelongsTo(() => Role)
  role!: Role;
}
