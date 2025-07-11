import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma';
import { PartnerRequest, Prisma, RequestStatus } from '@prisma/client';
import { hashSync } from 'bcryptjs';

@Injectable()
export class RequestService {
  async getPartnerRequests(): Promise<Object[]> {
    const requests = await prisma.partnerRequest.findMany({
      select: {
        Status: true,
        id: true,
        CompanyName: true,
      },
    });
    return requests;
  }

  async getPartnerRequestDetails(id: number): Promise<PartnerRequest | null> {
    const request = await prisma.partnerRequest.findUnique({
      where: { id },
    });
    return request;
  }

  async sendPartnerRequest(
    partner: Prisma.PartnerRequestCreateInput,
  ): Promise<string> {
    await prisma.partnerRequest.create({
      data: {
        ...partner,
      },
    });
    return 'Partner request sent successfully';
  }

  private async generateUniquePartnerId(): Promise<number> {
    let uniqueId: number;
    let isUnique = false;

    while (!isUnique) {
      uniqueId = Math.floor(Math.random() * 900) + 100;

      const existingPartner = await prisma.partner.findUnique({
        where: { id: uniqueId },
      });

      if (!existingPartner) {
        isUnique = true;
      }
    }

    return uniqueId!;
  }

  private generateUsername(companyName: string): string {
    const companyPrefix = companyName
      .replace(/\s+/g, '')
      .replace(/-/g, '')
      .toLowerCase()
      .substring(0, 4);
    return `comp-${companyPrefix}`;
  }

  async updatePartnerRequestStatus(
    id: number,
    status: RequestStatus,
  ): Promise<void> {
    const request = await prisma.partnerRequest.update({
      where: { id },
      data: { Status: status, UpdatedAt: new Date() },
    });

    if (status === RequestStatus.APPROVED) {
      const partnerId = await this.generateUniquePartnerId();
      const password = hashSync('defaultPassword', 10);
    const username = this.generateUsername(request.CompanyName)
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
        Username: username,
        Password: password
      };

      await prisma.partner.create({
        data: partnerData,
      });
    }
  }
}
