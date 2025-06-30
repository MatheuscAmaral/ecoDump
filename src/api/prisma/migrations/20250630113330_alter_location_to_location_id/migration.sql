/*
  Warnings:

  - You are about to drop the column `location` on the `operations` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `operations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "operations" DROP COLUMN "location",
ADD COLUMN     "location_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
