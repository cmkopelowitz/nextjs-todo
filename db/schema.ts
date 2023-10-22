import {
  boolean,
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

/**
  CREATE TABLE "user" (
    id text PRIMARY KEY NOT NULL,
    name text,
    email text NOT NULL,
    "emailVerified" timestamp,
    image text
);
 */

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

/**
 CREATE TABLE account (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
    PRIMARY KEY (provider, "providerAccountId")
);
 */

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

/**
 CREATE TABLE "session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    expires TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
    PRIMARY KEY ("sessionToken")
);
 */

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

/**
 CREATE TABLE "verificationToken" (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMP NOT NULL,
    PRIMARY KEY (identifier, token)
 );
 */

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export type Task = {
  id: number;
  title: string | null;
  isCompleted: boolean;
  completedAt: Date | null;
  orderIndex: Date;
  orderIndexUpdatedAt: Date;
  updatedAt: Date;
  createdAt: Date;
};

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  orderIndex: timestamp("order_index").defaultNow().notNull(),
  orderIndexUpdatedAt: timestamp("order_index_updated_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
