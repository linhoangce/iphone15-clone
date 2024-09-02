import { hightlightsSlides } from "@/constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[] | null>([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useEffect(() => {
    if (loadedData.length === hightlightsSlides.length) {
      setVideo((prev) => ({
        ...prev,
        startPlay: true,
        isPlaying: true,
      }));
    }
  }, [loadedData]);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translate(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    const currentVideo = videoRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? "10vw" : window.innerWidth < 1200 ? "10vw" : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animationUpdate = () => {
        if (currentVideo !== null) {
          anim.progress(
            currentVideo[videoId].currentTime / hightlightsSlides[videoId].videoDuration,
          );
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animationUpdate);
      } else {
        gsap.ticker.remove(animationUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);

  useEffect(() => {
    const currentVideo = videoRef.current;

    if (currentVideo !== null) {
      if (loadedData.length > 3) {
        if (!isPlaying) {
          currentVideo[videoId].pause();
        } else {
          startPlay &&
            currentVideo[videoId].play().catch((error) => {
              console.error("Video playback failed:", error);
              setVideo((prev) => ({ ...prev, isPlaying: false }));
            });
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = useCallback(
    (type, i?) => {
      switch (type) {
        case "video-end":
          setVideo((prevVideo) => ({
            ...prevVideo,
            isEnd: true,
            videoId: i + 1,
          }));
          break;

        case "video-last":
          setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
          break;

        case "video-reset":
          setVideo((prevVideo) => ({
            ...prevVideo,
            isLastVideo: false,
            videoId: 0,
          }));
          break;

        case "play":
          setVideo((prevVideo) => ({
            ...prevVideo,
            isPlaying: !prevVideo.isPlaying,
          }));
          break;

        case "pause":
          setVideo((prevVideo) => ({
            ...prevVideo,
            isPlaying: !prevVideo.isPlaying,
          }));
          break;

        default:
          return video;
      }
    },
    [video],
  );

  const handleLoadedMetadata = (index: number, event: any) =>
    setLoadedData((prevMetadata) => [...prevMetadata, event]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel-container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="none"
                  muted
                  autoPlay
                  className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                  ref={(el) => {
                    videoRef.current[i] = el;
                  }}
                  onEnded={() => {
                    i !== 3 ? handleProcess("video-end", i) : handleProcess("video-last");
                  }}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="sticky-bottom flex-center py-5 px-7 bg-[rgba(66,66,69,0.7)] backdrop-blur-md rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-[rgba(66,66,69,0.7)] rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <Button className="control-btn ">
          <Image
            src={
              isLastVideo
                ? "assets/images/replay.svg"
                : !isPlaying
                  ? "/assets/images/play.svg"
                  : "assets/images/pause.svg"
            }
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            width={30}
            height={30}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
            }
          />
        </Button>
      </div>
    </>
  );
};

export default VideoCarousel;
