"use client";

import { animateWithScrollTrigger } from "@/lib/animation";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { getImageRef } from "@/lib/image";
import useImageSize from "@/lib/useImageSize";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef();

  const image1Src = "/assets/images/explore1.jpg";
  const image2Src = "/assets/images/explore2.jpg";

  const { imgSize: imgSize1, imgRef: imgRef1 } = useImageSize(image1Src);
  const { imgSize: imgSize2, imgRef: imgRef2 } = useImageSize(image2Src);

  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithScrollTrigger("#feature_title", { y: 0, opacity: 1 });
    animateWithScrollTrigger(
      ".g_grow",
      {
        scale: 1,
        opacity: 1,
        ease: "power1",
      },
      // {
      //   scrub: 5.5,
      // },
    );
    animateWithScrollTrigger(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section className="common-padding bg-zinc-900 relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="feature_title" className="section-heading">
            Explore the full story
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center mb-4">
              <video
                playsInline
                muted
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                autoPlay
                ref={videoRef}
              >
                <source src="/assets/videos/explore.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <Image
                    src={image1Src}
                    alt="explore1"
                    width={imgSize1.width}
                    height={imgSize1.height}
                    className="feature-video g_grow"
                    ref={imgRef1}
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <Image
                    src={image2Src}
                    alt="explore2"
                    width={imgSize2.width}
                    height={imgSize2.height}
                    className="feature-video g_grow"
                    ref={imgRef2}
                  />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium design
                    </span>
                    , using the same alloy that spacecrafts use for missons to Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of any metal, making
                    these out <span className="text-white">lightest Pro models ever,</span>
                    You&apos;ll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
