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

  const { data: session, status } = useSession();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createTask(data.title, session.user.id);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <input
        defaultValue=""
        {...register("title")}
        id="title"
        className="border w-full pl-8 py-1"
        placeholder="Add a Task"
      />
    </form>
  );
}
