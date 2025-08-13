export default function Home() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">Rishab Jangir</a>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#skills" className="hover:opacity-80">Skills</a>
            <a href="#projects" className="hover:opacity-80">Projects</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
        </div>
      </header>

      <main id="home" className="mx-auto max-w-5xl px-6">
        <section className="pt-16 sm:pt-24 pb-16">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Hi, I'm Rishab Jangir</h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300 max-w-2xl">
            I'm a 12th-grade student learning web development. I love building simple, fast, and
            responsive websites using modern tools.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#projects" className="inline-flex items-center rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:opacity-90">View Projects</a>
            <a href="#contact" className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">Contact</a>
          </div>
        </section>

        <section id="about" className="py-12 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl sm:text-2xl font-semibold">About</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-3xl">
            I'm exploring frontend development with HTML, CSS, JavaScript, and React/Next.js. I enjoy
            turning ideas into real projects and improving by building.
          </p>
        </section>

        <section id="skills" className="py-12 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl sm:text-2xl font-semibold">Skills</h2>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <li className="rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">HTML</li>
            <li className="rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">CSS</li>
            <li className="rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">JavaScript</li>
            <li className="rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">React</li>
            <li className="rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">Next.js</li>
            <li className="rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">Git & GitHub</li>
            <li className="rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">Responsive Design</li>
            <li className="rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">Tailwind CSS</li>
          </ul>
        </section>

        <section id="projects" className="py-12 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl sm:text-2xl font-semibold">Projects</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-6">
            <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-medium">Sample Portfolio</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">A simple responsive portfolio built with Next.js and Tailwind CSS.</p>
              <div className="mt-3 flex gap-3 text-sm">
                <a className="underline hover:opacity-80" href="#">Live</a>
                <a className="underline hover:opacity-80" href="#">Code</a>
              </div>
            </article>
            <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-medium">Landing Page UI</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">A clean landing page layout focusing on typography and spacing.</p>
              <div className="mt-3 flex gap-3 text-sm">
                <a className="underline hover:opacity-80" href="#">Live</a>
                <a className="underline hover:opacity-80" href="#">Code</a>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="py-12 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl sm:text-2xl font-semibold">Contact</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">Feel free to reach out:</p>
          <ul className="mt-3 text-sm">
            <li>Email: <a className="underline" href="mailto:rishab@example.com">rishab@example.com</a></li>
            <li>GitHub: <a className="underline" href="https://github.com/">github.com/your-username</a></li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} Rishab Jangir. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
