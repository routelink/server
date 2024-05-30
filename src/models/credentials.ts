import { IsNotEmpty } from 'class-validator';

export class Credentials {
  @IsNotEmpty({ groups: ['write'] })
  email!: string;

  @IsNotEmpty({ groups: ['write'] })
  password!: string;
}
