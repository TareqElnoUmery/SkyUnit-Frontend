'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';

export default function SkyUnit() {
  const [entered, setEntered] = useState(false);
  const [shattering, setShattering] = useState(false);

  const handleEnter = () => {
    setShattering(true);
    setTimeout(() => {
      setEntered(true);
      setShattering(false);
    }, 3200);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black text-white overflow-hidden font-orbitron">
        <AnimatePresence mode="wait">
          {!entered ? (
            /* ============ REAL WORLD SCREEN ============ */
            <motion.div
              key="realworld"
              className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center gap-16 z-50"
              exit={{ opacity: 0 }}
            >
              <h1 className="text-6xl font-thin tracking-widest text-gray-600">SkyUnit</h1>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-20 py-10 bg-cyan-500 text-black text-4xl font-bold rounded-3xl shadow-2xl shadow-cyan-500/50 hover:bg-cyan-400 transition-all"
              >
                ENTER SKYUNIT
              </motion.button>
            </motion.div>
          ) : (
            /* ============ DIGITAL VOID - SKYUNIT OS ============ */
            <div className="relative w-full h-screen">
              {/* Reality Shatter Effect */}
              {shattering && (
                <motion.div
                  initial={{ clipPath: "circle(0% at 50% 50%)" }}
                  animate={{ clipPath: "circle(150% at 50% 50%)" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="fixed inset-0 z-50 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, transparent 40%, #00f2ff 70%)",
                    mixBlendMode: "screen",
                  }}
                />
              )}

              {/* 3D Scene */}
              <Canvas camera={{ position: [0, 0, 10], fov: 65 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={3} color="#00f2ff" />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#c41eff" />

                {/* Neural Avatar */}
                <Float speed={3} rotationIntensity={0.8} floatIntensity={1}>
                  <mesh>
                    <torusKnotGeometry args={[1.5, 0.4, 128, 16]} />
                    <meshStandardMaterial
                      color="#00f2ff"
                      emissive="#c41eff"
                      emissiveIntensity={4}
                      wireframe
                      opacity={0.9}
                      transparent
                    />
                  </mesh>
                </Float>

                {/* Orbital Ring */}
                <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
                {[
                  { name: "NEURAL HUB", color: "#00f2ff" },
                  { name: "VOID MARKET", color: "#c41eff" },
                  { name: "SKY FORGE", color: "#ff6a00" },
                  { name: "PHANTOM REALMS", color: "#00ff9d" },
                  { name: "DATA VAULT", color: "#ffffff" },
                  { name: "QUANTUM STREAM", color: "#8a2be2" },
                  { name: "GRAVITY CORE", color: "#ffd700" },
                  { name: "ABYSS GATE", color: "#ff0044" },
                ].map((item, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  return (
                    <group key={i} position={[Math.cos(angle) * 5, Math.sin(angle) * 5, 0]}>
                      <mesh>
                        <boxGeometry args={[1.6, 0.5, 0.3]} />
                        <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={5} />
                      </mesh>
                      <Center position={[0, -0.5, 0.16]}>
                        <Text3D font="/fonts/orbitron.json" size={0.2} height={0.05}>
                          {item.name.slice(0, 6)}
                          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={8} />
                        </Text3D>
                      </Center>
                    </group>
                  );
                })}

                {/* Post Processing */}
                <EffectComposer>
                  <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2} />
                  <ChromaticAberration offset={[0.002, 0.002]} />
                  <Glitch delay={[1.5, 3.5]} duration={[0.6, 1.0]} strength={[0.1, 0.3]} mode={GlitchMode.SPORADIC} />
                </EffectComposer>
              </Canvas>

              {/* Cyber Rain Overlay */}
              <div className="fixed inset-0 pointer-events-none opacity-20">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-px bg-cyan-400"
                    style={{ left: `${Math.random() * 100}%`, height: "100px" }}
                    animate={{ y: [0, innerHeight + 100] }}
                    transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </div>

              {/* Title + Pulse */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="fixed top-12 left-1/2 -translate-x-1/2 text-7xl font-bold text-cyan-400"
                style={{ textShadow: "0 0 60px #00f2ff, 0 0 120px #00f2ff" }}
              >
                SKYUNIT v9
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        body { margin: 0; font-family: 'Orbitron', sans-serif; }
        canvas { touch-action: none; }
      `}</style>
    </>
  );
}
