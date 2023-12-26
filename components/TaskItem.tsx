"use client";
import { Task } from "@/db/schema";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Circle, CheckCircle2, Star, StarOff, Trash2 } from "lucide-react";
import {
  deleteTask,
  toggleTaskCompletion,
  toggleTaskImportance,
} from "@/utilities/tasks";
import { useState } from "react";

export default function TaskItem({
  task: { title, isCompleted, isImportant, id },
}: {
  task: Task;
}) {
  const [open, setOpen] = useState(false);
  async function deleteTaskHandler() {
    try {
      await deleteTask(id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger className="flex gap-x-4 w-full items-center rounded shadow p-4 text-sm">
          {isCompleted ? (
            <button
              title="Mark as not completed"
              type="button"
              onClick={() => {
                toggleTaskCompletion(id, false);
              }}
            >
              <CheckCircle2 size={20} />
            </button>
          ) : (
            <button
              type="button"
              title="Mark as completed"
              onClick={() => {
                toggleTaskCompletion(id, true);
              }}
            >
              <Circle size={20} />
            </button>
          )}
          <div className={`w-full ${isCompleted && "line-through"}`}>
            {title}
          </div>
          {isImportant ? (
            <button
              type="button"
              title="Remove importance"
              onClick={() => {
                toggleTaskImportance(id, false);
              }}
            >
              <Star fill="yellow" size={20} />
            </button>
          ) : (
            <button
              type="button"
              title="Mark as important"
              onClick={() => {
                toggleTaskImportance(id, true);
              }}
            >
              <Star size={20} />
            </button>
          )}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {isImportant ? (
            <ContextMenuItem onSelect={() => toggleTaskImportance(id, false)}>
              <StarOff size={20} className="mr-4" />
              Remove importance
            </ContextMenuItem>
          ) : (
            <ContextMenuItem onSelect={() => toggleTaskImportance(id, true)}>
              <Star size={20} className="mr-4" />
              Mark as important
            </ContextMenuItem>
          )}
          {isCompleted ? (
            <ContextMenuItem onSelect={() => toggleTaskCompletion(id, false)}>
              <Circle size={20} className="mr-4" />
              Mark as not complete
            </ContextMenuItem>
          ) : (
            <ContextMenuItem onSelect={() => toggleTaskCompletion(id, true)}>
              <CheckCircle2 size={20} className="mr-4" />
              Mark as completed
            </ContextMenuItem>
          )}
          <ContextMenuSeparator />
          <DialogTrigger asChild>
            <ContextMenuItem className="text-red-700">
              <Trash2 size={20} className="mr-4" />
              Delete task
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            task?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={deleteTaskHandler}
          >
            Delete task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
