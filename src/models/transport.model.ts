import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
  } from 'sequelize-typescript';
  import { Org } from './orgs.model';
  import { Expose } from 'class-transformer';
  
  @Table({ tableName: 'transports' })
  export class Transport extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @Column(DataType.STRING)
    @Expose()
    name!: string;
  
    @ForeignKey(() => Org)
    @Column(DataType.INTEGER)
    @Expose()
    orgId!: number;
  
    @Column(DataType.INTEGER)
    @Expose()
    typeId!: number;
  
    @Column(DataType.STRING)
    @Expose()
    regNumber!: string;
  
    @Column(DataType.INTEGER)
    @Expose()
    avgConsumption!: number;
  
    @Column(DataType.STRING)
    @Expose()
    unit!: string;
  }
  export default Transport;
