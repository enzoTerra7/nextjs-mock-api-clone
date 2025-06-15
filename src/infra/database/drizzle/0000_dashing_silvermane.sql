CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "data_builder_types" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "data_builders" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"data_builder_type_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "routes" (
	"id" text PRIMARY KEY NOT NULL,
	"route_type" text NOT NULL,
	"schema" jsonb NOT NULL,
	"project_id" text NOT NULL,
	"data_builder_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "routes_types" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_builders" ADD CONSTRAINT "data_builders_data_builder_type_id_data_builder_types_name_fk" FOREIGN KEY ("data_builder_type_id") REFERENCES "public"."data_builder_types"("name") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_route_type_routes_types_name_fk" FOREIGN KEY ("route_type") REFERENCES "public"."routes_types"("name") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_data_builder_id_projects_id_fk" FOREIGN KEY ("data_builder_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;