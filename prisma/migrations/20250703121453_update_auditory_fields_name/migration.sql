/*
  Warnings:

  - You are about to drop the column `createdAt` on the `auditory` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `auditory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `auditory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auditory" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);
