export default function Notices() {
  return (
    <section id="notices" className="py-12 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-semibold">Notices</h2>
      <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
        <li className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur px-4 py-3 shadow-sm hover:shadow-md transition">
          <span className="mr-2">📣</span> Annual Day celebration scheduled on 20 Dec, 2025.
        </li>
        <li className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur px-4 py-3 shadow-sm hover:shadow-md transition">
          <span className="mr-2">📝</span> Mid-term exam timetable released for classes 6–12.
        </li>
        <li className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur px-4 py-3 shadow-sm hover:shadow-md transition sm:col-span-2">
          <span className="mr-2">🎓</span> Admissions open for session 2025–26. See details below.
        </li>
      </ul>
    </section>
  );
}


