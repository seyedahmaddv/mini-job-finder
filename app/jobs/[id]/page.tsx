import { safeFetch, BASE, Job } from "@/lib/api";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const id = params.id;

  // Fetch all jobs or call a dedicated endpoint for a single job
  const res = await safeFetch<{ jobs: Job[] }>(`${BASE}?search=developer`);
  if (!res.ok) return { title: "Job Not Found" };

  const job = res.data.jobs.find(j => String(j.id) === id);
  if (!job) return { title: "Job Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""; // e.g. https://jobfinder.vercel.app
  const jobUrl = `${baseUrl}/jobs/${job.id}`;

  return {
    title: `${job.title} — ${job.company_name}`,
    description: job.description.slice(0, 160),
    openGraph: {
      title: `${job.title} — ${job.company_name}`,
      description: job.description.slice(0, 160),
      url: jobUrl,
    },
  };
}


export default async function JobDetailPage({ params }: Props) {
  const id = params.id;

  // Fetch job by id
  const res = await safeFetch<{ jobs: Job[] }>(`${BASE}?search=developer`);
  if (!res.ok) return <p>Failed to load job</p>;

  // Find job with matching id
  const job = res.data.jobs.find(j => String(j.id) === id);

  if (!job) return <p>Job not found</p>;

  // Find similar jobs by category or overlapping tags
  const similarJobs = res.data.jobs
    .filter(j => j.id !== job.id && (j.category === job.category || j.tags.some(tag => job.tags.includes(tag))))
    .slice(0, 3);

  return (
    <main className="container mx-auto px-6 py-12 space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-lg font-medium">{job.company_name}</p>
        <p className="text-sm text-zinc-600">{job.candidate_required_location}</p>
        <div className="mt-4 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Apply Now
        </a>
      </section>

      {similarJobs.length > 0 && (
        <section className="border-t pt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {similarJobs.map(similar => (
              <a
                key={similar.id}
                href={`/jobs/${similar.id}`}
                className="block rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-blue-500 hover:shadow-sm transition"
              >
                <h3 className="font-semibold">{similar.title}</h3>
                <p className="text-sm text-zinc-600">{similar.company_name}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {similar.candidate_required_location} • {similar.job_type}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
