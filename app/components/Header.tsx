import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full py-4 border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">FindJob</h1>

        <Navigation />

        <ThemeToggle />
      </div>
    </header>
  );
}
