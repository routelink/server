import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Metrica } from './metrica.model';
import { Organization } from './organization.model';
import { RefreshToken } from './refresh-token.model';
import { Role } from './role.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose({ groups: ['read'] })
  @Column(DataType.INTEGER)
  id!: number;

  @Expose()
  @IsNotEmpty()
  @Column(DataType.STRING)
  username!: string;

  @Expose()
  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty({ groups: ['write'] })
  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;

  @ForeignKey(() => Organization)
  @Column({ field: 'organization_id', type: DataType.INTEGER })
  organizationId?: number;

  @BelongsTo(() => Organization)
  @Expose({ groups: ['read'] })
  organization!: Organization;

  @Exclude()
  @ForeignKey(() => Role)
  @Column({ field: 'role_id', type: DataType.INTEGER })
  roleId!: number;

  @BelongsTo(() => Role)
  @Expose({ groups: ['read'] })
  role!: Role;

  @HasMany(() => RefreshToken)
  refreshTokens!: RefreshToken[];

  @HasMany(() => Metrica)
  metrics!: Metrica[];
}
export default User;
