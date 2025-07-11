-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

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
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

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
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerRequest_pkey" PRIMARY KEY ("id")
);

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
    "CompanyCode" INTEGER NOT NULL,
    "JoiningDate" TEXT NOT NULL,
    "Post" TEXT NOT NULL,
    "PostCategory" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "PaymentFrequency" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "SuperiorId" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_Email_key" ON "Admin"("Email");

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
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_SuperiorId_fkey" FOREIGN KEY ("SuperiorId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_CompanyCode_fkey" FOREIGN KEY ("CompanyCode") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
