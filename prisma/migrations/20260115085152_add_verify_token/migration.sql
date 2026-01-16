-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyExpiredAt" TIMESTAMP(3),
ADD COLUMN     "verifyToken" TEXT;
