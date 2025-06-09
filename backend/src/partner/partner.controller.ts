import { BadRequestException, Body, Catch, Controller, ExceptionFilter, Get, Post, UseFilters, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { PartnerService } from "./partner.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { PartnerRequestDto } from "./dto/partnerRequest.dto";
import { extname } from "node:path";
import { unlinkSync } from "node:fs";
import { ArgumentsHost } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";


const storage = {storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        const name = `${uuidv4()}${ext}`;
        req.body[file.fieldname] = `uploads/${name}`;
        cb(null, name);
    }
})}

@Catch(BadRequestException)
class CleanupFileOnValidationFailFilter
  implements ExceptionFilter
{
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    unlinkSync(request.body.ESI);
    unlinkSync(request.body.PF);
    unlinkSync(request.body.PAN);
    unlinkSync(request.body.MOA);
    unlinkSync(request.body.GST);
    unlinkSync(request.body.TradeLicense);
    unlinkSync(request.body.MSMC);

    response
      .status(status)
      .json(exception.getResponse());
  }
}



@Controller("partner")
export class PartnerController {


    constructor(private partnerService: PartnerService) {
    }

    @Get()
    getPartner(): string {
        return this.partnerService.getPartner();
    }

    @Post("send-request")
    @UseFilters(CleanupFileOnValidationFailFilter)
    @UseInterceptors(FileFieldsInterceptor([
        { name: "ESI", maxCount: 1 },
        { name: "PF", maxCount: 1 },
        { name: "PAN", maxCount: 1 },
        { name: "MOA", maxCount: 1 },
        { name: "GST", maxCount: 1 },
        { name: "TradeLicense", maxCount: 1 },
        { name: "MSMC", maxCount: 1 }
    ], storage))
    sendPartnerRequest(@Body(new ValidationPipe()) requestData: PartnerRequestDto): Object {
        return requestData
    }
}


