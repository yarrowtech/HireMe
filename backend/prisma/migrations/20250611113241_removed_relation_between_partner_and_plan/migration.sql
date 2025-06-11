/*
  Warnings:

  - You are about to drop the column `PlanId` on the `Partner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_PlanId_fkey";

-- DropIndex
DROP INDEX "Partner_PlanId_key";

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "PlanId";
