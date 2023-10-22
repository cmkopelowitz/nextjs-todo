"use server";
import { db } from "@/db/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTask(task: string) {
  try {
    await db.insert(tasks).values({ title: task });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(taskId: number) {
  try {
    await db.delete(tasks).where(eq(tasks.id, taskId));
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function toggleTaskCompletion(
  taskId: number,
  completedStatus: boolean
) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await db
        .update(tasks)
        .set({
          isCompleted: completedStatus,
          completedAt: completedStatus ? new Date() : null,
          updatedAt: new Date(),
        })
        .where(eq(tasks.id, taskId));
      revalidatePath("/");
      resolve();
    } catch (error) {
      console.log(error);
      reject();
    }
  });
}
