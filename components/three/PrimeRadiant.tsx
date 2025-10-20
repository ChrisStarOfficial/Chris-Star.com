"use client"

import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface PrimeRadiantProps {
  active: boolean
  onClick: () => void
}

export function PrimeRadiant({ active, onClick }: PrimeRadiantProps) {
  const groupRef = useRef<THREE.Group>(null)
  const hologramRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const { camera } = useThree()

  // Particle system
  const particleGeometry = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry())
  const particleCount = 1500

  useEffect(() => {
    // Initialize particles
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a spherical formation
      const i3 = i * 3
      const radius = 1.5 + Math.random() * 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Blue-cyan colors for hologram effect
      colors[i3] = 0.2 + Math.random() * 0.3 // R
      colors[i3 + 1] = 0.6 + Math.random() * 0.4 // G
      colors[i3 + 2] = 0.8 + Math.random() * 0.2 // B

      sizes[i] = Math.random() * 0.08 + 0.03
    }

    particleGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.current.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeometry.current.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  }, [])

  // Crystal geometry - inspired by Prime Radiant
  const crystalGeometry = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(0.8, 2)
    
    // Distort to create unique crystal shape
    const positions = geometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      
      // Create asymmetric crystal growth
      const distortion = 0.2 * Math.sin(x * 5) * Math.cos(y * 3) * Math.sin(z * 4)
      positions.setX(i, x * (1 + distortion))
      positions.setY(i, y * (1 + distortion * 0.7))
      positions.setZ(i, z * (1 + distortion * 1.2))
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3

      if (active && hologramRef.current) {
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 0.85
        hologramRef.current.scale.setScalar(0.9 + pulse * 0.1)
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y += delta * 0.2
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          positions[i3] += Math.sin(state.clock.elapsedTime + i) * 0.002
          positions[i3 + 1] += Math.cos(state.clock.elapsedTime + i) * 0.002
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true
      }

      const targetZ = active ? 4 : 5
      camera.position.z += (targetZ - camera.position.z) * delta * 2
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* Main Crystal Structure */}
      <mesh geometry={crystalGeometry}>
        <meshPhysicalMaterial
          color={new THREE.Color(0.1, 0.3, 0.8)}
          transmission={0.7}
          opacity={0.8}
          transparent
          thickness={1.2}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Holographic Rings */}
      <group ref={hologramRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshBasicMaterial color={new THREE.Color(0.2, 0.6, 1.0)} transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.4, 0.015, 16, 100]} />
          <meshBasicMaterial color={new THREE.Color(0.3, 0.7, 1.0)} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Data Particles - Mathematical Data Points */}
      <points ref={particlesRef}>
        <primitive object={particleGeometry.current} />
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Active State Glow Effect */}
      {active && (
        <pointLight
          color={new THREE.Color(0.2, 0.5, 1.0)}
          intensity={1.5}
          distance={8}
        />
      )}
    </group>
  )
}