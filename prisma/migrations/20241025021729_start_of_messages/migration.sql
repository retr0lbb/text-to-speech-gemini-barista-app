-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL PRIMARY KEY,
    "messageContent" TEXT NOT NULL,
    "messageAudioPath" TEXT NOT NULL,
    "messagePollid" TEXT,
    CONSTRAINT "Message_messagePollid_fkey" FOREIGN KEY ("messagePollid") REFERENCES "MessagePoll" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MessagePoll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subject" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
