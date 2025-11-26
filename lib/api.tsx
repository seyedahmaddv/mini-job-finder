export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; status?: number };

export type Job = {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
};

export type JobsResponse = {
  "job-count": number;
  "total-job-count": number;
  jobs: Job[];
  "0-legal-notice"?: string;
  "00-warning"?: string;
};

const BASE = "https://remotive.com/api/remote-jobs"; // Example: Remotive public jobs API

async function safeFetch<T>(url: string, init?: RequestInit, revalidateSeconds?: number): Promise<ApiResult<T>> {
  try {
    const options = { ...init };
    // For Server Components we can configure revalidation
    if (revalidateSeconds && typeof fetch !== "undefined") {
      // Next fetch cache control (app router)
      // @ts-ignore
      options["next"] = { revalidate: revalidateSeconds };
    }
    const res = await fetch(url, options);
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || res.statusText, status: res.status };
    }
    const data = await res.json();
    return { ok: true, data: data as T };
  } catch (err: any) {
    return { ok: false, error: err.message || "Network error" };
  }
}

export { safeFetch, BASE };
