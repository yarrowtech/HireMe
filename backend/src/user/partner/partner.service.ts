import { Injectable, UnauthorizedException } from "@nestjs/common";
import prisma from "src/prisma";
import { compareSync, hashSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { CreateEmployeeDto } from "./dto/employeeCred.dto";

@Injectable()
export class PartnerService {
    async getPartnerDetails(partnerId: number): Promise<Object | null> {
        const partner = await prisma.partner.findUnique({
            where: {
                id: partnerId
            },
            select: {
                id: true,
                CompanyName: true,
                Contact: true,
                Email: true,
                Address: true,
                ESI: true,
                PF: true,
                PAN: true,
                PAN_No: true,
                MOA: true,
                CIN: true,
                GST: true,
                TradeLicense: true,
                MSMC: true,
                CreatedAt: true
            }
        });
        return partner;
    }

    async addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<string> {
        await prisma.employee.create({
            data: {
                ...createEmployeeDto,
                Amount: parseFloat(createEmployeeDto.Amount.toString()),
                Percentage: parseFloat(createEmployeeDto.Percentage.toString()),
                SuperiorId: createEmployeeDto.SuperiorId ? parseInt(createEmployeeDto.SuperiorId.toString()) : null,
            }
        })
        return "Employee created successfully"
    }
}