import { IsNotEmpty } from 'class-validator';

export class Credentials {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
