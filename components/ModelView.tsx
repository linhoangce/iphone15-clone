import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";

import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";
import { Suspense } from "react";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full cursor-pointer absolute ${index === 2 ? "right-[-100%]" : ""} z-10`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 3.5 ]} />

      <Lights />

      <OrbitControls
        makeDefault
        autoRotate
        enableZoom={false}
        autoRotateSpeed={2}
        ref={controlRef}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group ref={groupRef} name={`${index === 1} ? 'small' : 'large`} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IPhone scale={index === 1 ? [15, 15, 15] : [17.5, 17.5, 17.5]} item={item} size={size} />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
