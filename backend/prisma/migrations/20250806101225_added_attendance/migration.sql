-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "EmployeeId" INTEGER NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Present" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
