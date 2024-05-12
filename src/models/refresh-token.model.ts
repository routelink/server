import {
  DataType,
  Model,
  Column,
  ForeignKey,
  Table,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { config } from '@app/models';
import { User } from './user.model';

@Table({ tableName: 'refresh_tokens' })
export class RefreshToken extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING)
  token!: string;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  userId!: number;

  @Column(DataType.DATE)
  valid!: Date;

  static generateExpiryDate(): Date {
    const expiresIn = config.refreshTokenExpiresIn;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(expiresIn));

    return expiryDate;
  }
}
