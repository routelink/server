import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
} from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Table({ tableName: 'orgs' })
export class Orgs extends Model {
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

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  updatedAt!: Date;
}
