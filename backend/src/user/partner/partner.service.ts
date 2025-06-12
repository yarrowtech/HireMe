import { Injectable, UnauthorizedException } from "@nestjs/common";
import prisma from "src/prisma";
import { compareSync } from "bcryptjs";
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
            const encryptedData = encryptUserData(`${user.id}`, "admin")
            return {token, encryptedData};
        }
        else {
            throw new UnauthorizedException("Invalid credentials");
        }
    }
}