"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import { animateWithScrollTrigger } from "@/lib/animation";

import { getImageRef } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const videoRef = useRef();

  useEffect(() => {
    const setImageSize = async () => {
      const img = await getImageRef("/assets/images/frame.png");
      setImgSize({ width: img?.width || 0, height: img?.height || 0 });
    };
    setImageSize();
  }, []);

  useGSAP(() => {
    gsap.to(".hiw-video", {
      scrollTrigger: {
        trigger: ".hiw-video",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithScrollTrigger(".g_fadeIn", {
      scrollTrigger: {
        trigger: ".g_fadeIn",
        toggleActions: "start start start start",
        start: "top 20%",
      },
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20 ">
          <Image src="/assets/images/chip.jpeg" alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro Chip.
            <br /> A monster win for gaming.
          </h2>

          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple CPU.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <Image
                width={imgSize.width}
                height={imgSize.height}
                src="/assets/images/frame.png"
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src="/assets/videos/frame.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <p className="text-gray-500 font-semibold text-center mt-3">Honkai: Star Rail</p>
        </div>
        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers out{" "}
              <span className="text-white">best graphic performance by far</span>
            </p>

            <p className="hiw-text g_fadeIn">
              Mobile <span className="text-white">games will look and feel so immersive</span>
              with incredibly detailed enviroments and characters.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
