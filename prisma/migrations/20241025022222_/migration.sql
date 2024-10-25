/*
  Warnings:

  - You are about to drop the `MessagePoll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `messagePollid` on the `Message` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MessagePoll";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "messageId" TEXT NOT NULL PRIMARY KEY,
    "messageContent" TEXT NOT NULL,
    "messageAudioPath" TEXT NOT NULL
);
INSERT INTO "new_Message" ("messageAudioPath", "messageContent", "messageId") SELECT "messageAudioPath", "messageContent", "messageId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
