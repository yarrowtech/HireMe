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

    async createManagerAccount(CompanyCode: number, Username: string, Password: string, AccountType: string): Promise<string> {
        const existingUser = await prisma.partnerAccount.findFirst({
            where: {
                AND: [
                    { CompanyCode: CompanyCode },
                    { Username: Username }
                ]
            }
        });
        if (existingUser) {
            throw new UnauthorizedException("Username already exists for this company");
        }

        const hashedPassword = hashSync(Password, 10);
        await prisma.partnerAccount.create({
            data: {
                CompanyCode,
                Username,
                AccountType,
                Password: hashedPassword,
            }
        });
        return `Manager account created successfully`;
    }
}