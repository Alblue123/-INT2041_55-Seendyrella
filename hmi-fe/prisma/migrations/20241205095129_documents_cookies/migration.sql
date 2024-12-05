/*
  Warnings:

  - Added the required column `settings` to the `users_documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_documents" ADD COLUMN     "settings" JSONB NOT NULL;
