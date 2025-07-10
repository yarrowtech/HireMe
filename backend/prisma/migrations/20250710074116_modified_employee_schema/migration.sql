/*
  Warnings:

  - You are about to drop the column `ManagerId` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `SuperiorId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_ManagerId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "ManagerId",
ADD COLUMN     "SuperiorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_SuperiorId_fkey" FOREIGN KEY ("SuperiorId") REFERENCES "PartnerAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
