import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import SelectedWorks from "@/components/SelectedWorks";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navigation />
      <Hero />
      <Clients />
      <Services />
      <SelectedWorks />
      <Process />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
