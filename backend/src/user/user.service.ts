import { HttpException, Injectable } from "@nestjs/common";
import prisma from "src/prisma";
import * as jwt from "jsonwebtoken";

@Injectable()
export class UserService {

    async getUserDetails(token: string): Promise<Object> {
        const data = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET!) as { id: string, type: string };
        if (data.type === "admin") { 
            const user = await prisma.admin.findFirst({
                where: {
                    id: parseInt(data.id),
                },
                select: {
                    Username: true,
                    Email: true,
                }
            })
            return {...user, AccountType: "admin" }
        }
        else if (data.type === "company") {
            const user = await prisma.partnerAccount.findFirst({
                where: {
                    id: parseInt(data.id),
                },
                select: {
                    Username: true,
                    Company: {
                        select: {
                            id: true,
                        }
                    }
                },
            })
            return {...user, AccountType: "company" }
        }
        else throw new HttpException("Invalid metadata", 400);
    }

   
}