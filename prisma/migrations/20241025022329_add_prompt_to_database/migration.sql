/*
  Warnings:

  - Added the required column `prompt` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "messageId" TEXT NOT NULL PRIMARY KEY,
    "messageContent" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "messageAudioPath" TEXT NOT NULL
);
INSERT INTO "new_Message" ("messageAudioPath", "messageContent", "messageId") SELECT "messageAudioPath", "messageContent", "messageId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
