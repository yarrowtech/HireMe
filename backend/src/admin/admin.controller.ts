import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminLoginCredDto } from "./dto/adminLoginCred.dto";


@Controller("admin")
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post("auth/login")
    async login(@Body(new ValidationPipe()) loginCred: AdminLoginCredDto): Promise<Object> {
        const res = await this.adminService.login(loginCred.username, loginCred.password);        
        return {
            status: "success",
            message: res,
        }
    }
}