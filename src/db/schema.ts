
import { uuid, text, boolean, pgTable } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const todolist = pgTable("todolist", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  task: text("task").notNull(),
  userEmail:text("userEmail").notNull(),
  completed: boolean("completed").default(false).notNull(),
});
