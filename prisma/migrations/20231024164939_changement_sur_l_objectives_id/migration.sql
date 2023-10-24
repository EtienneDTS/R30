/*
  Warnings:

  - Made the column `objectivesId` on table `Routine` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DailyForm" DROP CONSTRAINT "DailyForm_routineId_fkey";

-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_objectivesId_fkey";

-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_userId_fkey";

-- DropIndex
DROP INDEX "DailyForm_routineId_key";

-- AlterTable
ALTER TABLE "Routine" ALTER COLUMN "objectivesId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_objectivesId_fkey" FOREIGN KEY ("objectivesId") REFERENCES "Objectives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyForm" ADD CONSTRAINT "DailyForm_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
