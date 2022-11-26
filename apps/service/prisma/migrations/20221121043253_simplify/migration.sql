/*
  Warnings:

  - You are about to drop the column `followedCollectionId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `deviceHistoryDeviceId` on the `Wallpaper` table. All the data in the column will be lost.
  - You are about to drop the `DeviceHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToWallpaper` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_followedCollectionId_fkey";

-- DropForeignKey
ALTER TABLE "DeviceHistory" DROP CONSTRAINT "DeviceHistory_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "Wallpaper" DROP CONSTRAINT "Wallpaper_deviceHistoryDeviceId_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToWallpaper" DROP CONSTRAINT "_CollectionToWallpaper_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToWallpaper" DROP CONSTRAINT "_CollectionToWallpaper_B_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "followedCollectionId",
ADD COLUMN     "followingId" INTEGER;

-- AlterTable
ALTER TABLE "Wallpaper" DROP COLUMN "deviceHistoryDeviceId";

-- DropTable
DROP TABLE "DeviceHistory";

-- DropTable
DROP TABLE "_CollectionToWallpaper";

-- CreateTable
CREATE TABLE "CollectionWallpaper" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "wallpaperId" INTEGER NOT NULL,

    CONSTRAINT "CollectionWallpaper_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionWallpaper" ADD CONSTRAINT "CollectionWallpaper_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionWallpaper" ADD CONSTRAINT "CollectionWallpaper_wallpaperId_fkey" FOREIGN KEY ("wallpaperId") REFERENCES "Wallpaper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
