import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Models3D from "@/components/Models3D";
import React from "react";


const Home = () => {
  return (
    <main className="bg-black h-screen relative text-white">
      <Header />
      <Hero />
      <Highlights />
      <Models3D />
    </main>
  );
};

export default Home;
