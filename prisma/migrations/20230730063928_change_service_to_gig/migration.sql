/*
  Warnings:

  - You are about to drop the `service_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_perks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_seller_perks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_taglines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "service_images" DROP CONSTRAINT "service_images_service_id_fkey";

-- DropForeignKey
ALTER TABLE "service_perks" DROP CONSTRAINT "service_perks_service_id_fkey";

-- DropForeignKey
ALTER TABLE "service_seller_perks" DROP CONSTRAINT "service_seller_perks_service_id_fkey";

-- DropForeignKey
ALTER TABLE "service_taglines" DROP CONSTRAINT "service_taglines_service_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_seller_id_fkey";

-- DropTable
DROP TABLE "service_images";

-- DropTable
DROP TABLE "service_perks";

-- DropTable
DROP TABLE "service_seller_perks";

-- DropTable
DROP TABLE "service_taglines";

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "gigs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "revision_limit" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "note" TEXT,
    "seller_id" INTEGER NOT NULL,
    "is_active" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gig_perks" (
    "id" SERIAL NOT NULL,
    "perk" TEXT NOT NULL,
    "gig_id" INTEGER NOT NULL,

    CONSTRAINT "gig_perks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gig_seller_perks" (
    "id" SERIAL NOT NULL,
    "perk" TEXT NOT NULL,
    "gig_id" INTEGER NOT NULL,

    CONSTRAINT "gig_seller_perks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gig_taglines" (
    "id" SERIAL NOT NULL,
    "tagline" TEXT NOT NULL,
    "gig_id" INTEGER NOT NULL,

    CONSTRAINT "gig_taglines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gig_images" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "gig_id" INTEGER NOT NULL,

    CONSTRAINT "gig_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gigs" ADD CONSTRAINT "gigs_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gig_perks" ADD CONSTRAINT "gig_perks_gig_id_fkey" FOREIGN KEY ("gig_id") REFERENCES "gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gig_seller_perks" ADD CONSTRAINT "gig_seller_perks_gig_id_fkey" FOREIGN KEY ("gig_id") REFERENCES "gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gig_taglines" ADD CONSTRAINT "gig_taglines_gig_id_fkey" FOREIGN KEY ("gig_id") REFERENCES "gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gig_images" ADD CONSTRAINT "gig_images_gig_id_fkey" FOREIGN KEY ("gig_id") REFERENCES "gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
