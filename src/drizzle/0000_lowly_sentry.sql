CREATE TABLE IF NOT EXISTS "todolist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task" text NOT NULL,
	"userEmail" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
