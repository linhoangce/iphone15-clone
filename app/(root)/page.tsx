import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import HowItWorks from "@/components/HowItWorks";
import Models3D from "@/components/Models";
import React from "react";

const Home = () => {
  return (
    <main className="bg-black h-screen relative text-white">
      <Header />
      <Hero />
      <Highlights />
      <Models3D />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default Home;
