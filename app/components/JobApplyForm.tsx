"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./ui/Input";
import Button from "./ui/Button";

const applySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Invalid email address"),
  resumeUrl: z.string().url("Invalid resume URL").optional().or(z.literal("")),
  message: z.string().max(1000).optional(),
});

type ApplyForm = z.infer<typeof applySchema>;

export default function JobApplyForm({ jobId }: { jobId?: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<ApplyForm>({
    resolver: zodResolver(applySchema),
    defaultValues: { name: "", email: "", resumeUrl: "", message: "" },
  });

  async function onSubmit(values: ApplyForm) {
    try {
      // Example: send data to an internal API route or email service
      await fetch("/api/apply", {
        method: "POST",
        body: JSON.stringify({ ...values, jobId }),
        headers: { "Content-Type": "application/json" },
      });
      reset();
      // Optionally show a success message here
    } catch (err) {
      // Handle and show error
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Name" {...register("name")} error={errors.name?.message as string} />
      <Input label="Email" {...register("email")} error={errors.email?.message as string} />
      <Input label="Resume URL (optional)" {...register("resumeUrl")} error={errors.resumeUrl?.message as string} />
      <div>
        <label className="block text-sm font-medium">Message (optional)</label>
        <textarea {...register("message")} className="mt-1 block w-full rounded-md border p-2" rows={5}></textarea>
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit application"}</Button>
      {isSubmitSuccessful && <p className="text-green-600">Application submitted successfully.</p>}
    </form>
  );
}
