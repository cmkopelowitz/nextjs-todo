"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTask } from "@/lib/tasks";
import { Task } from "@/types";

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
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const router = useRouter();
  const { data: session } = useSession();

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
    } catch (error) {
      // TODO handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="flex flex-row gap-x-4">
        <input
          defaultValue=""
          {...register("title")}
          id="title"
          className="border w-full pl-8 py-1"
          placeholder="Add a Task"
        />
        <button type="submit" className="border p-1">
          Add
        </button>
      </div>
    </form>
  );
}
