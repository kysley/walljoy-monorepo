-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_activeCollectionId_fkey" FOREIGN KEY ("activeCollectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
