/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Partner" (
    "id" INTEGER NOT NULL,
    "CompanyName" TEXT NOT NULL,
    "Contact" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "ESI" TEXT NOT NULL,
    "PF" TEXT NOT NULL,
    "PAN" TEXT NOT NULL,
    "PAN_No" TEXT NOT NULL,
    "MOA" TEXT NOT NULL,
    "CIN" TEXT NOT NULL,
    "GST" TEXT NOT NULL,
    "TradeLicense" TEXT NOT NULL,
    "MSMC" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "PlanId" INTEGER NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerRequest" (
    "id" SERIAL NOT NULL,
    "CompanyName" TEXT NOT NULL,
    "Contact" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "ESI" TEXT NOT NULL,
    "PF" TEXT NOT NULL,
    "PAN" TEXT NOT NULL,
    "PAN_No" TEXT NOT NULL,
    "MOA" TEXT NOT NULL,
    "CIN" TEXT NOT NULL,
    "GST" TEXT NOT NULL,
    "TradeLicense" TEXT NOT NULL,
    "MSMC" TEXT NOT NULL,
    "Status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "Plan" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_PlanId_key" ON "Partner"("PlanId");

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_PlanId_fkey" FOREIGN KEY ("PlanId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
