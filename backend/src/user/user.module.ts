import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AdminController } from "./admin/admin.controller";
import { AdminService } from "./admin/admin.service";
import { PartnerController } from "./partner/partner.controller";
import { PartnerService } from "./partner/partner.service";



@Module({
    controllers: [UserController, AdminController, PartnerController],
    providers: [UserService, AdminService, PartnerService]
})
export class UserModule {}