/*
  Warnings:

  - Added the required column `why` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyForm" ADD COLUMN     "todo1" TEXT,
ADD COLUMN     "todo2" TEXT,
ADD COLUMN     "todo3" TEXT,
ADD COLUMN     "todo4" TEXT,
ADD COLUMN     "todo5" TEXT,
ADD COLUMN     "todoChecked1" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "todoChecked2" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "todoChecked3" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "todoChecked4" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "todoChecked5" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "todoPriority" TEXT;

-- AlterTable
ALTER TABLE "Objectives" ADD COLUMN     "objectiveRanking1" INTEGER,
ADD COLUMN     "objectiveRanking2" INTEGER,
ADD COLUMN     "objectiveRanking3" INTEGER,
ADD COLUMN     "objectiveRanking4" INTEGER,
ADD COLUMN     "objectiveRanking5" INTEGER;

-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "why" TEXT NOT NULL;
