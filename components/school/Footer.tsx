export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-zinc-500">
        © {new Date().getFullYear()} Government Senior Secondary School. All rights reserved.
      </div>
    </footer>
  );
}


