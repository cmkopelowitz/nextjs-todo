import {
  boolean,
  pgTable,
  integer,
  date,
  text,
  timestamp,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

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

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

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

export const tasks = pgTable("task", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  committedDay: date("committed_day", { mode: "string" }),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completed_at", { mode: "date" }),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  dueDate: date("due_date", { mode: "string" }),
  important: boolean("important").default(false).notNull(),
  lastModifiedAt: timestamp("last_modified_at", { mode: "date" })
    .defaultNow()
    .notNull(),
  listId: uuid("list_id").references(() => lists.id),
  note: text("note"),
  position: integer("position"),
  recurrenceDaysOfWeek: text("recurrence_days_of_week").array(),
  recurrenceInterval: integer("recurrence_interval"),
  recurrenceType: text("recurrence_type"),
  title: text("title"),
  todayPosition: integer("today_position"),
});

export const lists = pgTable("list", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastModifiedAt: timestamp("last_modified_at", { mode: "date" })
    .defaultNow()
    .notNull(),
  listGroupId: uuid("list_group_id").references(() => listGroups.id, {
    onDelete: "cascade",
  }),
  position: integer("position"),
  title: text("title").notNull(),
});

export const listGroups = pgTable("list_group", {
  id: uuid("id")
    .notNull()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastModifiedAt: timestamp("last_modified_at", { mode: "date" })
    .defaultNow()
    .notNull(),
  position: integer("position"),
  title: text("title").notNull(),
});

export const steps = pgTable("step", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completed_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastModifiedAt: timestamp("last_modified_at", { mode: "date" })
    .defaultNow()
    .notNull(),
  position: integer("position"),
  taskId: uuid("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
});
