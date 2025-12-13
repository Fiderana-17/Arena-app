-- Create Enums
CREATE TYPE "public"."Role" AS ENUM ('PLAYER', 'ADMIN', 'ORGANIZER');
CREATE TYPE "public"."Game" AS ENUM ('MLBB', 'PUBG');
CREATE TYPE "public"."BracketFormat" AS ENUM ('SINGLE_ELIM', 'DOUBLE_ELIM', 'ROUND_ROBIN');
CREATE TYPE "public"."TournamentStatus" AS ENUM ('REGISTERING', 'CHECKIN', 'ACTIVE', 'FINISHED');
CREATE TYPE "public"."TeamStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DISQUALIFIED');
CREATE TYPE "public"."MatchStatus" AS ENUM ('SCHEDULED', 'LIVE', 'COMPLETED', 'FORFEIT');

-- CreateTable User
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'PLAYER',
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable Team
CREATE TABLE "public"."Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "game" "public"."Game" NOT NULL,
    "captainId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable Player
CREATE TABLE "public"."Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable Tournament
CREATE TABLE "public"."Tournament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "game" "public"."Game" NOT NULL,
    "prize" TEXT NOT NULL,
    "maxTeams" INTEGER NOT NULL,
    "format" "public"."BracketFormat" NOT NULL DEFAULT 'SINGLE_ELIM',
    "status" "public"."TournamentStatus" NOT NULL DEFAULT 'REGISTERING',
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable Registration
CREATE TABLE "public"."Registration" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "seed" INTEGER,
    "status" "public"."TeamStatus" NOT NULL DEFAULT 'CONFIRMED',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable Match
CREATE TABLE "public"."Match" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,
    "matchNumber" INTEGER NOT NULL,
    "team1Id" INTEGER NOT NULL,
    "team2Id" INTEGER NOT NULL,
    "team1Score" INTEGER DEFAULT 0,
    "team2Score" INTEGER DEFAULT 0,
    "winnerTeamId" INTEGER,
    "status" "public"."MatchStatus" NOT NULL DEFAULT 'SCHEDULED',
    "scheduledAt" TIMESTAMP(3),
    "playedAt" TIMESTAMP(3),

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable Ranking
CREATE TABLE "public"."Ranking" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- Create Indexes
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
CREATE UNIQUE INDEX "Registration_teamId_tournamentId_key" ON "public"."Registration"("teamId", "tournamentId");
CREATE UNIQUE INDEX "Match_tournamentId_round_matchNumber_key" ON "public"."Match"("tournamentId", "round", "matchNumber");
CREATE UNIQUE INDEX "Ranking_tournamentId_teamId_key" ON "public"."Ranking"("tournamentId", "teamId");

-- AddForeignKeys
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."Tournament" ADD CONSTRAINT "Tournament_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."Registration" ADD CONSTRAINT "Registration_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Registration" ADD CONSTRAINT "Registration_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "public"."Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "public"."Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."Ranking" ADD CONSTRAINT "Ranking_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "public"."Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Ranking" ADD CONSTRAINT "Ranking_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
