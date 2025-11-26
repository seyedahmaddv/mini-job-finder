"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icon components

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/jobs" className="hover:text-blue-600 transition">Jobs</Link>
        <Link href="/apply" className="hover:text-blue-600 transition">Apply</Link>
        <Link href="/about" className="hover:text-blue-600 transition">About</Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={26}/> : <Menu size={26}/>}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white dark:bg-gray-900 shadow-md py-4 px-6 space-y-4">
          <Link onClick={() => setOpen(false)} href="/" className="block">Home</Link>
          <Link onClick={() => setOpen(false)} href="/jobs" className="block">Jobs</Link>
          <Link onClick={() => setOpen(false)} href="/apply" className="block">Apply</Link>
          <Link onClick={() => setOpen(false)} href="/about" className="block">About</Link>
        </div>
      )}
    </>
  );
}
