import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const notes = pgTable("notes", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  from: text("from").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type User = typeof users.$inferSelect;