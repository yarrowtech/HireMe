import { Body, Controller, Post, Get, ValidationPipe, Headers, UseGuards, Param, BadRequestException } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminLoginCredDto } from "./dto/adminLoginCred.dto";
import { AdminGuard } from "src/guards/admin.guard";


@Controller("admin")
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post("auth/login")
    async login(@Body(new ValidationPipe()) loginCred: AdminLoginCredDto): Promise<Object> {
        const { token, encryptedData } = await this.adminService.login(loginCred.username, loginCred.password);        
        return {
            message: "Login successful",
            token: token,
            encryptedData: encryptedData
        }
    }

    @Get("partner-list")
    @UseGuards(AdminGuard)
    async getPartnerList(): Promise<Object[]> {
        return await this.adminService.getPartnerList();
    }

    @Get("partner-details/:id")
    @UseGuards(AdminGuard)
    async getPartnerDetails(@Param("id") partnerId: string): Promise<Object | null> {
        const details = await this.adminService.getPartnerDetails(parseInt(partnerId));
        if (!details) throw new BadRequestException("Invalid partner ID");
        return details;
    }
}