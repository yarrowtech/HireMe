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
} from '@nestjs/common';
import { Response, Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { unlinkSync } from 'node:fs';
import { extname } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { PartnerService } from './partner.service';
import { PartnerAccountCredDto } from './dto/partnerAccountCred.dto';
import { CreateEmployeeDto } from './dto/employeeCred.dto';
import { CompanyAdminGuard } from 'src/guards/company.guard';

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
class CleanupFileOnValidationFailFilter
  implements ExceptionFilter
{
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (request.body.ESI) unlinkSync(request.body.ESI);
    if (request.body.PF) unlinkSync(request.body.PF);
    if (request.body.PAN) unlinkSync(request.body.PAN);
    if (request.body.MOA) unlinkSync(request.body.MOA);
    if (request.body.GST) unlinkSync(request.body.GST);
    if (request.body.TradeLicense) unlinkSync(request.body.TradeLicense);
    if (request.body.MSMC) unlinkSync(request.body.MSMC);

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
  ): Promise<{ token: string }> {
    return this.partnerService.partnerAccountLogin(
      partnerAccoundCred.companyCode,
      partnerAccoundCred.username,
      partnerAccoundCred.password,
    );
  }

  @Post('add-employee')
  @UseGuards(CompanyAdminGuard)
  @HttpCode(201)
  @UseFilters(CleanupFileOnValidationFailFilter)
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
  async addEmployee(
    @Body(new ValidationPipe()) createEmployeeDto: CreateEmployeeDto,
  ): Promise<string> {
    return this.partnerService.addEmployee(createEmployeeDto);
  }
}
