export default function Facilities() {
  return (
    <section id="facilities" className="py-12 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-semibold">Facilities</h2>
      <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
        {[
          "Library",
          "Science Labs",
          "Computer Lab",
          "Playground",
          "Smart Classrooms",
          "Drinking Water",
          "Girls Common Room",
          "Clean Toilets",
        ].map((item) => (
          <li key={item} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur px-4 py-3 shadow-sm hover:shadow-md transition">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}


