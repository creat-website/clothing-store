export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight">Government Senior Secondary School</a>
        <nav className="hidden sm:flex gap-6 text-sm">
          <a href="#notices" className="hover:opacity-80">Notices</a>
          <a href="#about" className="hover:opacity-80">About</a>
          <a href="#academics" className="hover:opacity-80">Academics</a>
          <a href="#admissions" className="hover:opacity-80">Admissions</a>
          <a href="#facilities" className="hover:opacity-80">Facilities</a>
          <a href="#contact" className="hover:opacity-80">Contact</a>
        </nav>
      </div>
    </header>
  );
}


