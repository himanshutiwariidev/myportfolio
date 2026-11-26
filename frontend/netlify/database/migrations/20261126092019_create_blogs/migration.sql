CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"meta_title" text DEFAULT '' NOT NULL,
	"meta_description" text DEFAULT '' NOT NULL,
	"content" text NOT NULL,
	"short_description" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"image_alt" text DEFAULT '' NOT NULL,
	"author" text DEFAULT 'Admin' NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
