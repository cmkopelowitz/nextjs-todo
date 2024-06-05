DROP TABLE IF EXISTS step;

DROP TABLE IF EXISTS list_group;

DROP TABLE IF EXISTS task_list;

DROP TABLE IF EXISTS "task";

DROP TABLE IF EXISTS "session";

DROP TABLE IF EXISTS "verificationToken";

DROP TABLE IF EXISTS account;

DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
  id text PRIMARY KEY NOT NULL,
  name text,
  email text NOT NULL,
  "emailVerified" timestamp,
  image text
);

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

CREATE TABLE "session" (
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  expires TIMESTAMP NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
  PRIMARY KEY ("sessionToken")
);

CREATE TABLE "verificationToken" (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMP NOT NULL,
  PRIMARY KEY (identifier, token)
);

CREATE TABLE "list_group" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by TEXT NOT NULL,
  last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
  position INTEGER,
  title TEXT NOT NULL,
  FOREIGN KEY ("created_by") REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE "list" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by TEXT NOT NULL,
  last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
  list_group_id UUID,
  position INTEGER,
  title TEXT NOT NULL,
  FOREIGN KEY ("created_by") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY ("list_group_id") REFERENCES "list_group"(id)
);

CREATE TABLE "task" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  committed_day DATE,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by TEXT NOT NULL,
  due_date DATE,
  important BOOLEAN DEFAULT FALSE NOT NULL,
  last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
  list_id UUID,
  note TEXT,
  position INTEGER,
  recurrence_days_of_week TEXT [],
  recurrence_interval INTEGER,
  recurrence_start_date DATE,
  recurrence_type TEXT,
  title TEXT,
  today_position INTEGER,
  FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY (list_id) REFERENCES "list"(id) ON DELETE CASCADE
);

CREATE TABLE "step" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by TEXT NOT NULL,
  last_modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
  position INTEGER,
  task_id UUID NOT NULL,
  title TEXT NOT NULL,
  FOREIGN KEY ("created_by") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY ("task_id") REFERENCES "task"(id) ON DELETE CASCADE
);