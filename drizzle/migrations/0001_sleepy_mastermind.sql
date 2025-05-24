CREATE TABLE "videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"video_url" text NOT NULL,
	"video_id" text NOT NULL,
	"thumbnail_url" text NOT NULL,
	"visibility" text NOT NULL,
	"user_id" text NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"duration" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "videos_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;