/*
  Warnings:

  - You are about to drop the column `currentLoggedInAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoggedInAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentLoggedInAt",
DROP COLUMN "lastLoggedInAt";
