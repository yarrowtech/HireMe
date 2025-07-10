/*
  Warnings:

  - You are about to drop the column `AccountType` on the `PartnerAccount` table. All the data in the column will be lost.
  - Added the required column `Password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Username` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "AccessLevel" TEXT NOT NULL DEFAULT 'employee',
ADD COLUMN     "Password" TEXT NOT NULL,
ADD COLUMN     "Username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PartnerAccount" DROP COLUMN "AccountType";
