/*
  Warnings:

  - You are about to drop the column `AccessLevel` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `PartnerAccount` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CompanyCode` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Username` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_SuperiorId_fkey";

-- DropForeignKey
ALTER TABLE "PartnerAccount" DROP CONSTRAINT "PartnerAccount_CompanyCode_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "AccessLevel",
DROP COLUMN "Password",
DROP COLUMN "Username",
ADD COLUMN     "CompanyCode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "Password" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Username" TEXT NOT NULL;

-- DropTable
DROP TABLE "PartnerAccount";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_SuperiorId_fkey" FOREIGN KEY ("SuperiorId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_CompanyCode_fkey" FOREIGN KEY ("CompanyCode") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
