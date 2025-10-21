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
  const { scene } = useThree()

  // Create cuboctahedron geometry (8 triangles + 6 squares)
  const cuboctahedronGeometry = useMemo(() => {
    // Create custom cuboctahedron geometry
    const geometry = new THREE.BufferGeometry()
    
    // Cuboctahedron vertices (all permutations of (±1, ±1, 0) etc.)
    const vertices = new Float32Array([
      // Square faces (midpoints of cube edges)
      1, 1, 0,   1, -1, 0,   -1, -1, 0,   -1, 1, 0,  // XY plane
      1, 0, 1,   1, 0, -1,   -1, 0, -1,   -1, 0, 1,  // XZ plane  
      0, 1, 1,   0, 1, -1,   0, -1, -1,   0, -1, 1,  // YZ plane
    ])
    
    // Cuboctahedron faces - 8 triangles and 6 squares
    const indices = new Uint32Array([
      // 8 Triangular faces
      0, 8, 4,    // Top-front-right triangle
      0, 5, 9,    // Top-back-right triangle  
      1, 10, 5,   // Bottom-back-right triangle
      1, 6, 11,   // Bottom-front-right triangle
      2, 11, 7,   // Bottom-front-left triangle
      2, 7, 8,    // Bottom-back-left triangle
      3, 9, 6,    // Top-back-left triangle
      3, 4, 10,   // Top-front-left triangle
      
      // 6 Square faces
      0, 4, 7, 3,   // Top square
      1, 5, 6, 2,   // Bottom square
      0, 3, 2, 1,   // Front square
      4, 8, 11, 7,  // Right square  
      5, 9, 10, 6,  // Back square
      8, 9, 10, 11  // Left square
    ])
    
    geometry.setIndex(new THREE.BufferAttribute(indices, 1))
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    
    // Add some asymmetry to make it more organic
    const positions = geometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i) 
      const z = positions.getZ(i)
      
      // Subtle distortion to break perfect symmetry
      const distortion = 0.15 * (
        Math.sin(x * 6) * Math.cos(y * 4) +
        Math.sin(y * 5) * Math.cos(z * 3) +
        Math.sin(z * 4) * Math.cos(x * 5)
      )
      
      positions.setX(i, x * (1 + distortion))
      positions.setY(i, y * (1 + distortion * 0.8))
      positions.setZ(i, z * (1 + distortion * 1.2))
    }
    
    geometry.computeVertexNormals()
    
    // Add UV coordinates for proper texturing
    const uvs = new Float32Array(positions.count * 2)
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      
      // Spherical mapping
      uvs[i * 2] = (Math.atan2(z, x) / (2 * Math.PI)) + 0.5
      uvs[i * 2 + 1] = (Math.asin(y / Math.sqrt(x*x + y*y + z*z)) / Math.PI) + 0.5
    }
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    
    return geometry
  }, [])

  // Create internal crystal structure texture
  const crystalMaterial = useMemo(() => {
    // Create a canvas texture for mathematical patterns
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext('2d')!
    
    // Psychohistory-inspired background
    const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256)
    gradient.addColorStop(0, '#001133')
    gradient.addColorStop(0.7, '#002255')
    gradient.addColorStop(1, '#003377')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, 512, 512)
    
    // Mathematical equation patterns
    context.strokeStyle = '#00aaff'
    context.lineWidth = 1.5
    context.globalAlpha = 0.6
    
    // Draw mathematical grid patterns
    for (let i = 0; i < 20; i++) {
      context.beginPath()
      for (let j = 0; j < 512; j += 4) {
        const x = j
        const y = 256 + Math.sin(j * 0.05 + i * 0.5) * 100 + Math.cos(j * 0.03) * 50
        if (j === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.stroke()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.08, 0.15, 0.4),
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      thickness: 1.8,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.6, // Higher IOR for crystal-like refraction
      specularIntensity: 1.2,
      specularColor: new THREE.Color(0.2, 0.4, 0.8),
      envMapIntensity: 1.5,
      map: texture
    })
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow, majestic rotation
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.x += delta * 0.05
      
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      
      // Pulsing effect when active
      if (active) {
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.08 + 1
        groupRef.current.scale.setScalar(pulse)
      } else {
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* Main Cuboctahedron Crystal */}
      <mesh geometry={cuboctahedronGeometry} material={crystalMaterial} />
      
      {/* Inner mathematical core */}
      <mesh geometry={cuboctahedronGeometry} scale={0.4}>
        <meshBasicMaterial
          color={new THREE.Color(0.4, 0.8, 1.0)}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Active State Effects */}
      {active && (
        <>
          <pointLight
            color={new THREE.Color(0.1, 0.3, 0.8)}
            intensity={2.5}
            distance={8}
          />
          <pointLight
            color={new THREE.Color(0.3, 0.6, 1.0)}
            intensity={1.2}
            distance={5}
            position={[2, 1, 0]}
          />
        </>
      )}
    </group>
  )
}