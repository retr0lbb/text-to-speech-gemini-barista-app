/*
  Warnings:

  - Added the required column `audioFile` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "audioFile" BYTEA NOT NULL;
