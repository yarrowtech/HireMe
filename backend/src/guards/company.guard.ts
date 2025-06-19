import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import prisma from 'src/prisma';
import { decryptUserData } from 'src/utils/encryption';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CompanyAdminGuard implements CanActivate {
async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(" ")[1];
            const metadata = request.headers.metadata;
            if (!token) {
                return false;
            }
            if (!jwt.verify(token, process.env.JWT_SECRET!))
                return false;

            if (!metadata || typeof metadata !== "string") {
                return false;
            }

            const { userId, type } = decryptUserData(metadata);

            if (type === "company") {
                const user = await prisma.partnerAccount.findFirst({
                    where: {
                        id: parseInt(userId)
                    },
                })

                if (!user) {
                    return false;
                }

                if (user.AccountType !== "admin") {
                    return false;
                }
            }
            else {
                return false;
            }

            return true;
        } catch (error) {
            throw new BadRequestException("Invalid authentication data");
        }
    }
}