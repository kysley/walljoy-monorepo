/*
  Warnings:

  - The primary key for the `CollectionWallpaper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `selectWallpaperId` on the `Device` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[collectionId,wallpaperId]` on the table `CollectionWallpaper` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_selectWallpaperId_fkey";

-- AlterTable
ALTER TABLE "CollectionWallpaper" DROP CONSTRAINT "CollectionWallpaper_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CollectionWallpaper_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CollectionWallpaper_id_seq";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "selectWallpaperId",
ADD COLUMN     "wallpaperId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "CollectionWallpaper_collectionId_wallpaperId_key" ON "CollectionWallpaper"("collectionId", "wallpaperId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_wallpaperId_fkey" FOREIGN KEY ("wallpaperId") REFERENCES "Wallpaper"("id") ON DELETE SET NULL ON UPDATE CASCADE;
