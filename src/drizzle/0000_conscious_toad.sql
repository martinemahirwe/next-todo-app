-- Enable uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create userTable if it doesn't exist
CREATE TABLE IF NOT EXISTS "userlist" (
    "userId" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    "name" text NOT NULL
);

-- Add userId column if it doesn't exist and set up foreign key
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='todolist' AND column_name='userId') THEN
        ALTER TABLE "todolist"
        ADD COLUMN "userId" uuid NOT NULL,
        ADD CONSTRAINT fk_userId FOREIGN KEY ("userId") REFERENCES "userTable" ("userId");
    END IF;
END $$;
