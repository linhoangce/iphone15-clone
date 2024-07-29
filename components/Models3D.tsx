"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

import ModelView from "./ModelView";
import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import { models, sizes } from "@/constants";
import { Button } from "./ui/button";

const Models3D = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["$8F8A81", "#FFE7B9", "#6F6C64"],
    img: "assets/images/yellow.jpg",
  });

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // models
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotations
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    gsap.to("#heading", {
      opacity: 1,
      y: 0,
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="sreen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              // eventSource={document.getElementById("root")}
            >
              <View.Port />
              {/* <Preload all /> */}
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((model, index) => (
                  <li
                    key={index}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: model.color[0] }}
                    onClick={() => setModel(model)}
                  ></li>
                ))}
              </ul>

              <Button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn cursor-pointer"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Models3D;
