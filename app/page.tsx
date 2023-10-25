import ExpandingSection from "@/components/ExpandingSection";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { tasks } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "../db/db";
import {
  createTask,
  deleteTask,
  toggleTaskCompletion,
} from "@/utilities/tasks";
import ActiveTasks from "@/components/ActiveTasks";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  const activeTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.isCompleted, false))
    .orderBy(desc(tasks.orderIndex), desc(tasks.orderIndexUpdatedAt));

  const completedTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.isCompleted, true))
    .orderBy(desc(tasks.completedAt));

  return (
    <main className="min-h-screen container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold">Tasks</h1>
      <TaskForm
        createTask={createTask}
        className="absolute bottom-8 sm:static sm:mt-8 inset-x-4"
      />
      <ActiveTasks tasks={activeTasks} />
      {completedTasks.length > 0 && (
        <ExpandingSection buttonText="Completed" className="mt-6">
          <div className="grid grid-col-1 gap-2 mt-2">
            {completedTasks?.map((task) => (
              <TaskItem
                task={task}
                key={task.id}
                onDelete={deleteTask}
                onToggle={toggleTaskCompletion}
              />
            ))}
          </div>
        </ExpandingSection>
      )}
    </main>
  );
}
