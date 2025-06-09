import { Injectable } from "@nestjs/common";
import type { PartnerRequest } from "generated/prisma";


@Injectable()
export class PartnerService {
    getPartner(): string {
        return "This is the partner service";
    }

    sendPartnerRequest(partner: PartnerRequest): string {
        return "Partner request sent successfully";
    }
}