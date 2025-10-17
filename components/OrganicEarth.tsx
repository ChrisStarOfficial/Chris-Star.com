"use client"

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { TextureLoader, MeshStandardMaterial, Vector3 } from 'three'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'

interface OrganicEarthProps {
  isZoomed?: boolean
}

// Custom shader for geode-like crystalline surface
const geodeVertexShader = `
  uniform float time;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vPosition = position;
    vNormal = normal;
    
    // Geode displacement - organic irregularities
    float displacement = sin(position.x * 8.0 + time) * 0.02 +
                        sin(position.y * 6.0 + time * 1.3) * 0.015 +
                        sin(position.z * 7.0 + time * 0.7) * 0.01;
    
    // Toroidal flattening - apple-like shape
    float toroidalFactor = 1.0 - length(position.xy) * 0.1;
    vec3 toroidalPosition = position * (0.9 + toroidalFactor * 0.2);
    
    // Polar depressions - subtle "holes"
    float poleDepth = 1.0 - smoothstep(0.7, 1.0, abs(position.z));
    toroidalPosition.z *= 1.0 - poleDepth * 0.3;
    
    vec3 finalPosition = toroidalPosition + normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
  }
`

const geodeFragmentShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    // Crystalline facet effect
    float facet = floor(dot(vNormal, vec3(1.0)) * 8.0) / 8.0;
    
    // Geode-like color variations
    vec3 deepBlue = vec3(0.1, 0.2, 0.4);
    vec3 mineralGreen = vec3(0.3, 0.5, 0.4);
    vec3 crystal = vec3(0.6, 0.8, 1.0);
    
    // Blend colors based on position and facets
    float blend = facet * 0.5 + sin(vPosition.y * 4.0) * 0.3;
    vec3 color = mix(deepBlue, mineralGreen, blend);
    color = mix(color, crystal, facet * 0.3);
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export function OrganicEarth({ isZoomed = false }: OrganicEarthProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { size, viewport } = useThree()

  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const autoRotation = useRef(true)

  // Create custom geometry with organic imperfections
  const customGeometry = useMemo(() => {
    // We'll start with a sphere and deform it
    const geometry = new THREE.SphereGeometry(1, 128, 128)
    
    const positions = geometry.attributes.position.array
    const normals = geometry.attributes.normal.array
    
    // Apply organic deformations
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1] 
      const z = positions[i + 2]
      
      // Geode bulges and indentations
      const radius = Math.sqrt(x*x + y*y + z*z)
      const noise = Math.sin(x * 5) * Math.cos(y * 7) * Math.sin(z * 6) * 0.1
      
      // Toroidal flattening
      const equatorialCompression = 1.0 - (z * z) * 0.2
      
      // Polar depressions
      const poleFactor = Math.max(0, Math.abs(z) - 0.8) * 3.0
      const polarDepression = 1.0 - poleFactor * 0.4
      
      const scale = (1.0 + noise) * equatorialCompression * polarDepression
      
      positions[i] *= scale
      positions[i + 1] *= scale  
      positions[i + 2] *= scale
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])

  // Mouse drag interaction
  const bind = useDrag(({ active, movement: [mx, my], first, last }) => {
    isDragging.current = active
    autoRotation.current = !active
    if (active) {
      setRotation((prev: { x: number; y: number }) => ({
        x: prev.x + my * 0.01,
        y: prev.y + mx * 0.01
      }))
    }

    // Return to auto-rotation after drag ends
    if (last) {
      setTimeout(() => {
        if (!isDragging.current) {
          autoRotation.current = true
        }
      }, 2000) // 2 second delay before auto-rotation resumes
    }
  })

  // Animate rotation with organic variation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slower rotation when zoomed
      const rotationSpeed = isZoomed ? 0.03 : 0.1

      if (autoRotation.current && !isDragging.current) {
        // Smooth auto-rotation
        groupRef.current.rotation.y += delta * rotationSpeed
        groupRef.current.rotation.x += Math.sin(state.clock.elapsedTime) * delta * 0.02
      } else {
        // Apply manual rotation from drag
        groupRef.current.rotation.x = rotation.x
        groupRef.current.rotation.y = rotation.y
      }
    }
  })

  return (
    <group ref={groupRef}>
      <mesh 
        ref={meshRef} 
        geometry={customGeometry}
        {...bind()} // Attach drag handlers
        onClick={(e) => {
          e.stopPropagation()
          if (!isDragging.current) { // Only trigger briefing if not dragging
            window.dispatchEvent(new CustomEvent('earthBriefingOpen'))
          }
        }}
        onPointerEnter={() => {
          if (document.body) document.body.style.cursor = 'grab'
        }}
        onPointerDown={() => {
          if (document.body) document.body.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          if (document.body) document.body.style.cursor = 'grab'
        }}
        onPointerLeave={() => {
          if (document.body) document.body.style.cursor = 'default'
        }}
      >
        <shaderMaterial
          vertexShader={geodeVertexShader}
          fragmentShader={geodeFragmentShader}
          uniforms={{
            time: { value: 0 }
          }}
        />
        
        {/* Atmospheric glow */}
        <mesh>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshBasicMaterial 
            color="#1a4577" 
            transparent 
            opacity={0.1} 
            side={THREE.BackSide}
          />
        </mesh>
      </mesh>
    </group>
  )
}