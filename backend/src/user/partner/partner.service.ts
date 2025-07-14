import { Injectable, UnauthorizedException } from '@nestjs/common';
import prisma from 'src/prisma';
import { compareSync, hashSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CreateEmployeeDto } from './dto/employeeCred.dto';
import { AccessLevel, Prisma } from '@prisma/client';

@Injectable()
export class PartnerService {
  async getPartnerDetails(partnerId: number): Promise<Object | null> {
    const partner = await prisma.partner.findUnique({
      where: {
        id: partnerId,
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
        CreatedAt: true,
      },
    });
    return partner;
  }

  private async generateUniqueUsername(name: string): Promise<string> {
    let username: string;
    const prefix = 'emp';
    const namePrefix = name.substring(0, 4).toLowerCase();
    let counter = 1;
    do {
      username = `${prefix}-${namePrefix}${counter}`;
      counter++;
    } while (
      await prisma.employee.findFirst({ where: { Username: username } })
    );
    return username;
  }

  async addEmployee(createEmployeeDto: CreateEmployeeDto) {
    const username = await this.generateUniqueUsername(createEmployeeDto.Name);
    const { authUserId, AccessLevel: accessLevelString, ...employeeData } = createEmployeeDto;
    
    const accessLevelKey = accessLevelString.toUpperCase();
    const accessLevelEnum = AccessLevel[accessLevelKey];
    
    await prisma.employee.create({
      data: {
        ...employeeData,
        Username: username,
        Password: hashSync(createEmployeeDto.Password, 10),
        SuperiorId: authUserId,
        AccessLevel: accessLevelEnum,
      },
    });
  }

  async login(
    code: number,
    username: string,
    password: string,
  ): Promise<{ token: string }> {
    const parts = username.split('-');
    if (parts.length !== 2) {
        throw new UnauthorizedException('Invalid username format');
    }
    let account;
    if (parts[0] === 'comp') {
      account = await prisma.partner.findFirst({
        where: {
          id: code,
          Username: username,
        },
      });
    } else if (parts[0] === 'emp') {
      account = await prisma.employee.findFirst({
        where: {
          CompanyCode: code,
          Username: username,
        },
      });
    } else {
      throw new UnauthorizedException('Invalid account type');
    }

    if (!account || !compareSync(password, account.Password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let type = "comp"
    if (parts[0] !== "comp") {
      switch(account.AccessLevel) {
        case AccessLevel.ADMIN:
          type = "admin";
          break;
        case AccessLevel.EMPLOYEE:
          type = "emp";
          break;
        case AccessLevel.MANAGER:
          type = "mng";
          break;
        default:
          throw new UnauthorizedException('Invalid access level');
      }
    }

    const token = jwt.sign(
      { id: account.id, type },
      process.env.JWT_SECRET!,
    );
    return { token };
  }
}
