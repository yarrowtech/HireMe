import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AdminController } from "./admin/admin.controller";
import { AdminService } from "./admin/admin.service";



@Module({
    controllers: [UserController, AdminController],
    providers: [UserService, AdminService]
})
export class UserModule {}