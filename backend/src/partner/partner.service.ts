import { Injectable } from "@nestjs/common";
import type { Prisma } from "generated/prisma";
import prisma from "src/prisma";


@Injectable()
export class PartnerService {
    getPartner(): string {
        return "This is the partner service";
    }

    async sendPartnerRequest(partner: Prisma.PartnerRequestCreateInput): Promise<string> {
        await prisma.partnerRequest.create({
            data: {
                ...partner
            }
        });
        return "Partner request sent successfully";
    }
}