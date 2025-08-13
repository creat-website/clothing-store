"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between relative">
        <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="text-xl">🏫</span>
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Goverment Senior Secondary School Gadli-Thothi</span>
        </a>
        <nav className="hidden sm:flex items-center gap-2 text-sm">
          <a href="#notices" className="px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Notices</a>
          <a href="#about" className="px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">About</a>
          <a href="#academics" className="px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Academics</a>
          <a href="#facilities" className="px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Facilities</a>
          <a href="#contact" className="px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Contact</a>
          <a href="/login" className="px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Login</a>
          <a href="/signup" className="px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Sign up</a>
          <a href="#admissions" className="ml-2 inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-3 py-1.5 font-medium shadow-sm hover:opacity-90">Admissions</a>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <span className="text-xl leading-none">⋯</span>
        </button>

        {menuOpen && (
          <div className="sm:hidden absolute right-6 top-full mt-2 w-56 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur shadow-lg p-2">
            <a onClick={() => setMenuOpen(false)} href="#notices" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Notices</a>
            <a onClick={() => setMenuOpen(false)} href="#about" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">About</a>
            <a onClick={() => setMenuOpen(false)} href="#academics" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Academics</a>
            <a onClick={() => setMenuOpen(false)} href="#facilities" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Facilities</a>
            <a onClick={() => setMenuOpen(false)} href="#contact" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Contact</a>
            <a onClick={() => setMenuOpen(false)} href="/login" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Login</a>
            <a onClick={() => setMenuOpen(false)} href="/signup" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">Sign up</a>
            <a onClick={() => setMenuOpen(false)} href="#admissions" className="mt-1 block px-3 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-center font-medium">Admissions</a>
          </div>
        )}
      </div>
    </header>
  );
}


