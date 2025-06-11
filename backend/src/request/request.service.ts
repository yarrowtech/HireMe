import { Injectable } from "@nestjs/common";
import prisma from "src/prisma";
import { PartnerRequest, Prisma } from "@prisma/client";


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