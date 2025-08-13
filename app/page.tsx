import Header from "@/components/school/Header";
import Hero from "@/components/school/sections/Hero";
import Notices from "@/components/school/sections/Notices";
import About from "@/components/school/sections/About";
import Academics from "@/components/school/sections/Academics";
import Admissions from "@/components/school/sections/Admissions";
import Facilities from "@/components/school/sections/Facilities";
import Contact from "@/components/school/sections/Contact";
import Footer from "@/components/school/Footer";

export default function Home() {
	return (
		<div className="min-h-dvh bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
			<Header />
			<main id="home" className="mx-auto max-w-6xl px-6">
				<Hero />
				<Notices />
				<About />
				<Academics />
				<Admissions />
				<Facilities />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}
