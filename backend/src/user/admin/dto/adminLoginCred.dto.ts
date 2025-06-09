import { IsString, Length } from "class-validator";


export class AdminLoginCredDto {
    @IsString()
    @Length(3, 20)
    username: string;
    @IsString()
    @Length(6, 50)
    password: string;
}