CREATE TABLE `inventory` (
	`user_id` text NOT NULL,
	`item_id` text NOT NULL,
	`slot` text,
	PRIMARY KEY(`user_id`, `item_id`)
);

--> statement-breakpoint
CREATE UNIQUE INDEX `inventory_slot` ON `inventory` (`user_id`,`slot`) WHERE "inventory"."slot" IS NOT NULL;
--> statement-breakpoint
CREATE TABLE `limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);

--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`mime` text NOT NULL,
	`created` integer NOT NULL
);

--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL
);

--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`kind` text NOT NULL,
	`board` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL
);

--> statement-breakpoint
CREATE TABLE `replies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`thread` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL
);

--> statement-breakpoint
CREATE TABLE `rewards` (
	`user_id` text NOT NULL,
	`day` text NOT NULL,
	`kind` text NOT NULL,
	`count` integer NOT NULL,
	PRIMARY KEY(`user_id`, `day`, `kind`)
);

--> statement-breakpoint
CREATE TABLE `sessions` (
	`token` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL
);

--> statement-breakpoint
CREATE INDEX `sessions_user` ON `sessions` (`user_id`);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`salt` text NOT NULL,
	`avatar` text DEFAULT 'preset:0' NOT NULL,
	`balance` integer DEFAULT 650 NOT NULL,
	`created` integer NOT NULL
);

--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);