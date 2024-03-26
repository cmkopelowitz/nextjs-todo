"use server";
import { db } from "@/db/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTask({
  title,
  createdBy,
}: {
  title: string;
  createdBy: string;
}) {
  try {
    await db.insert(tasks).values({ title, createdBy });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(taskId: string) {
  try {
    await db.delete(tasks).where(eq(tasks.id, taskId));
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function toggleTaskCompletion({
  taskId,
  completedStatus,
}: {
  taskId: string;
  completedStatus: boolean;
}) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await db
        .update(tasks)
        .set({
          completedAt: completedStatus ? new Date() : null,
          lastModifiedAt: new Date(),
        })
        .where(eq(tasks.id, taskId));
      revalidatePath("/tasks");
      resolve();
    } catch (error) {
      console.log(error);
      reject();
    }
  });
}

export async function toggleTaskImportance({
  taskId,
  importanceStatus,
}: {
  taskId: string;
  importanceStatus: boolean;
}) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await db
        .update(tasks)
        .set({
          important: importanceStatus,
          lastModifiedAt: new Date(),
        })
        .where(eq(tasks.id, taskId));
      revalidatePath("/tasks");
      resolve();
    } catch (error) {
      console.log(error);
      reject();
    }
  });
}

export async function updateTaskTitle({
  taskId,
  title,
}: {
  taskId: string;
  title: string;
}) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const res = await db
        .update(tasks)
        .set({
          title: title,
          lastModifiedAt: new Date(),
        })
        .where(eq(tasks.id, taskId))
        .returning({ updatedId: tasks.id, title: tasks.title });
      revalidatePath("/tasks");
      resolve();
    } catch (error) {
      console.log(error);
      reject();
    }
  });
}
