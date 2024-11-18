-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL,
    "messageContent" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "messageAudioPath" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);
