-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objectives" (
    "id" SERIAL NOT NULL,
    "objective1" TEXT,
    "objective2" TEXT,
    "objective3" TEXT,
    "objective4" TEXT,
    "objective5" TEXT,
    "objectiveAchieved1" BOOLEAN DEFAULT false,
    "objectiveAchieved2" BOOLEAN DEFAULT false,
    "objectiveAchieved3" BOOLEAN DEFAULT false,
    "objectiveAchieved4" BOOLEAN DEFAULT false,
    "objectiveAchieved5" BOOLEAN DEFAULT false,
    "morningHabit" TEXT,
    "eveningHabit" TEXT,

    CONSTRAINT "Objectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Routine',
    "dateStart" DATE NOT NULL,
    "dateEnd" DATE NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "objectivesId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyForm" (
    "id" SERIAL NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "diary" TEXT,
    "date" DATE NOT NULL,
    "dayRating" INTEGER NOT NULL DEFAULT 0,
    "wakingUpHour" TIME,
    "bedtimeHour" TIME,
    "morningHabit" BOOLEAN NOT NULL DEFAULT false,
    "eveningHabit" BOOLEAN NOT NULL DEFAULT false,
    "routineId" INTEGER NOT NULL,
    "rightPath" BOOLEAN DEFAULT false,

    CONSTRAINT "DailyForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Routine_objectivesId_key" ON "Routine"("objectivesId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyForm_routineId_key" ON "DailyForm"("routineId");

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_objectivesId_fkey" FOREIGN KEY ("objectivesId") REFERENCES "Objectives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyForm" ADD CONSTRAINT "DailyForm_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
