import { CanActivate, ExecutionContext, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import prisma from 'src/prisma';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class CompanyAdminGuard implements CanActivate {
async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(" ")[1];
            if (!token) {
                return false;
            }
            const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, type: string };
            if (!data)
                return false;
            if (data.type === "comp") {
                const user = await prisma.partner.findFirst({
                    where: {
                        id: parseInt(data.id)
                    },
                })

                if (!user) {
                    return false;
                }
                
                (request as any).authData = {
                    CompanyCode: user.id,
                    authUserId: null
                };
                
            }
            else if (data.type === "emp" || data.type === "admin" || data.type === "mng") {
                const user = await prisma.employee.findFirst({
                    where: {
                        id: parseInt(data.id)
                    },
                })

                if (!user) {
                    return false;
                }
                
                (request as any).authData = {
                    CompanyCode: user.CompanyCode,
                    authUserId: user.id
                };
            }
            else {
                return false;
            }
            return true;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new UnauthorizedException("Invalid token");
            }
            throw new BadRequestException("Invalid authentication data");
        }
    }
}