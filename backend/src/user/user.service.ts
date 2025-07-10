import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { decryptUserData } from "src/utils/encryption";
import prisma from "src/prisma";

@Injectable()
export class UserService {

    async getUserDetails(metadata: string): Promise<Object> {
        const { userId, type} = decryptUserData(metadata)
        if (type === "admin") { 
            const data = await prisma.admin.findFirst({
                where: {
                    id: parseInt(userId),
                },
                select: {
                    Username: true,
                    Email: true,
                }
            })
            if (!data) {
                throw new UnauthorizedException("User not found");
            }
            return {...data, AccountType: "admin" }
        }
        else if (type === "company") {
            const data = await prisma.partnerAccount.findFirst({
                where: {
                    id: parseInt(userId),
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
            if (!data) {
                throw new UnauthorizedException("User not found");
            }
            return {...data, AccountType: "company" }
        }
        else throw new HttpException("Invalid metadata", 400);
    }

   
}