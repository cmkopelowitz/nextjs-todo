"use client";
import { Task } from "@/db/schema";
import TaskItem from "./TaskItem";
import { deleteTask, toggleTaskCompletion } from "@/utilities/tasks";
import { useEffect, useState } from "react";

export default function ActiveTasks({ tasks }: { tasks: Task[] }) {
  const [sortableTasks, setSortableTasks] = useState(tasks);
  // TODO add drag-sort function

  async function toggleTaskHandler(taskId: number, completedStatus: boolean) {
    try {
      await toggleTaskCompletion(taskId, completedStatus);
      setSortableTasks((state) => state.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSortableTasks(tasks);
  }, [tasks]);

  return (
    <div className="grid grid-col-1 gap-2 mt-6">
      {sortableTasks?.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          onDelete={deleteTask}
          onToggle={toggleTaskHandler}
        />
      ))}
    </div>
  );
}
