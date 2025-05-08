-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "tbl_users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_challenges" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "tbl_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tbl_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_challenge_participant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_challenge_participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_username_key" ON "tbl_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_category_name_key" ON "tbl_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_challenge_participant_userId_challengeId_key" ON "tbl_challenge_participant"("userId", "challengeId");

-- AddForeignKey
ALTER TABLE "tbl_challenges" ADD CONSTRAINT "tbl_challenges_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_challenges" ADD CONSTRAINT "tbl_challenges_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tbl_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_challenge_participant" ADD CONSTRAINT "tbl_challenge_participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_challenge_participant" ADD CONSTRAINT "tbl_challenge_participant_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "tbl_challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
