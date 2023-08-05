/*
  Warnings:

  - Added the required column `slug` to the `gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gigs" ADD COLUMN     "slug" TEXT NOT NULL;
