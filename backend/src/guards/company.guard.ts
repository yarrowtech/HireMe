import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import prisma from 'src/prisma';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CompanyAdminGuard implements CanActivate {
async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(" ")[1];
            if (!token) {
                return false;
            }
            const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, type: string };
            if (!data)
                return false;
            if (data.type === "company") {
                const user = await prisma.partnerAccount.findFirst({
                    where: {
                        id: parseInt(data.id)
                    },
                })

                if (!user) {
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