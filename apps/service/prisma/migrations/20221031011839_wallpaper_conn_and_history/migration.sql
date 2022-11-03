/*
  Warnings:

  - You are about to drop the column `activeCollectionId` on the `Device` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_activeCollectionId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "activeCollectionId",
ADD COLUMN     "followedCollectionId" INTEGER,
ADD COLUMN     "selectWallpaperId" INTEGER;

-- AlterTable
ALTER TABLE "Wallpaper" ADD COLUMN     "deviceHistoryDeviceId" TEXT;

-- CreateTable
CREATE TABLE "DeviceHistory" (
    "deviceId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceHistory_deviceId_key" ON "DeviceHistory"("deviceId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_followedCollectionId_fkey" FOREIGN KEY ("followedCollectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_selectWallpaperId_fkey" FOREIGN KEY ("selectWallpaperId") REFERENCES "Wallpaper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceHistory" ADD CONSTRAINT "DeviceHistory_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallpaper" ADD CONSTRAINT "Wallpaper_deviceHistoryDeviceId_fkey" FOREIGN KEY ("deviceHistoryDeviceId") REFERENCES "DeviceHistory"("deviceId") ON DELETE SET NULL ON UPDATE CASCADE;
