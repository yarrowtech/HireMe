import { Injectable } from "@nestjs/common";
import prisma from "src/prisma";
import { PartnerRequest, Prisma, RequestStatus } from "@prisma/client";


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

    private async generateUniquePartnerId(): Promise<number> {
        let uniqueId: number;
        let isUnique = false;

        while (!isUnique) {

            uniqueId = Math.floor(Math.random() * 900) + 100;
            
            const existingPartner = await prisma.partner.findUnique({
                where: { id: uniqueId }
            });
            
            if (!existingPartner) {
                isUnique = true;
            }
        }
        
        return uniqueId!;
    }

    async updatePartnerRequestStatus(id: number, status: RequestStatus): Promise<void> {
        const request = await prisma.partnerRequest.update({
            where: { id },
            data: { Status: status, UpdatedAt: new Date() }
        });

        if (status === RequestStatus.APPROVED) {
            const partnerId = await this.generateUniquePartnerId();
            
            const partnerData: Prisma.PartnerCreateInput = {
                id: partnerId,
                CompanyName: request.CompanyName,
                Contact: request.Contact,
                Email: request.Email,
                Address: request.Address,
                ESI: request.ESI,
                PF: request.PF,
                PAN: request.PAN,
                PAN_No: request.PAN_No,
                MOA: request.MOA,
                CIN: request.CIN,
                GST: request.GST,
                TradeLicense: request.TradeLicense,
                MSMC: request.MSMC,
            }
            
            await prisma.partner.create({
                data: partnerData
            });

            await prisma.partnerAccount.create({
                data: {
                    CompanyCode: partnerId,
                    Username: request.Email,
                    Password: "defaultPassword",
                }
            })
        }
    }
}
