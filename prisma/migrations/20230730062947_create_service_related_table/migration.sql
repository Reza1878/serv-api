-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "services" (
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

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePerk" (
    "id" SERIAL NOT NULL,
    "perk" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "ServicePerk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceSellerPerk" (
    "id" SERIAL NOT NULL,
    "perk" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "ServiceSellerPerk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTagline" (
    "id" SERIAL NOT NULL,
    "tagline" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "ServiceTagline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "ServiceImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePerk" ADD CONSTRAINT "ServicePerk_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSellerPerk" ADD CONSTRAINT "ServiceSellerPerk_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTagline" ADD CONSTRAINT "ServiceTagline_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceImage" ADD CONSTRAINT "ServiceImage_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
