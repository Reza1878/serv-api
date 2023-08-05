/*
  Warnings:

  - Made the column `gig_id` on table `gig_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `gig_reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "gig_reviews" DROP CONSTRAINT "gig_reviews_gig_id_fkey";

-- DropForeignKey
ALTER TABLE "gig_reviews" DROP CONSTRAINT "gig_reviews_user_id_fkey";

-- AlterTable
ALTER TABLE "gig_reviews" ALTER COLUMN "gig_id" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "gig_reviews" ADD CONSTRAINT "gig_reviews_gig_id_fkey" FOREIGN KEY ("gig_id") REFERENCES "gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gig_reviews" ADD CONSTRAINT "gig_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
