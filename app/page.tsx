import JobList from "./components/JobList";
import { safeFetch, BASE, Job } from "@/lib/api";

export default async function Home() {
  // Fetch jobs from the API
  const res = await safeFetch<{ jobs: Job[] }>(`${BASE}?search=developer`);
  const jobs = res.ok ? res.data.jobs.slice(0, 10) : [];

  return (
    <main className="container mx-auto px-6 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Find Your Next Job</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Browse open positions and apply instantly. A simple mini-project designed to
          show your real-world skills in React + Next.js 15.
        </p>
      </section>

      {/* Job List */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">Latest Jobs</h3>
        <JobList initialJobs={jobs} />
        <div className="text-center mt-4">
          <a
            href="/jobs"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View All Jobs
          </a>
        </div>
      </section>
    </main>
  );
}
