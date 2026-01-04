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
            opacity={0.7}
            distort={0.3}
            speed={1.5}
            roughness={0.1}
          />
        </Sphere>
      </mesh>
    </Float>
  );
};

// Snowfall particles
const Snowfall = () => {
  const points = useRef<THREE.Points>(null);
  
  const particlesCount = 500;
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const vel = new Float32Array(particlesCount);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 20 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      vel[i] = 0.5 + Math.random() * 1;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      const posArray = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        // Move down
        posArray[i * 3 + 1] -= velocities[i] * delta * 2;
        // Gentle sway
        posArray[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        
        // Reset to top when below screen
        if (posArray[i * 3 + 1] < -10) {
          posArray[i * 3 + 1] = 15;
          posArray[i * 3] = (Math.random() - 0.5) * 30;
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

// Ice crystals / snowflakes
const IceCrystal = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Six-pointed snowflake shape */}
      {[0, 60, 120].map((angle, i) => (
        <group key={i} rotation={[0, 0, (angle * Math.PI) / 180]}>
          <mesh>
            <boxGeometry args={[0.02, 0.5, 0.02]} />
            <meshStandardMaterial color="#c5e1f5" emissive="#87ceeb" emissiveIntensity={0.3} transparent opacity={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.02, 0.5, 0.02]} />
            <meshStandardMaterial color="#c5e1f5" emissive="#87ceeb" emissiveIntensity={0.3} transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Aurora effect
const AuroraBorealis = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          float wave = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
          float wave2 = sin(vUv.x * 8.0 - time * 0.7) * 0.5 + 0.5;
          
          vec3 color1 = vec3(0.2, 0.7, 0.9); // Cyan
          vec3 color2 = vec3(0.5, 0.2, 0.8); // Purple
          vec3 color3 = vec3(0.2, 0.9, 0.5); // Green
          
          vec3 finalColor = mix(color1, color2, wave);
          finalColor = mix(finalColor, color3, wave2 * 0.3);
          
          float alpha = (1.0 - vUv.y) * 0.3 * (wave * 0.5 + 0.5);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 6, -10]} material={shaderMaterial}>
      <planeGeometry args={[30, 8, 32, 32]} />
    </mesh>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} color="#e0f0ff" />
        <pointLight position={[-10, 5, -5]} intensity={0.4} color="#87ceeb" />
        <pointLight position={[10, -5, -5]} intensity={0.3} color="#dda0dd" />
        
        {/* Icy floating orbs */}
        <FloatingOrb position={[-4, 2, -3]} color="#87ceeb" size={1.2} speed={0.4} />
        <FloatingOrb position={[4, -1, -4]} color="#b0e0e6" size={0.9} speed={0.5} />
        <FloatingOrb position={[-2, -3, -2]} color="#e6e6fa" size={0.7} speed={0.6} />
        <FloatingOrb position={[3, 3, -5]} color="#add8e6" size={1.1} speed={0.35} />
        <FloatingOrb position={[0, 0, -6]} color="#dda0dd" size={0.5} speed={0.7} />
        
        {/* Ice crystals scattered around */}
        <IceCrystal position={[-5, 3, -4]} scale={0.8} />
        <IceCrystal position={[5, 2, -3]} scale={0.6} />
        <IceCrystal position={[-3, -2, -5]} scale={0.5} />
        <IceCrystal position={[4, -3, -4]} scale={0.7} />
        
        {/* Aurora effect at top */}
        <AuroraBorealis />
        
        {/* Snowfall */}
        <Snowfall />
        
        {/* Background - Dark winter night sky */}
        <mesh position={[0, 0, -15]}>
          <sphereGeometry args={[25, 32, 32]} />
          <meshBasicMaterial color="#0a1525" side={THREE.BackSide} />
        </mesh>
      </Canvas>
      
      {/* Gradient overlay for readability - Winter themed */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background pointer-events-none" />
    </div>
  );
};

export default Background3D;