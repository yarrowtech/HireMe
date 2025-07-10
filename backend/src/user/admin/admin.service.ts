import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import prisma from "src/prisma";
import * as jwt from "jsonwebtoken";



@Injectable()
export class AdminService {

    async login(username: string, password: string): Promise<{ token: string }> {
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
        const token = jwt.sign(JSON.stringify({id: user.id, type: "admin"}), process.env.JWT_SECRET!)
        return { token };
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