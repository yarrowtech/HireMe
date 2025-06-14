-- DropForeignKey
ALTER TABLE "PartnerAccount" DROP CONSTRAINT "PartnerAccount_CompanyCode_fkey";

-- AddForeignKey
ALTER TABLE "PartnerAccount" ADD CONSTRAINT "PartnerAccount_CompanyCode_fkey" FOREIGN KEY ("CompanyCode") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
