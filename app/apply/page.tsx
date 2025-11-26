import ApplyForm from "../components/JobApplyForm";

export const metadata = {
  title: "Apply",
};

export default function ApplyPage() {
  return (
    <main className="container mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Apply for a Job</h1>
      <ApplyForm />
    </main>
  );
}
