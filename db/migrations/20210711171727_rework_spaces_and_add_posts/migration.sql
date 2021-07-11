/*
  Warnings:

  - You are about to drop the column `bubbleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Bubble` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BubbleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SpaceType" AS ENUM ('FLAT', 'HOUSE', 'TRIP');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('TEXT', 'POLL');

-- DropForeignKey
ALTER TABLE "_BubbleToUser" DROP CONSTRAINT "_BubbleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BubbleToUser" DROP CONSTRAINT "_BubbleToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bubbleId";

-- DropTable
DROP TABLE "Bubble";

-- DropTable
DROP TABLE "_BubbleToUser";

-- DropEnum
DROP TYPE "BubbleType";

-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "SpaceType" NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "PostType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "spaceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpaceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpaceToUser_AB_unique" ON "_SpaceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SpaceToUser_B_index" ON "_SpaceToUser"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToUser" ADD FOREIGN KEY ("A") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
