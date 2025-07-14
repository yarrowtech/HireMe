import { HttpException, Injectable } from "@nestjs/common";
import prisma from "src/prisma";
import * as jwt from "jsonwebtoken";

@Injectable()
export class UserService {

    async getUserDetails(token: string): Promise<Object> {
        const data = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET!) as { id: string, type: string };
        if (data.type === "superadmin") { 
            const user = await prisma.admin.findFirst({
                where: {
                    id: parseInt(data.id),
                },
                select: {
                    Username: true,
                    Email: true,
                }
            })
            if (!user) throw new HttpException("Invalid token", 400);
            return {...user, AccountType: "superadmin" }
        }
        else if (data.type === "comp") {
            const user = await prisma.partner.findFirst({
                where: {
                    id: parseInt(data.id),
                },
                select: {
                    Username: true,
                    id: true,
                },
            })
            if (!user) throw new HttpException("Invalid token", 400);
            return {...user, AccountType: "company" }
        }
        else if (data.type === "emp" || data.type === "admin" || data.type === "mng") {
            const user = await prisma.employee.findFirst({
                where: {
                    id: parseInt(data.id),
                },
                select: {
                    Username: true,
                    CompanyCode: true,
                },
            })
            if (!user) throw new HttpException("Invalid token", 400);
            return {...user, id: user?.CompanyCode, AccountType: data.type }
        }
        else throw new HttpException("Invalid token", 400);
    }

   
}