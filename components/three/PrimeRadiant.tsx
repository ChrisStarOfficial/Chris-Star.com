"use client"

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface PrimeRadiantProps {
  active: boolean
  onClick: () => void
}

export function PrimeRadiant({ active, onClick }: PrimeRadiantProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { size, gl } = useThree()
  
  // Drag state - using the same system as TexturedEarth
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 })
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const hasMovedDuringDrag = useRef(false)

  // Create proper cuboctahedron geometry
  const cuboctahedronGeometry = useMemo(() => {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    
    // Convert to cuboctahedron by moving vertices
    const positions = geometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      
      // Move vertices toward center to create truncated corners
      const length = Math.sqrt(x*x + y*y + z*z)
      if (length > 0.1) {
        const scale = 0.7
        positions.setX(i, x * scale)
        positions.setY(i, y * scale)
        positions.setZ(i, z * scale)
      }
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])

  // Create solid crystal material
  const crystalMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.15, 0.25, 0.8),
      transmission: 0.3,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      metalness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      ior: 1.5,
      specularIntensity: 1.2,
      specularColor: new THREE.Color(0.3, 0.5, 1.0),
      envMapIntensity: 1.5
    })
  }, [])

  // Drag interaction system - same as TexturedEarth
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      
      isDragging.current = true
      hasMovedDuringDrag.current = false
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      gl.domElement.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMousePos.current.x
        const deltaY = e.clientY - lastMousePos.current.y
        
        // Check if movement exceeds threshold
        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
          hasMovedDuringDrag.current = true
        }
        
        // Apply rotation if we've exceeded the threshold
        if (hasMovedDuringDrag.current) {
          // UNLIMITED 360-degree rotation - same sensitivity for X and Y
          setTargetRotation(prev => ({
            x: prev.x + deltaY * 0.01, // Full Y-axis rotation
            y: prev.y + deltaX * 0.01  // Full X-axis rotation
          }))
        }
        
        lastMousePos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      
      isDragging.current = false
      gl.domElement.style.cursor = 'default'

      // Reset the flag for the next interaction
      hasMovedDuringDrag.current = false
    }

    const canvas = gl.domElement
    if (canvas) {
      canvas.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      if (canvas) canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [gl])

  // Smooth animations - same as TexturedEarth
  useFrame((state, delta) => {
    if (groupRef.current) {
      const rotationSpeed = 4.0
      
      if (isDragging.current) {
        // During drag, interpolate smoothly but quickly
        const diffX = targetRotation.x - currentRotation.x
        const diffY = targetRotation.y - currentRotation.y

        setCurrentRotation({
          x: currentRotation.x + diffX * rotationSpeed * 2 * delta,
          y: currentRotation.y + diffY * rotationSpeed * 2 * delta
        })

        groupRef.current.rotation.x = currentRotation.x
        groupRef.current.rotation.y = currentRotation.y
      } else {
        // No auto-rotation when not dragging
        groupRef.current.rotation.x = currentRotation.x
        groupRef.current.rotation.y = currentRotation.y
      }
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()

    // Use a timeout to ensure all mouse events have been processed
    setTimeout(() => {
      // Only trigger if we're definitely not dragging and haven't moved
      if (!isDragging.current && !hasMovedDuringDrag.current) {
        onClick()
      }
    }, 50)

    // Reset for next interaction
    hasMovedDuringDrag.current = false
  }

  return (
    <>
      {/* Camera setup */}
      <perspectiveCamera
        position={[0, 0, 5]}
        fov={60}
        aspect={size.width / size.height}
        near={0.1}
        far={1000}
      />
      
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#4f8cff" />
      <pointLight position={[-3, -3, -3]} intensity={0.5} color="#0066ff" />

      {/* Prime Radiant Group */}
      <group 
        ref={groupRef}
        onClick={handleClick}
        onPointerEnter={() => {
          if (!isDragging.current) gl.domElement.style.cursor = 'grab'
        }}
        onPointerLeave={() => {
          if (!isDragging.current) gl.domElement.style.cursor = 'default'
        }}
      >
        {/* Main Cuboctahedron - scaled up */}
        <mesh geometry={cuboctahedronGeometry} material={crystalMaterial} scale={1.8} />
        
        {/* Edge highlights */}
        <lineSegments>
          <edgesGeometry args={[cuboctahedronGeometry]} />
          <lineBasicMaterial color={0x4488ff} linewidth={2} />
        </lineSegments>

        {/* Active State Glow */}
        {active && (
          <pointLight
            color={new THREE.Color(0.2, 0.5, 1.0)}
            intensity={3}
            distance={6}
          />
        )}
      </group>
    </>
  )
}