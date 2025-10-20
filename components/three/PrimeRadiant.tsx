"use client"

import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface PrimeRadiantProps {
  active: boolean
  onClick: () => void
}

export function PrimeRadiant3D({ active, onClick }: PrimeRadiantProps) {
  const groupRef = useRef<THREE.Group>(null)
  const hologramRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const { camera, scene } = useThree()

  // Hologram state
  const [hologramIntensity, setHologramIntensity] = useState(0)

  // Particle system
  const particleGeometry = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry())
  const particleCount = 2000

  useEffect(() => {
    // Initialize particles
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a spherical formation
      const i3 = i * 3
      const radius = 2 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Blue-cyan colors for hologram effect
      colors[i3] = 0.2 + Math.random() * 0.3 // R
      colors[i3 + 1] = 0.6 + Math.random() * 0.4 // G
      colors[i3 + 2] = 0.8 + Math.random() * 0.2 // B

      sizes[i] = Math.random() * 0.1 + 0.05
    }

    particleGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.current.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeometry.current.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  }, [])

  // Main animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y += delta * 0.2

      // Hologram pulse effect when active
      if (active && hologramRef.current) {
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.8
        hologramRef.current.scale.setScalar(0.8 + pulse * 0.2)
      }

      // Particle animation
      if (particlesRef.current) {
        particlesRef.current.rotation.y += delta * 0.1
        particlesRef.current.rotation.x += delta * 0.05

        // Animate particle positions for flowing effect
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          positions[i3] += Math.sin(state.clock.elapsedTime + i) * 0.001
          positions[i3 + 1] += Math.cos(state.clock.elapsedTime + i) * 0.001
          positions[i3 + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true
      }

      // Camera positioning based on active state
      const targetZ = active ? 4 : 6
      camera.position.z += (targetZ - camera.position.z) * delta * 2
    }

    // Hologram intensity
    setHologramIntensity(prev => {
      const target = active ? 1 : 0
      return prev + (target - prev) * delta * 3
    })
  })

  // Crystal geometry - inspired by Prime Radiant
  const crystalGeometry = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(1, 2)
    
    // Distort to create unique crystal shape
    const positions = geometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      
      // Create asymmetric crystal growth
      const distortion = 0.3 * Math.sin(x * 5) * Math.cos(y * 3) * Math.sin(z * 4)
      positions.setX(i, x * (1 + distortion))
      positions.setY(i, y * (1 + distortion * 0.7))
      positions.setZ(i, z * (1 + distortion * 1.2))
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])

  const handleClick = (e: any) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* Main Crystal Structure */}
      <mesh geometry={crystalGeometry} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={new THREE.Color(0.1, 0.3, 0.8)}
          transmission={0.8}
          opacity={0.9}
          transparent
          thickness={1.5}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Holographic Projection */}
      <group ref={hologramRef}>
        {/* Mathematical equations/psychohistory patterns */}
        <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <planeGeometry args={[2, 2, 32, 32]} />
          <shaderMaterial
            transparent
            opacity={0.6 * hologramIntensity}
            vertexShader={`
              varying vec2 vUv;
              varying vec3 vPosition;
              void main() {
                vUv = uv;
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float time;
              varying vec2 vUv;
              varying vec3 vPosition;
              
              void main() {
                vec2 uv = vUv * 2.0 - 1.0;
                float dist = length(uv);
                
                // Create psychohistory equation patterns
                float pattern = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time);
                pattern += sin(uv.y * 25.0 - time * 0.7) * cos(uv.x * 18.0 + time * 0.5);
                
                vec3 color = mix(
                  vec3(0.0, 0.3, 0.8),
                  vec3(0.2, 0.6, 1.0),
                  pattern * 0.5 + 0.5
                );
                
                float alpha = (1.0 - dist) * pattern * 0.3;
                gl_FragColor = vec4(color, alpha);
              }
            `}
            uniforms={{
              time: { value: 0 }
            }}
          />
        </mesh>
      </group>

      {/* Floating Particles - Mathematical Data Points */}
      <points ref={particlesRef}>
        <primitive object={particleGeometry.current} />
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Energy Beams */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshBasicMaterial
          color={new THREE.Color(0.2, 0.6, 1.0)}
          transparent
          opacity={0.4 * hologramIntensity}
        />
      </mesh>

      {/* Interactive Glow Effect */}
      {active && (
        <pointLight
          color={new THREE.Color(0.2, 0.5, 1.0)}
          intensity={2}
          distance={10}
          position={[0, 0, 0]}
        />
      )}
    </group>
  )
}