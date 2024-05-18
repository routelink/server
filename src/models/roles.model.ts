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

@Table({ tableName: 'roles' })
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Expose()
  @Column(DataType.INTEGER)
  id!: number;

  @Expose()
  @IsNotEmpty()
  @Column(DataType.STRING)
  name!: string;
}
export default Role;
