-- CreateTable
CREATE TABLE "users_documents" (
    "id" SERIAL NOT NULL,
    "document_name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_documents_document_name_key" ON "users_documents"("document_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_documents_username_key" ON "users_documents"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_documents_username_document_name_key" ON "users_documents"("username", "document_name");

-- AddForeignKey
ALTER TABLE "users_documents" ADD CONSTRAINT "users_documents_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
