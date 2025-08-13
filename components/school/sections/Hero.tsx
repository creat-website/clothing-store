export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 blur-3xl" />
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Goverment Senior Secondary School Gadli-Thothi</span>
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-300 max-w-2xl">
        Sarkari School serving classes 6–12 with a focus on quality education, discipline, and holistic development.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href="#admissions" className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-5 py-2.5 text-sm font-medium shadow-sm ring-1 ring-inset ring-white/10 hover:opacity-95">Apply for Admission</a>
        <a href="#notices" className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">Latest Notices</a>
      </div>
    </section>
  );
}


