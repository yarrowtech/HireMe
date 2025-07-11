/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Username` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "Password" TEXT NOT NULL,
ADD COLUMN     "Username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Username_key" ON "Employee"("Username");
