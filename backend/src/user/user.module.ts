import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AdminController } from "./admin/admin.controller";
import { AdminService } from "./admin/admin.service";
import { PartnerController } from "./partner/partner.controller";
import { PartnerService } from "./partner/partner.service";
import { EmployeeService } from "./partner/employee.service";
import { EmployeeController } from "./partner/employee.controller";



@Module({
    controllers: [UserController, AdminController, PartnerController, EmployeeController],
    providers: [UserService, AdminService, PartnerService, EmployeeService]
})
export class UserModule {}