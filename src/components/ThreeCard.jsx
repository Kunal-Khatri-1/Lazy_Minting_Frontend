// import { useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   RenderTexture,
//   OrbitControls,
//   PerspectiveCamera,
//   Text,
//   ContactShadows,
// } from "@react-three/drei";

// export default function ThreeCard() {
//   return (
//     <div className="h-screen">
//       <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} />
//         <Cube />
//         <ContactShadows
//           frames={1}
//           position={[0, -0.5, 0]}
//           blur={1}
//           opacity={0.75}
//         />
//         <ContactShadows
//           frames={1}
//           position={[0, -0.5, 0]}
//           blur={3}
//           color="orange"
//         />
//         <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
//       </Canvas>
//     </div>
//   );
// }

// function Cube() {
//   const textRef = useRef();
//   useFrame(
//     (state) =>
//       (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2)
//   );
//   return (
//     <mesh>
//       <boxGeometry />
//       <meshStandardMaterial>
//         <RenderTexture attach="map" anisotropy={16}>
//           <PerspectiveCamera
//             makeDefault
//             manual
//             aspect={1 / 1}
//             position={[0, 0, 5]}
//           />
//           <color attach="background" args={["orange"]} />
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} />
//           <Text ref={textRef} fontSize={4} color="#555">
//             hello
//           </Text>
//         </RenderTexture>
//       </meshStandardMaterial>
//     </mesh>
//   );
// }

import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  RenderTexture,
  Text,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import images from "../images/index";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MeshStandardMaterial, TextureLoader } from "three";

const Box = () => {
  const imgMap = useLoader(TextureLoader, "CardBack.png");

  return (
    <group>
      <mesh>
        <planeBufferGeometry args={[8.5, 11.5]} />
        <meshStandardMaterial color="#2196f3" roughness="0" metalness="1" />
        <Html transform position={[0, 0, 0.01]} occlude>
          <div className="w-[330px] rounded-md bg-slate-900 text-white">
            <div>
              <img
                src={images.doodles}
                alt="Hi"
                className="w-[300px] h-auto m-auto pt-[15px]"
              />
            </div>
            <div className="px-[15px] py-[15px]">
              <div className="text-gray-300">Doodle #137</div>
              <div className="mt-[15px] font-semibold text-lg ">6.25 ETH</div>
              <div className="mt-[15px] bg-blue-500 rounded-md text-center">
                Buy Now
              </div>
            </div>
          </div>
        </Html>
      </mesh>
      <mesh scale={[1, 1, 1]} rotation={[0, Math.PI, 0]}>
        <planeBufferGeometry args={[8.5, 11.5]} />
        <meshStandardMaterial map={imgMap} metalness="1" roughness="0" />
      </mesh>
    </group>
  );
};

const ThreeCard = () => {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 22.5] }}>
        {/* <hemisphereLight groundColor="red" /> */}
        <Float floatIntensity={10} rotationIntensity={4}>
          <Box />
        </Float>
        <Environment background preset="dawn" blur={0.8} />
        {/* <ContactShadows
          position={[0, -9, 0]}
          opacity={0.7}
          scale={40}
          blur={1}
        /> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeCard;
