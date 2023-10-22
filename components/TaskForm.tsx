"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
};

export default function TaskForm({
  createTask,
  className,
}: {
  createTask(title: string): void;
  className: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createTask(data.title);
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
