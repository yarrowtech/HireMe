/*
  Warnings:

  - Added the required column `AccessLevel` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('EMPLOYEE', 'ADMIN', 'MANAGER');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "AccessLevel" "AccessLevel" NOT NULL;
