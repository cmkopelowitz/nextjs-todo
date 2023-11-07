"use client";
import { useRef, useEffect, useCallback } from "react";
import { Task } from "@/db/schema";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import { updateTaskTitle } from "@/utilities/tasks";

type Inputs = {
  title: string;
};

export default function TaskItem({
  task: { title, id, isCompleted },
  readOnly,
  disabled,
  onDelete,
  onToggle,
}: {
  task: Task;
  readOnly?: boolean;
  disabled?: boolean;
  onDelete(taskId: number): void;
  onToggle(taskId: number, completedStatus: boolean): void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = useSession();

  const { control, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      if (session) {
        await updateTaskTitle(id, data.title);
      } else {
        // TODO handle this error
        console.log("no session");
      }
    },
    [id, session]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        inputRef.current?.blur();
        handleSubmit(onSubmit)();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onSubmit, handleSubmit]);

  return (
    <div className="border gap-x-2 w-full py-1 px-3 flex flex-row items-center">
      <input
        type="checkbox"
        checked={isCompleted || false}
        onChange={() => onToggle(id, !isCompleted)}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
        <Controller
          defaultValue={title || ""}
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              readOnly={readOnly}
              disabled={disabled}
              ref={inputRef}
              className={`appearance-none w-full ${
                isCompleted && "line-through"
              }`}
              onBlur={handleSubmit(onSubmit)}
            />
          )}
        />
      </form>
      <button type="button" onClick={() => onDelete(id)}>
        X
      </button>
    </div>
  );
}
