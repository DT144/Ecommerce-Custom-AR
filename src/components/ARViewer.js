import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { XR, useXR } from "@react-three/xr";
import * as THREE from "three"; // Import THREE for Vector3

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

function ARScene() {
  const { gl, camera } = useThree();
  const { isAR, xr } = useXR();
  const reticleRef = useRef();

  useEffect(() => {
    if (isAR) {
      let currentSession;

      const startAR = async () => {
        try {
          currentSession = await navigator.xr.requestSession("immersive-ar", {
            requiredFeatures: ["hit-test", "dom-overlay"],
            // optionalFeatures: ['dom-overlay']
          });

          xr.setSession(currentSession);

          // Create a hit test source to place objects
          const hitTestSource = await currentSession.requestHitTestSource({
            space: "viewer",
          });

          const onSelect = () => {
            if (reticleRef.current) {
              const reticle = reticleRef.current;
              const matrix = new Float32Array(16);
              reticle.matrixWorld.toArray(matrix);
              const position = new THREE.Vector3();
              position.setFromMatrixPosition(reticle.matrixWorld);
              const tv = sceneRef.current.clone();
              tv.position.copy(position);
              sceneRef.current.add(tv);
            }
          };

          currentSession.addEventListener("select", onSelect);

          // Set up the AR render loop
          gl.animationLoop((time, frame) => {
            if (currentSession) {
              const referenceSpace = gl.xr.getReferenceSpace();
              const hitTestResults = frame.getHitTestResults(hitTestSource);

              if (hitTestResults.length) {
                const hit = hitTestResults[0];
                hit
                  .getPose(hit.pose, referenceSpace)
                  .transform.matrix.toArray(matrix);
                reticleRef.current.matrix.fromArray(matrix);
                reticleRef.current.visible = true;
              } else {
                reticleRef.current.visible = false;
              }

              gl.render(scene, camera);
            }
          });
        } catch (error) {
          console.error("AR failed to start", error);
        }
      };

      startAR();

      return () => {
        if (currentSession) {
          currentSession.end();
        }
      };
    }
  }, [isAR, xr, gl, camera]);

  const { scene } = useThree();
  const { scene: gltfScene } = useGLTF("samsung-tv.glb");
  const model = useRef();

  useEffect(() => {
    if (gltfScene) {
      gltfScene.scale.set(0.005, 0.005, 0.005);
      gltfScene.position.set(0, -0.5, 0);
      scene.add(gltfScene);
      sceneRef.current = scene;
    }
  }, [gltfScene, scene]);

  return (
    <>
      <mesh ref={reticleRef} visible={false}>
        <ringGeometry args={[0.1, 0.11, 32]} />
        <meshBasicMaterial color="white" opacity={0.8} transparent />
      </mesh>
      <OrbitControls />
    </>
  );
}

function ARButton({ children }) {
  const { gl } = useThree();
  const { isSupported, isAR, start, end } = useXR();
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (isSupported) {
      setSupported(true);
    }
  }, [isSupported]);

  const handleARClick = () => {
    if (!isAR) {
      start();
    } else {
      end();
    }
  };
  return supported ? <button onClick={handleARClick}>{children}</button> : null;
}

function ARViewer({ modelPath }) {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ARButton>Start AR</ARButton>
      <Canvas>
        <XR>
          <ARScene modelPath={modelPath} />
        </XR>
      </Canvas>
    </div>
  );
}

export default ARViewer;
