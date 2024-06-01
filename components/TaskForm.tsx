"use client";
import React, { useState } from "react";
import { CalendarDays, CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTask } from "@/lib/tasks";
import { Task } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Inputs = {
  title: string;
};

export default function TaskForm({
  className,
  defaultValues = {},
}: {
  className: string;
  defaultValues?: Partial<Task>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<Inputs>();

  const router = useRouter();
  const { data: session } = useSession();
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!session) {
      return router.push("/");
    }

    try {
      await createTask({
        ...defaultValues,
        title: data.title,
        createdBy: session.user.id,
      });
      reset();
      setFormError(null);
    } catch (error) {
      setFormError((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="border border-black">
        <input
          defaultValue=""
          {...register("title", {
            required: "Please enter a title for the task.",
          })}
          id="title"
          className="border w-full pl-8 py-1"
          placeholder="Add a Task"
        />
        <div className="flex bg-gray-300">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button">
                <span className="sr-only">Due date</span>
                <CalendarDays />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="text-center">Due</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CalendarClock />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`border p-1 ml-auto ${
              isValid ? "text-blue-500" : "text-gray-500 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>
      </div>
      {formError && (
        <div className="text-red-500">
          Something went wrong: {formError}{" "}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="text-blue-500 hover:underline"
          >
            Retry
          </button>
        </div>
      )}
    </form>
  );
}
