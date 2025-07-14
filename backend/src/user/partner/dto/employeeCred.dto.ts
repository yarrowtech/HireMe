import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsNumber, IsIn, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  // Personal Details
  @IsString() @IsNotEmpty()
  Name: string;

  @IsString() @IsNotEmpty()
  DOB: string;

  @IsEmail()
  Email: string;

  @IsString() @IsNotEmpty()
  Mobile: string;

  @IsString()
  Address: string;

  @IsString()
  Pic: string;

  // Identity Documents
  @IsString()
  AadhaarNo: string;

  @IsString()
  Aadhaar: string;

  @IsString()
  PanNo: string;

  @IsString()
  Pan: string;

  @IsString()
  Voter: string;

  // Education Details
  @IsString()
  Qualification: string;

  @IsString()
  Institution: string;

  @IsString()
  YearOfPassing: string;

  @IsNumber()
  @Type(() => Number)
  Percentage: number;

  @IsString()
  Marksheet: string;

  // Bank Details
  @IsString()
  AccountHolderName: string;

  @IsString()
  AccountNumber: string;

  @IsString()
  IFSCCode: string;

  @IsString()
  BankName: string;

  @IsString()
  Branch: string;

  @IsString()
  AccountType: string;

  // Job Details
  @IsString()
  JoiningDate: string;

  @IsString()
  Post: string;

  @IsNumber()
  @Type(() => Number)
  Amount: number;

  @IsString()
  PaymentFrequency: string;

  @IsString()
  @IsIn(['EMPLOYEE', 'ADMIN', 'MANAGER'])
  AccessLevel: string;

  @IsString()
  Password: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  authUserId: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  CompanyCode: number;
}
