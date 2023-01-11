-- CreateTable
CREATE TABLE "clai_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token" TEXT,
    "oauth_token_secret" TEXT,

    CONSTRAINT "clai_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clai_sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clai_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clai_users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "bio" TEXT,

    CONSTRAINT "clai_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clai_verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "clai_cover_letters" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "jobTitle" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "companyName" TEXT,
    "fullName" TEXT,
    "companyDetails" TEXT,
    "applicantDetails" TEXT,
    "coverLetter" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clai_cover_letters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clai_accounts_provider_providerAccountId_key" ON "clai_accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "clai_sessions_sessionToken_key" ON "clai_sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "clai_users_email_key" ON "clai_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clai_verification_tokens_token_key" ON "clai_verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "clai_verification_tokens_identifier_token_key" ON "clai_verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "clai_cover_letters_id_userId_key" ON "clai_cover_letters"("id", "userId");

-- AddForeignKey
ALTER TABLE "clai_accounts" ADD CONSTRAINT "clai_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "clai_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clai_sessions" ADD CONSTRAINT "clai_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "clai_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clai_cover_letters" ADD CONSTRAINT "clai_cover_letters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "clai_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
