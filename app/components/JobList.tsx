"use client";
import React, { useState, useMemo } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

type Job = { id: number; title: string; company_name: string; description?: string; url: string };

export default function JobList({ initialJobs = [] as Job[] }) {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const filtered = useMemo(() => {
    if (!query) return jobs;
    return jobs.filter(j =>
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.company_name.toLowerCase().includes(query.toLowerCase())
    );
  }, [jobs, query]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by job title or company..." />
        <Button onClick={() => setQuery("")}>Reset</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length ? filtered.map(job => (
          <Card key={job.id}>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-zinc-600">{job.company_name}</p>
            <div className="mt-2">
              <a href={`/jobs/${job.id}`} target="_blank" rel="noreferrer" className="text-sm underline">View Job</a>
            </div>
          </Card>
        )) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}
