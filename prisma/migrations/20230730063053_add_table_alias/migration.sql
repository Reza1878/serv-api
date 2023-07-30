/*
  Warnings:

  - You are about to drop the `ServiceImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServicePerk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceSellerPerk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceTagline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceImage" DROP CONSTRAINT "ServiceImage_service_id_fkey";

-- DropForeignKey
ALTER TABLE "ServicePerk" DROP CONSTRAINT "ServicePerk_service_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiceSellerPerk" DROP CONSTRAINT "ServiceSellerPerk_service_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiceTagline" DROP CONSTRAINT "ServiceTagline_service_id_fkey";

-- DropTable
DROP TABLE "ServiceImage";

-- DropTable
DROP TABLE "ServicePerk";

-- DropTable
DROP TABLE "ServiceSellerPerk";

-- DropTable
DROP TABLE "ServiceTagline";

-- CreateTable
CREATE TABLE "service_perks" (
    "id" SERIAL NOT NULL,
    "perk" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "service_perks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_seller_perks" (
    "id" SERIAL NOT NULL,
    "perk" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "service_seller_perks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_taglines" (
    "id" SERIAL NOT NULL,
    "tagline" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "service_taglines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_images" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "service_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_perks" ADD CONSTRAINT "service_perks_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_seller_perks" ADD CONSTRAINT "service_seller_perks_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_taglines" ADD CONSTRAINT "service_taglines_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_images" ADD CONSTRAINT "service_images_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
