import { Injectable } from "@nestjs/common";
import type { PartnerRequest, Prisma } from "generated/prisma";
import prisma from "src/prisma";


@Injectable()
export class PartnerService {
    async getPartnerRequests(): Promise<PartnerRequest[]> {
        const requests = await prisma.partnerRequest.findMany();
        return requests
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