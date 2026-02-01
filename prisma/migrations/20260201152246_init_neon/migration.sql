-- CreateTable
CREATE TABLE "Signal" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "entryPrice" DOUBLE PRECISION,
    "targetPrice" DOUBLE PRECISION,
    "stopLoss" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Signal_pkey" PRIMARY KEY ("id")
);
