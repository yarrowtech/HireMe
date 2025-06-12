/*
  Warnings:

  - You are about to drop the column `type` on the `PartnerAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PartnerAccount" DROP COLUMN "type",
ADD COLUMN     "AccountType" TEXT NOT NULL DEFAULT 'admin';
