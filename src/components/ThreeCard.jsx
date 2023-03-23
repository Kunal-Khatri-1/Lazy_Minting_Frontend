import { Environment, Float, Html, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Box = ({ image, tokenId, price }) => {
  const imgMap = useLoader(TextureLoader, "CardBack.png");

  return (
    <group>
      <mesh>
        <planeBufferGeometry args={[8.5, 11.25]} />
        <meshStandardMaterial color="#2196f3" roughness="0" metalness="1" />
        <Html transform position={[0, 0, 0.01]} occlude>
          <div className="w-[330px] rounded-md bg-slate-900 text-white">
            <div>
              <img
                src={image}
                alt="Hi"
                className="w-[300px] h-auto m-auto pt-[15px]"
              />
            </div>
            <div className="px-[15px] py-[15px]">
              <div className="text-gray-300 text-3xl">#{tokenId}</div>
              <div className="mt-[15px] font-semibold text-4xl ">
                {price} ETH
              </div>
              {/* <div className="mt-[15px] bg-blue-500 rounded-md text-center">
                Buy Now
              </div> */}
            </div>
          </div>
        </Html>
      </mesh>
      <mesh scale={[1, 1, 1]} rotation={[0, Math.PI, 0]}>
        <planeBufferGeometry args={[8.5, 11.25]} />
        <meshStandardMaterial map={imgMap} metalness="1" roughness="0" />
      </mesh>
    </group>
  );
};

const ThreeCard = ({ image, tokenId, price }) => {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 11.5] }}>
        {/* <hemisphereLight groundColor="red" /> */}
        <Float floatIntensity={10} rotationIntensity={4}>
          <Box image={image} tokenId={tokenId} price={price} />
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
