import { Body, Controller, Post, ValidationPipe, Get } from "@nestjs/common";
import { PartnerService } from "./partner.service";
import { PartnerAccountCredDto } from "./dto/partnerAccountCred.dto";


@Controller("partner")
export class PartnerController {

    constructor(private partnerService: PartnerService) {}

    @Get("get")
    getPartner(): string {
        return "Partner details retrieved successfully";
    }

    @Post("auth/login")
    async partnerAccountLogin(@Body(new ValidationPipe()) partnerAccoundCred: PartnerAccountCredDto): Promise<{ token: string, encryptedData: string }> {
        return this.partnerService.partnerAccountLogin(partnerAccoundCred.companyCode, partnerAccoundCred.username, partnerAccoundCred.password);
    }
}