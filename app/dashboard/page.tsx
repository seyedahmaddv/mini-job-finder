import React from "react";
import { safeFetch, BASE } from "@/lib/api";
import JobList from "../components/JobList";
import { metadata as defaultMetadata } from "../metadata";

export const metadata = {
  title: "Job Finder — Dashboard",
  description: "Search remote developer jobs and track them.",
  openGraph: {
    title: "Job Finder — Dashboard",
    description: "Search remote developer jobs and track them.",
    url: "https://yourdomain.com/dashboard",
  },
};


export default async function DashboardPage() {
  const url = `${BASE}?search=developer`;
  const res = await safeFetch<any>(url, {}, 60); // revalidate every 60s
  const jobs = res.ok ? res.data.jobs || [] : [];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Finder — Dashboard</h1>
      <JobList initialJobs={jobs} />
    </main>
  );
}
