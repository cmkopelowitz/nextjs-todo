"use client";
import { Task } from "@/db/schema";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";

export default function ActiveTasks({ tasks }: { tasks: Task[] }) {
  const [sortableTasks, setSortableTasks] = useState(tasks);
  // TODO add drag-sort function

  useEffect(() => {
    setSortableTasks(tasks);
  }, [tasks]);

  return (
    <div className="grid grid-col-1 gap-2 mt-6">
      {sortableTasks?.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
        />
      ))}
    </div>
  );
}
