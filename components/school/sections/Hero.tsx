export default function Hero() {
  return (
    <section className="pt-16 sm:pt-24 pb-16">
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Government Senior Secondary School</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-300 max-w-2xl">
        Sarkari School serving classes 6–12 with a focus on quality education, discipline, and holistic development.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="#admissions" className="inline-flex items-center rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:opacity-90">Apply for Admission</a>
        <a href="#notices" className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">Latest Notices</a>
      </div>
    </section>
  );
}


