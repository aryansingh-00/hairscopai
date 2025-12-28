import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FloatingOrb = ({ position, color, size, speed }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <Sphere args={[size, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.6}
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </Sphere>
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  
  const particlesCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#38b2ac"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const spheres = useMemo(() => {
    const items = [];
    for (let i = 0; i < 30; i++) {
      const t = i * 0.3;
      items.push({
        pos1: [Math.cos(t) * 1.5, t * 0.3 - 4, Math.sin(t) * 1.5] as [number, number, number],
        pos2: [Math.cos(t + Math.PI) * 1.5, t * 0.3 - 4, Math.sin(t + Math.PI) * 1.5] as [number, number, number],
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[5, 0, -5]}>
      {spheres.map((sphere, i) => (
        <group key={i}>
          <mesh position={sphere.pos1}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#38b2ac" emissive="#38b2ac" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={sphere.pos2}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#e86d52" emissive="#e86d52" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#38b2ac" />
        
        {/* Main floating orbs */}
        <FloatingOrb position={[-4, 2, -3]} color="#38b2ac" size={1.2} speed={0.5} />
        <FloatingOrb position={[4, -1, -4]} color="#2d9596" size={0.8} speed={0.7} />
        <FloatingOrb position={[-2, -3, -2]} color="#e86d52" size={0.6} speed={0.6} />
        <FloatingOrb position={[3, 3, -5]} color="#38b2ac" size={1} speed={0.4} />
        
        {/* DNA Helix */}
        <DNAHelix />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Background gradient sphere */}
        <mesh position={[0, 0, -15]}>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#0a1a1a" side={THREE.BackSide} />
        </mesh>
      </Canvas>
      
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background pointer-events-none" />
    </div>
  );
};

export default Background3D;
