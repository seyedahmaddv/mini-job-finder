import JobList from "../components/JobList";
import { safeFetch, BASE, JobsResponse } from "@/lib/api";

export const metadata = {
  title: "Jobs",
};

type JobsPageProps = {
  searchParams?: { page?: string };
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 10;

  const url = `${BASE}?search=developer`;
  const res = await safeFetch<JobsResponse>(url, {}, 60); // revalidate every 60s
  const allJobs = res.ok ? res.data.jobs || [] : [];

  const totalJobs = allJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / pageSize));
  const page = Math.min(Math.max(currentPage, 1), totalPages);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const jobs = allJobs.slice(start, end);

  return (
    <main className="container mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold">Available Jobs</h1>

      <JobList initialJobs={jobs} />

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-6" aria-label="Jobs pagination">
          <a
            href={page > 1 ? `/jobs?page=${page - 1}` : undefined}
            aria-disabled={page === 1}
            className={`px-3 py-1 rounded border text-sm ${
              page === 1
                ? "cursor-not-allowed text-zinc-400 border-zinc-200"
                : "hover:bg-zinc-100 border-zinc-300"
            }`}
          >
            Previous
          </a>

          {Array.from({ length: totalPages }).map((_, index) => {
            const p = index + 1;
            const isActive = p === page;
            return (
              <a
                key={p}
                href={`/jobs?page=${p}`}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-1 rounded border text-sm ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-zinc-100 border-zinc-300"
                }`}
              >
                {p}
              </a>
            );
          })}

          <a
            href={page < totalPages ? `/jobs?page=${page + 1}` : undefined}
            aria-disabled={page === totalPages}
            className={`px-3 py-1 rounded border text-sm ${
              page === totalPages
                ? "cursor-not-allowed text-zinc-400 border-zinc-200"
                : "hover:bg-zinc-100 border-zinc-300"
            }`}
          >
            Next
          </a>
        </nav>
      )}
    </main>
  );
}
