import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  slug: text().notNull().unique(),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  content: text().notNull(),
  shortDescription: text("short_description").notNull().default(""),
  image: text().notNull().default(""),
  imageAlt: text("image_alt").notNull().default(""),
  author: text().notNull().default("Admin"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Blog = typeof blogs.$inferSelect;
