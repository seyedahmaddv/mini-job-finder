## Job Board Mini Project (Next.js 14)

This is a small, production‑style **job board** built with **Next.js 14 (App Router)**.  
It fetches remote jobs from the public **Remotive** API, lists them with search and pagination, and shows a detailed page for each job including similar positions and an application form.

## Live Demo:


## Picture of Mini Job Finder:
(Home page in Light mode)[../public/mini-job-finder-home-white.png]
### Features

- **Job listing page** (`/jobs`)
  - Server‑side fetching from the Remotive API
  - **Pagination** via `?page=` query param (SEO‑friendly, crawlable links)
  - Client‑side search by job title and company
- **Home page** (`/`)
  - Short hero section explaining the app
  - Preview of latest jobs with link to full listing
- **Job detail page** (`/jobs/[id]`)
  - Metadata generated per job (title, description, Open Graph URL)
  - Full job description (HTML) and external “Apply Now” link
  - **Similar jobs** section based on category and overlapping tags
- **Apply page** (`/apply`)
  - Application form with validation (name, email, resume URL, optional message)
  - Designed to be wired to an internal API or email service
- **Responsive layout & navigation**
  - Top navigation with desktop menu and mobile hamburger menu
  - Light/dark theme support (via Tailwind utility classes and theme toggle component)

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript, React 18
- **Styling**: Tailwind CSS, custom UI components (`Button`, `Card`, `Input`)
- **Forms & Validation**:
  - `react-hook-form`
  - `zod` + `@hookform/resolvers` for schema‑based validation
- **Icons**: `lucide-react`
- **API & Types**:
  - Custom `safeFetch` wrapper for error handling and `revalidate` options
  - Strongly‑typed `Job` and `JobsResponse` models

### Project Structure (high level)

- `app/`
  - `page.tsx` – Home page with hero and latest jobs
  - `jobs/page.tsx` – Paginated job listing with server data fetching
  - `jobs/[id]/page.tsx` – Job detail + SEO metadata + similar jobs
  - `apply/page.tsx` – Application form
  - `about/page.tsx`, `dashboard/page.tsx` – Additional example pages
  - `components/`
    - `JobList.tsx` – Client component with search and list rendering
    - `JobApplyForm.tsx` – Client application form with validation
    - `Navigation.tsx`, `Header.tsx`, `ThemeToggle.tsx`, `ui/*`
- `lib/api.tsx` – `safeFetch`, API base URL, job response types
- `types/job.d.ts` – Shared job types (if consumed in multiple places)

### Running the Project Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit in browser
http://localhost:3000
```

### SEO & Performance Notes

- Job list pagination uses **query params** (`/jobs?page=2`) so each page has a unique URL that search engines can crawl.
- Job detail pages use **dynamic metadata** (including Open Graph `url`) generated from API data.
- Server Components + `revalidate` settings in `safeFetch` help keep data relatively fresh without re‑fetching on every request.

### As a Portfolio Piece

This project demonstrates:
- Real‑world data fetching from a third‑party API
- Next.js App Router patterns (dynamic routes, `generateMetadata`, Server/Client components)
- UI/UX considerations (search, pagination, responsive navigation, validation)

With a short description in your CV/portfolio and a deployed link (e.g. Vercel), this is **clearly suitable as a portfolio example**, especially for junior–mid React/Next.js roles.

