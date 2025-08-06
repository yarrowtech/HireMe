import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  Param,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerAccountCredDto } from './dto/partnerAccountCred.dto';
import { CompanyAdminGuard } from 'src/guards/company.guard';


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

  @Get('employees/:partnerId')
  @UseGuards(CompanyAdminGuard)
  async getPartnerEmployees(
    @Param('partnerId') partnerId: string,
  ): Promise<any[]> {
    const employees = await this.partnerService.getPartnerEmployees(
      parseInt(partnerId),
    );
    if (!employees) throw new BadRequestException('Failed to fetch employees');
    return employees;
  }
}