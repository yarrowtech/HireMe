import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  Param,
  BadRequestException,
  UseInterceptors,
  UseGuards,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpCode,
  UseFilters,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { unlinkSync } from 'node:fs';
import { extname } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { PartnerService } from './partner.service';
import { PartnerAccountCredDto } from './dto/partnerAccountCred.dto';
import { CreateEmployeeDto } from './dto/employeeCred.dto';
import { CompanyAdminGuard } from 'src/guards/company.guard';
import { Request, Response } from 'express';

const storage = diskStorage({
  destination: process.env.EMPLOYEE_FILE_PATH || 'uploads/emp',
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const name = `${uuidv4()}${ext}`;
    req.body[file.fieldname] =
      `${process.env.EMPLOYEE_FILE_PATH || 'uploads/emp'}/${name}`;
    cb(null, name);
  },
});

@Catch(BadRequestException)
class CleanupFileOnErrorFilter
  implements ExceptionFilter
{
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (request.body.Aadhaar) unlinkSync(request.body.Aadhaar);
    if (request.body.PAN) unlinkSync(request.body.PAN);
    if (request.body.Voter) unlinkSync(request.body.Voter);
    if (request.body.Pic) unlinkSync(request.body.Pic);
    if (request.body.Marksheet) unlinkSync(request.body.Marksheet);

    response
      .status(status)
      .json(exception.getResponse());
  }
}

@Controller('partner')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Get('details/:id')
  async getPartnerDetails(
    @Param('id') partnerId: string,
  ): Promise<Object | null> {
    const details = await this.partnerService.getPartnerDetails(
      parseInt(partnerId),
    );
    if (!details) throw new BadRequestException('Invalid partner ID');
    return details;
  }

  @Post('auth/login')
  async partnerAccountLogin(
    @Body(new ValidationPipe()) partnerAccoundCred: PartnerAccountCredDto,
  ): Promise<{ message: string, token: string }> {
    const { token } = await this.partnerService.login(
      partnerAccoundCred.companyCode,
      partnerAccoundCred.username,
      partnerAccoundCred.password,
    );
    return { token, message: 'Login successful'};
  }

  @Post('add-employee')
  @HttpCode(201)
  @UseFilters(CleanupFileOnErrorFilter)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'Aadhaar', maxCount: 1 },
        { name: 'Pan', maxCount: 1 },
        { name: 'Voter', maxCount: 1 },
        { name: 'Marksheet', maxCount: 1 },
        { name: 'Pic', maxCount: 1 },
      ],
      { storage },
    ),
  )
  @UseGuards(CompanyAdminGuard)
  async addEmployee(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) createEmployeeDto: CreateEmployeeDto,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    
    const authData = (request as any).authData;
    if (authData) {
      createEmployeeDto.CompanyCode = authData.CompanyCode;
      createEmployeeDto.authUserId = authData.authUserId;
    }
    
    this.partnerService.addEmployee(createEmployeeDto);

    return { message: 'Employee created successfully' };
  }
}
