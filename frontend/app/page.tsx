import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Technology from "@/components/landing/technology";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Technology />
      <Footer />
    </>
  );
}