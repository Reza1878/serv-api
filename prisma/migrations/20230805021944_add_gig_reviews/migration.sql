-- CreateTable
CREATE TABLE "gig_reviews" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "rewiew" TEXT NOT NULL,
    "gig_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "gig_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gig_reviews" ADD CONSTRAINT "gig_reviews_gig_id_fkey" FOREIGN KEY ("gig_id") REFERENCES "gigs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gig_reviews" ADD CONSTRAINT "gig_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
