import { IsNumber, IsString, Length, Min } from "class-validator";


export class UserLoginCredDto {
    @IsNumber()
    @Min(100, { message: "Company code must be a 3 digit number" })
    companyCode: number;
    @IsString()
    @Length(3, 100)
    username: string;
    @IsString()
    @Length(6, 50)
    password: string;
}