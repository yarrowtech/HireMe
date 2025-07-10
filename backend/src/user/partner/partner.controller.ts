import { Body, Controller, Post, ValidationPipe, Get, UseGuards, Param, BadRequestException } from "@nestjs/common";
import { PartnerService } from "./partner.service";
import { CreateManagerAccountDto, PartnerAccountCredDto } from "./dto/partnerAccountCred.dto";
import { CompanyAdminGuard } from "src/guards/company.guard";


@Controller("partner")
export class PartnerController {

    constructor(private partnerService: PartnerService) {}

    @Get("details/:id")
    async getPartnerDetails(@Param("id") partnerId: string): Promise<Object | null> {
        const details = await this.partnerService.getPartnerDetails(parseInt(partnerId));
        if (!details) throw new BadRequestException("Invalid partner ID");
        return details;
    }

    @Post("auth/login")
    async partnerAccountLogin(@Body(new ValidationPipe()) partnerAccoundCred: PartnerAccountCredDto): Promise<{ token: string, encryptedData: string }> {
        return this.partnerService.partnerAccountLogin(partnerAccoundCred.companyCode, partnerAccoundCred.username, partnerAccoundCred.password);
    }
}