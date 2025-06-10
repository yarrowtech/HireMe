import { IsEmail, IsPhoneNumber, IsString } from "class-validator";


export class PartnerRequestDto {
    @IsString()
    CompanyName: string;
    @IsPhoneNumber("IN")
    Contact: string;
    @IsEmail()
    Email: string;
    @IsString()
    Address: string;
    @IsString()
    PAN_NO: string;
    @IsString()
    CIN: string;

    @IsString()
    ESI: string;
    @IsString()
    PF: string;
    @IsString()
    PAN: string;
    @IsString()
    MOA: string;
    @IsString()
    GST: string;
    @IsString()
    TradeLicense: string;
    @IsString()
    MSMC: string;
}