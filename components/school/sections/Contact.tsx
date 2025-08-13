export default function Contact() {
  return (
    <section id="contact" className="py-12 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-semibold">Contact</h2>
      <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur p-6 shadow-sm">
        <p className="text-zinc-600 dark:text-zinc-300">School office timings: 9:00 AM – 2:00 PM (Mon–Sat)</p>
        <ul className="mt-4 text-sm space-y-1">
          <li>Phone: <a className="underline" href="tel:+911234567890">+91 12345 67890</a></li>
          <li>Email: <a className="underline" href="mailto:school@example.com">school@example.com</a></li>
          <li>Address: Near Bus Stand, Your Village/City, Your District, Your State</li>
        </ul>
      </div>
    </section>
  );
}


