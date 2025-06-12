-- CreateTable
CREATE TABLE "PartnerAccount" (
    "id" SERIAL NOT NULL,
    "CompanyCode" INTEGER NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'admin',

    CONSTRAINT "PartnerAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartnerAccount" ADD CONSTRAINT "PartnerAccount_CompanyCode_fkey" FOREIGN KEY ("CompanyCode") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
