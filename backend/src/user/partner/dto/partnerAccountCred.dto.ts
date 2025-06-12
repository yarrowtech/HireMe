import { IsNumber, IsString, Length, Min } from "class-validator";


export class PartnerAccountCredDto {
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

export class CreateManagerAccountDto extends PartnerAccountCredDto {
    @IsString()
    @Length(5, 20)
    accountType: string
}