/*
  Warnings:

  - You are about to drop the column `rewiew` on the `gig_reviews` table. All the data in the column will be lost.
  - Added the required column `review` to the `gig_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gig_reviews" DROP COLUMN "rewiew",
ADD COLUMN     "review" TEXT NOT NULL;
