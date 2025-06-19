import { Body, Controller, Post, ValidationPipe, Get, UseGuards } from "@nestjs/common";
import { PartnerService } from "./partner.service";
import { CreateManagerAccountDto, PartnerAccountCredDto } from "./dto/partnerAccountCred.dto";
import { CompanyAdminGuard } from "src/guards/company.guard";


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
    
    @Post("create-manager-account")
    @UseGuards(CompanyAdminGuard)
    async createManagerAccount(@Body(new ValidationPipe()) partnerAccount: CreateManagerAccountDto): Promise<Object> {
        const message = await this.partnerService.createManagerAccount(partnerAccount.companyCode, partnerAccount.username, partnerAccount.password, partnerAccount.accountType)
        return {message}
    }
}