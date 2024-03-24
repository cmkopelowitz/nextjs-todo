import {
  boolean,
  pgTable,
  serial,
  integer,
  date,
  text,
  timestamp,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

/**
  CREATE TABLE "user" (
    id text PRIMARY KEY NOT NULL,
    inbox_list_id uuid,
    name text,
    email text NOT NULL,
    "emailVerified" timestamp,
    image text
);
 */

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
};

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

/**
 CREATE TABLE "task" (
  id UUID PRIMARY KEY NOT NULL,
  committed_day DATE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by TEXT NOT NULL,
  due_date DATE,
  important BOOLEAN,
  last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
  list_id uuid,
  note text,
  position integer,
  recurrence_days_of_week TEXT[],
  recurrence_interval INTEGER,
  recurrence_start_date DATE,
  recurrence_type TEXT,
  title TEXT,
  today_position INTEGER,
  FOREIGN KEY ("created_by") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY (list_id) REFERENCES "task_list"(id) ON DELETE CASCADE,
 );
 */

export type Task = {
  id: string;
  committedDay: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  createdBy: string;
  important: boolean;
  lastModifiedAt: Date;
  listId: string | null;
  note: string | null;
  position: number | null;
  recurrenceDaysOfWeek: Array<string>;
  recurrenceInterval: number;
  recurrenceType: string;
  title: string | null;
  todayPosition: number | null;
};

export const tasks = pgTable("task", {
  id: uuid("id").primaryKey(),
  committedDay: date("committed_day"),
  completedAt: timestamp("completed_at"),
  createdAt: date("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  important: boolean("important").default(false).notNull(),
  last_modified_at: timestamp("last_modified_at"),
  listId: uuid("task_list_id").references(() => taskLists.id),
  note: text("note"),
  position: integer("position"),
  recurrenceDaysOfWeek: text("recurrence_days_of_week").array(),
  recurrenceInterval: integer("recurrence_interval"),
  recurrenceType: text("recurrence_type"),
  title: text("title"),
  todayPosition: integer("today_position"),
});

/**
 CREATE TABLE "task_list" (
  id UUID PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by UUID NOT NULL,
  last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
  parent_group_id UUID,
  position INTEGER,
  title TEXT NOT NULL,
  FOREIGN KEY ("created_by") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY ("parent_group_id") REFERENCES "list_group"(id)
 );
 */

export type TaskList = {
  id: string;
  createdAt: Date;
  createdBy: string;
  lastModifiedAt: Date;
  parentGroupId: string | null;
  position: number | null;
  title: string;
};

export const taskLists = pgTable("task_list", {
  id: uuid("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastModifiedAt: timestamp("last_modified_at").defaultNow().notNull(),
  parentGroupId: uuid("parent_group_id").references(() => listGroup.id, {
    onDelete: "cascade",
  }),
  position: integer("position"),
  title: text("title").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 CREATE TABLE "list_group" (
  id UUID PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by UUID NOT NULL,
  last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
  position INTEGER,
  title TEXT NOT NULL,
  FOREIGN KEY ("created_by") REFERENCES "user"(id) ON DELETE CASCADE,
 );
 */

export const listGroup = pgTable("list_group", {
  id: uuid("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastModifiedAt: timestamp("last_modified_at").defaultNow().notNull(),
  position: integer("position"),
  title: text("title").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 CREATE TABLE "step" (
  id UUID PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by UUID NOT NULL,
  last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
  position INTEGER,
  task_id uuid NOT NULL,
  title TEXT NOT NULL,
  FOREIGN KEY ("created_by") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY ("task_id") REFERENCES "task"(id) ON DELETE CASCADE,
 );
 */

export const step = pgTable("step", {
  id: uuid("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastModifiedAt: timestamp("last_modified_at").defaultNow().notNull(),
  position: integer("position"),
  taskId: uuid("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
