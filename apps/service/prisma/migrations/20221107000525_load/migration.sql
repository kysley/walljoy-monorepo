/*
  Warnings:

  - Added the required column `lastSeen` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL;
