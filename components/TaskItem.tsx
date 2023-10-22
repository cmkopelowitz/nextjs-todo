"use client";
import { Task } from "@/db/schema";

export default function TaskItem({
  task: { title, id, isCompleted },
  onDelete,
  onToggle,
}: {
  task: Task;
  onDelete(taskId: number): void;
  onToggle(taskId: number, completedStatus: boolean): void;
}) {
  return (
    <div className="border gap-x-2 w-full py-1 px-3 flex flex-row items-center">
      <input
        type="checkbox"
        checked={isCompleted || false}
        onChange={() => onToggle(id, !isCompleted)}
      />
      <div className="flex-grow">{title}</div>
      <button type="button" onClick={() => onDelete(id)}>
        X
      </button>
    </div>
  );
}
