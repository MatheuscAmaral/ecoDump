/*
  Warnings:

  - Changed the type of `current_location` on the `dumpsters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "dumpsters" DROP COLUMN "current_location",
ADD COLUMN     "current_location" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "dumpsters" ADD CONSTRAINT "dumpsters_current_location_fkey" FOREIGN KEY ("current_location") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
