export default function Academics() {
  return (
    <section id="academics" className="py-12 border-t border-zinc-200 dark:border-zinc-800">
      <h2 className="text-xl sm:text-2xl font-semibold">Academics</h2>
      <div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="font-medium">Classes 6–10</h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">Core subjects: Hindi, English, Mathematics, Science, Social Science, and optional subjects.</p>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="font-medium">Senior Secondary (11–12)</h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">Streams offered: Science, Commerce, and Arts with experienced faculty.</p>
        </div>
      </div>
    </section>
  );
}


