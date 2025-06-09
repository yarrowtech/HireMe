import { Module } from "@nestjs/common";
import { PartnerController } from "./request.controller";
import { PartnerService } from "./request.service";



@Module({
    controllers: [PartnerController],
    providers: [PartnerService]
})
export class PartnerModule {}