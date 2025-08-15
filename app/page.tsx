import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Academics from './components/Academics'
import Faculty from './components/Faculty'
import Contact from './components/Contact'
import { LoginWithSupabase, SignupWithSupabase } from './components/AuthWithSupabase'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Academics />
      <Faculty />
      <Contact />
      <LoginWithSupabase />
      <SignupWithSupabase />
      <Footer />
    </main>
  )
}
