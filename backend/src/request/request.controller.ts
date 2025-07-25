import {
  BadRequestException,
  Body,
  Catch,
  Controller,
  ExceptionFilter,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { unlinkSync } from 'node:fs';
import { ArgumentsHost } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { PartnerRequest, RequestStatus } from '@prisma/client';
import { AdminGuard } from 'src/guards/admin.guard';
import { PartnerRequestDto } from './dto/partnerRequest.dto';

const storage = diskStorage({
  destination: process.env.PARTNER_FILE_PATH || 'uploads/comp',
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const name = `${uuidv4()}${ext}`;
    req.body[file.fieldname] =
      `${process.env.PARTNER_FILE_PATH || 'uploads/comp'}/${name}`;
    cb(null, name);
  },
});

@Catch(BadRequestException)
class CleanupFileOnErrorFilter implements ExceptionFilter {
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

    response.status(status).json(exception.getResponse());
  }
}

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Get('get-requests')
  @HttpCode(200)
  @UseGuards(AdminGuard)
  async getPartner(): Promise<Object[]> {
    const requests = await this.requestService.getPartnerRequests();
    return requests;
  }

  @Get('get-request-details/:id')
  @HttpCode(200)
  @UseGuards(AdminGuard)
  async getRequestDetails(@Param('id') id: string): Promise<PartnerRequest> {
    const request = await this.requestService.getPartnerRequestDetails(
      parseInt(id),
    );
    if (!request) {
      throw new BadRequestException('Request not found');
    }
    return request;
  }

  @Post('send-request')
  @HttpCode(201)
  @UseFilters(CleanupFileOnErrorFilter)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'ESI', maxCount: 1 },
        { name: 'PF', maxCount: 1 },
        { name: 'PAN', maxCount: 1 },
        { name: 'MOA', maxCount: 1 },
        { name: 'GST', maxCount: 1 },
        { name: 'TradeLicense', maxCount: 1 },
        { name: 'MSMC', maxCount: 1 },
      ],
      { storage },
    ),
  )
  async sendPartnerRequest(
    @Body(new ValidationPipe()) requestData: PartnerRequestDto,
  ): Promise<Object> {
    const message = await this.requestService.sendPartnerRequest({
      ...requestData,
      Status: RequestStatus.PENDING,
    });
    return { status: 'success', message };
  }

  @Put('approve-request/:id')
  @HttpCode(200)
  @UseGuards(AdminGuard)
  async approveRequest(@Param('id') id: string): Promise<Object> {
    await this.requestService.updatePartnerRequestStatus(
      parseInt(id),
      'APPROVED',
    );
    return { status: 'success', message: 'Request approved successfully' };
  }

  @Put('reject-request/:id')
  @HttpCode(200)
  @UseGuards(AdminGuard)
  async rejectRequest(@Param('id') id: string): Promise<Object> {
    await this.requestService.updatePartnerRequestStatus(
      parseInt(id),
      'REJECTED',
    );
    return { status: 'success', message: 'Request rejected successfully' };
  }
}
