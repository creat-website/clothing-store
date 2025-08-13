export default function Admissions() {
  return (
    <section id="admissions" className="py-12 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-semibold">Admissions</h2>
      <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur p-6 shadow-sm">
        <ol className="list-decimal list-inside text-sm space-y-2">
          <li>Collect the admission form from the office or download from the portal.</li>
          <li>Submit filled form with required documents (Aadhaar, TC, Marksheet, Photos).</li>
          <li>Attend verification and pay the fee as per government norms.</li>
        </ol>
        <a href="#contact" className="mt-4 inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:opacity-95">Need Help? Contact Office</a>
      </div>
    </section>
  );
}


