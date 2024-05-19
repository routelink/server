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

@Table({ tableName: 'employees' })
export class Employee extends Model {
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
  @Column(DataType.STRING)
  surname!: string;

  @Expose()
  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @Expose()
  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  position!: string;

  @Expose()
  @IsNotEmpty()
  @Column({ type: DataType.STRING, unique: true })
  departament!: string;

  @Expose()
  @IsNotEmpty()
  @Column(DataType.DATE)
  birthday!: Date;

  @CreatedAt
  @Expose()
  @Column(DataType.DATE)
  createdAt!: Date;
}
