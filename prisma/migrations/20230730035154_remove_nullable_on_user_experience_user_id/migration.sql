/*
  Warnings:

  - Made the column `user_id` on table `user_experiences` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user_experiences" DROP CONSTRAINT "user_experiences_user_id_fkey";

-- AlterTable
ALTER TABLE "user_experiences" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user_experiences" ADD CONSTRAINT "user_experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
