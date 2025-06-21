import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import prisma from "src/prisma";
import * as jwt from "jsonwebtoken";
import { encryptUserData } from "src/utils/encryption";



@Injectable()
export class AdminService {

    async login(username: string, password: string): Promise<{ token: string, encryptedData: string }> {
        const user = await prisma.admin.findFirst({
            where: {
                Username: username,
            }
        })
        if (!user) {
            throw new UnauthorizedException("Invalid username or password");
        }
        if (!compareSync(password, user.Password)) {
            throw new UnauthorizedException("Invalid username or password");
        }
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET!)
        const encryptedData = encryptUserData(`${user.id}`, "admin")
        return { token, encryptedData };
    }

    async getPartnerList(): Promise<Object[]> {
        const partners = await prisma.partner.findMany({
            select: {
                id: true,
                CompanyName: true
            }
        });
        return partners;
    }
}