import {
  DataType,
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Table({ tableName: 'types' })
export class Type extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose()
  @Column(DataType.INTEGER)
  id!: number;

  @Expose()
  @IsNotEmpty()
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  image!: string;
}
