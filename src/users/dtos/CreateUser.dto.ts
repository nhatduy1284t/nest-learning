import { IsNotEmpty,IsEmail } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  username: 'Anspo';


  @IsNotEmpty()
  @IsEmail()
  email: 'anson@gmail.com';

  @IsNotEmpty()
  password:"asdasd"

}
