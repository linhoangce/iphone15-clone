"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });

    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section id="highlights" className="w-screen px-5 overflow-hidden common-padding bg-zinc-900 ">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">
            Get the highlights
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <Image
                src="/assets/images/watch.svg"
                alt="watch"
                className="ml-2"
                width={20}
                height={20}
              />
            </p>
            <p className="link">
              Watch the event
              <Image
                src="/assets/images/right.svg"
                alt="watch"
                className="ml-2 "
                width={10}
                height={10}
              />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
