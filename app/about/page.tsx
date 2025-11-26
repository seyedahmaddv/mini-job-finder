export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">About FindJob</h1>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
        This project is a practical mini job-finding platform built with Next.js 15, 
        Tailwind CSS, and modern React features. It demonstrates real-world skills 
        including server components, client components, dynamic fetching, and UI design.
      </p>
    </main>
  );
}
