"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTask } from "@/utilities/tasks";
import { useSession } from "next-auth/react";

type Inputs = {
  title: string;
};

export default function TaskForm({ className }: { className: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const { data: session } = useSession();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (session) {
      await createTask(data.title, session.user.id);
    } else {
      // TODO handle this error
      console.log('no session')
    }
    reset();
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
        <button type="submit" className="border p-1">Add</button>
      </div>
    </form>
  );
}
