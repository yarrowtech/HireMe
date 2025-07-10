import { Injectable, UnauthorizedException } from "@nestjs/common";
import prisma from "src/prisma";
import { compareSync, hashSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { encryptUserData } from "src/utils/encryption";

@Injectable()
export class PartnerService {

    async partnerAccountLogin(companyCode: number, username: string, password: string): Promise<{ token: string, encryptedData: string }> {
        const user = await prisma.partnerAccount.findFirst({
            where: {
                AND: [
                    { CompanyCode: companyCode },
                    { Username: username }
                ]
            }
        })
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        if (compareSync(password, user.Password)) {
            const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET!)
            const encryptedData = encryptUserData(`${user.id}`, "company")
            return {token, encryptedData};
        }
        else {
            throw new UnauthorizedException("Invalid credentials");
        }
    }
    async getPartnerDetails(partnerId: number): Promise<Object | null> {
        const partner = await prisma.partner.findUnique({
            where: {
                id: partnerId
            },
            select: {
                id: true,
                CompanyName: true,
                Contact: true,
                Email: true,
                Address: true,
                ESI: true,
                PF: true,
                PAN: true,
                PAN_No: true,
                MOA: true,
                CIN: true,
                GST: true,
                TradeLicense: true,
                MSMC: true,
                CreatedAt: true
            }
        });
        return partner;
    }
}