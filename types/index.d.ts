export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
};

export type Task = {
  id: string;
  committedDay: string | null;
  completed: boolean;
  completedAt: Date | null;
  createdAt: Date;
  createdBy: string;
  dueDate: string | null;
  important: boolean;
  lastModifiedAt: Date;
  listId: string | null;
  note: string | null;
  position: number | null;
  recurrenceDaysOfWeek: Array<string> | null;
  recurrenceInterval: number | null;
  recurrenceType: string | null;
  title: string | null;
  todayPosition: number | null;
};

export type List = {
  id: string;
  createdAt: Date;
  createdBy: string;
  lastModifiedAt: Date;
  listGroupId: string | null;
  position: number | null;
  title: string;
};

export type ListGroup = {
  id: string;
  createdAt: Date;
  createdBy: string;
  lastModifiedAt: Date;
  position: number | null;
  title: string;
};

export type Step = {
  id: string;
  completed: boolean;
  completedAt: Date | null;
  createdAt: Date;
  createdBy: string;
  lastModifiedAt: Date;
  position: number | null;
  taskId: string;
  title: string | null;
};