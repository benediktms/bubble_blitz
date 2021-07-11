-- CreateEnum
CREATE TYPE "BubbleType" AS ENUM ('FLAT', 'HOUSE', 'TRIP');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bubbleId" INTEGER;

-- CreateTable
CREATE TABLE "Bubble" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "BubbleType" NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BubbleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BubbleToUser_AB_unique" ON "_BubbleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BubbleToUser_B_index" ON "_BubbleToUser"("B");

-- AddForeignKey
ALTER TABLE "_BubbleToUser" ADD FOREIGN KEY ("A") REFERENCES "Bubble"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BubbleToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
