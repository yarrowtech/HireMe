import { BadRequestException, Body, Catch, Controller, ExceptionFilter, Get, HttpCode, Post, UploadedFiles, UseFilters, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { PartnerService } from "./request.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "node:path";
import { unlinkSync } from "node:fs";
import { ArgumentsHost } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { PartnerRequest, RequestStatus } from "@prisma/client";
import { PartnerRequestDto } from "./dto/partnerRequest.dto";
import { AdminGuard } from "src/guards/admin.guard";


const storage = diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        const name = `${uuidv4()}${ext}`;
        req.body[file.fieldname] = `uploads/${name}`;
        cb(null, name);
    }
})

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



@Controller("partner")
export class PartnerController {


    constructor(private partnerService: PartnerService) {
    }

    @Get("get-requests")
    @HttpCode(200)
    @UseGuards(AdminGuard)
    async getPartner(): Promise<PartnerRequest[]> {
        const requests = await this.partnerService.getPartnerRequests();
        return requests;
    }

    @Post("send-request")
    @HttpCode(201)
    @UseFilters(CleanupFileOnValidationFailFilter)
    @UseInterceptors(FileFieldsInterceptor([
        { name: "ESI", maxCount: 1 },
        { name: "PF", maxCount: 1 },
        { name: "PAN", maxCount: 1 },
        { name: "MOA", maxCount: 1 },
        { name: "GST", maxCount: 1 },
        { name: "TradeLicense", maxCount: 1 },
        { name: "MSMC", maxCount: 1 }
    ], {storage}))
    async sendPartnerRequest(
        @Body() requestData: any
    ): Promise<Object> {
        validatePartnerRequest(requestData);

        const message = await this.partnerService.sendPartnerRequest({ ...requestData, Status: RequestStatus.PENDING });
        return { status: "success", message };
    }

}

function validatePartnerRequest(requestData: any): requestData is PartnerRequestDto {

    // Required text fields (adjust as per your DTO)
    const requiredFields = ["CompanyName", "Contact", "Email", "Address", "CIN", "PAN_No"];
    requiredFields.forEach(field => {
        
        if (field === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestData[field])) {
            throw new BadRequestException(`Invalid email format: ${requestData[field]}`);
        }
        else if (field === "Contact" && !/^\d{10}$/.test(requestData[field])) {
            throw new BadRequestException(`Invalid contact number: ${requestData[field]}`);
        }
        else if (!requestData[field] || typeof requestData[field] !== "string" || requestData[field].trim() === "") {
            throw new BadRequestException(`Missing required field: ${field}`);
        }
    });

    // Required file fields (now in requestData as file paths)
    const requiredFiles = ["ESI", "PF", "PAN", "MOA", "GST", "TradeLicense", "MSMC"];
    requiredFiles.forEach(field => {
        if (!requestData[field] || typeof requestData[field] !== "string" || requestData[field].trim() === "") {
            throw new BadRequestException(`Missing required field: ${field}`);
        }
    });

    return true;
}


