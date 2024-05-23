import {
  DataType,
  Model,
  Column,
  HasMany,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { RefreshToken } from './refresh-token.model';
import Org from './orgs.model';
import Role from './roles.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose({ groups: ['read'] })
  @Exclude()
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

  @ForeignKey(() => Org)
  @Column(DataType.INTEGER)
  org_id!: number;

  @BelongsTo(() => Org)
  org!: Org;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  role_id!: number;

  @HasMany(() => RefreshToken)
  refreshTokens!: RefreshToken[];
}
export default User;
