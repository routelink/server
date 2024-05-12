import {
  DataType,
  Model,
  Column,
  HasMany,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
} from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { RefreshToken } from './refresh-token.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose({ groups: ['read'] })
  @Exclude()
  @Column(DataType.BIGINT)
  id!: number;

  @Expose()
  @IsNotEmpty()
  @Column(DataType.STRING)
  name!: string;

  @Expose()
  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @Expose()
  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  username!: string;

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty({ groups: ['write'] })
  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;

  @HasMany(() => RefreshToken)
  refreshTokens!: RefreshToken[];
}
