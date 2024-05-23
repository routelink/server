import {
    DataType,
    Model,
    Column,
    Table,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    ForeignKey,
} from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Role } from './roles.model';
import { Transport } from './transport.model'

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
    fullname!: string;

    @ForeignKey(() => Role)
    @IsNotEmpty()
    @Column(DataType.BIGINT)
    roleId!: number;

    @ForeignKey(() => Transport)
    @Column(DataType.BIGINT)
    transportId!: number;

    @CreatedAt
    @Expose()
    @Column(DataType.DATE)
    createdAt!: Date;
}
export default Employee;
