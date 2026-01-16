import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  MinLength,
} from "class-validator";

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsPhoneNumber("ID")
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString()
  birth: string;
}
