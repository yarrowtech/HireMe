/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Subscription";

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Mobile" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Pic" TEXT NOT NULL,
    "AadhaarNo" TEXT NOT NULL,
    "Aadhaar" TEXT NOT NULL,
    "PanNo" TEXT NOT NULL,
    "Pan" TEXT NOT NULL,
    "Voter" TEXT NOT NULL,
    "Qualification" TEXT NOT NULL,
    "Institution" TEXT NOT NULL,
    "YearOfPassing" TEXT NOT NULL,
    "Percentage" DOUBLE PRECISION NOT NULL,
    "Marksheet" TEXT NOT NULL,
    "AccountHolderName" TEXT NOT NULL,
    "AccountNumber" TEXT NOT NULL,
    "IFSCCode" TEXT NOT NULL,
    "BankName" TEXT NOT NULL,
    "Branch" TEXT NOT NULL,
    "AccountType" TEXT NOT NULL,
    "JoiningDate" TEXT NOT NULL,
    "Post" TEXT NOT NULL,
    "PostCategory" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "PaymentFrequency" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ManagerId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Email_key" ON "Employee"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Mobile_key" ON "Employee"("Mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_AadhaarNo_key" ON "Employee"("AadhaarNo");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_PanNo_key" ON "Employee"("PanNo");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_AccountNumber_key" ON "Employee"("AccountNumber");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_ManagerId_fkey" FOREIGN KEY ("ManagerId") REFERENCES "PartnerAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
