import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import About from "../src/components/About";
import Portfolio from "../src/components/Portfolio";
import CVSection from "../src/components/CVSection";
import QuotesSection from "../src/components/QuotesSection";
import Contact from "../src/components/Contact";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <About />
        <Portfolio />
        <CVSection />
        <QuotesSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
