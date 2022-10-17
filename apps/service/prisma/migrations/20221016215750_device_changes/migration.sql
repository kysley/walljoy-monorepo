-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_accountId_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "authorized" SET DEFAULT false,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
