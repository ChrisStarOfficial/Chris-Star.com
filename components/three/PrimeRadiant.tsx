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
  const innerCoreRef = useRef<THREE.Group>(null)
  const { gl, scene, size } = useThree()
  
  // Animation states
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 })
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 })
  const [innerPulse, setInnerPulse] = useState(0)
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const hasMovedDuringDrag = useRef(false)

  // PERFECT cuboctahedron geometry - mathematically precise
  const cuboctahedronGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    
    // Cuboctahedron vertices: all permutations of (±1, ±1, 0), (±1, 0, ±1), (0, ±1, ±1)
    const vertices = new Float32Array([
      // XY plane square (z=0)
       1,  1,  0,    1, -1,  0,   -1, -1,  0,   -1,  1,  0,
      // XZ plane square (y=0)  
       1,  0,  1,    1,  0, -1,   -1,  0, -1,   -1,  0,  1,
      // YZ plane square (x=0)
       0,  1,  1,    0,  1, -1,    0, -1, -1,    0, -1,  1
    ])

    // Faces: 8 triangles + 6 squares - perfectly planar
    const indices = new Uint32Array([
      // 8 Triangular faces
      0, 8, 4,    0, 5, 9,    1, 10, 5,   1, 6, 11,
      2, 11, 7,   2, 7, 8,    3, 9, 6,    3, 4, 10,
      
      // 6 Square faces
      0, 4, 7, 3,    // Top square
      1, 5, 6, 2,    // Bottom square
      0, 3, 2, 1,    // Front square
      4, 8, 11, 7,   // Right square
      5, 9, 10, 6,   // Back square
      8, 9, 10, 11   // Left square
    ])

    geometry.setIndex(new THREE.BufferAttribute(indices, 1))
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    
    // Compute proper normals for perfect planar faces
    geometry.computeVertexNormals()
    
    return geometry
  }, [])

  // Inner cuboctahedron geometry (smaller, centered)
  const innerCuboctahedronGeometry = useMemo(() => {
    const geometry = cuboctahedronGeometry.clone()
    const positions = geometry.attributes.position
    const scale = 0.3 // Much smaller inner core
    for (let i = 0; i < positions.count; i++) {
      positions.setX(i, positions.getX(i) * scale)
      positions.setY(i, positions.getY(i) * scale)
      positions.setZ(i, positions.getZ(i) * scale)
    }
    geometry.computeVertexNormals()
    return geometry
  }, [cuboctahedronGeometry])

  // Central energy tetrahedron
  const tetrahedronGeometry = useMemo(() => {
    const geometry = new THREE.TetrahedronGeometry(0.15, 0)
    return geometry
  }, [])

  // Symmetrical data lattice geometry - geometric connections only
  const dataLatticeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []
    
    // Define symmetric connection points (centers of faces and edges)
    const connectionPoints: [number, number, number][] = [
      // Triangle centers (scaled inward)
      [0.67, 0.67, 0.67], [-0.67, -0.67, 0.67], [-0.67, 0.67, -0.67], [0.67, -0.67, -0.67],
      // Square centers  
      [0, 0, 0.8], [0, 0, -0.8], [0, 0.8, 0], [0, -0.8, 0], [0.8, 0, 0], [-0.8, 0, 0]
    ]
    
    // Connect points in symmetrical geometric patterns only
    const connections: [number, number][] = [
      [0, 4], [0, 6], [0, 8],  // Top triangle to adjacent squares
      [1, 4], [1, 7], [1, 9],  // Bottom triangle to adjacent squares
      [2, 5], [2, 6], [2, 9],  // Back triangle
      [3, 5], [3, 7], [3, 8],  // Front triangle
      // Connect square centers to form inner octahedron
      [4, 6], [4, 7], [4, 8], [4, 9],
      [5, 6], [5, 7], [5, 8], [5, 9],
      [6, 8], [6, 9], [7, 8], [7, 9]
    ]
    
    // Build vertex array from connections
    connections.forEach(([start, end]) => {
      const [x1, y1, z1] = connectionPoints[start]
      const [x2, y2, z2] = connectionPoints[end]
      vertices.push(x1, y1, z1, x2, y2, z2)
    })
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  // Outer shell material - HIGH-QUALITY crystal
  const outerMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.02, 0.05, 0.15),
      transmission: 0.98, // Near-perfect transparency
      opacity: 1,
      transparent: true,
      thickness: 1.8,
      roughness: 0.01, // Mirror-like smoothness
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      ior: 1.65, // Higher refraction index
      specularIntensity: 3.0,
      specularColor: new THREE.Color(0.4, 0.6, 1.0),
      envMapIntensity: 4.0,
      attenuationColor: new THREE.Color(0.02, 0.08, 0.2),
      attenuationDistance: 1.2
    })
  }, [])

  // Inner core material - emissive energy
  const innerCoreMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.3, 0.7, 1.0),
      emissive: new THREE.Color(0.15, 0.4, 0.9),
      emissiveIntensity: 1.2,
      transmission: 0.4,
      roughness: 0.05,
      metalness: 0.9,
      transparent: true,
      opacity: 0.95
    })
  }, [])

  // Central tetrahedron material - pure energy
  const tetrahedronMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(0.6, 0.9, 1.2),
      emissive: new THREE.Color(0.3, 0.6, 1.0),
      emissiveIntensity: 2.0,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
  }, [])

  // Edge glow material - subtle additive highlights
  const edgeMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(0.5, 0.8, 1.2),
      linewidth: 1,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    })
  }, [])

  // Data lattice material - internal energy flow
  const dataLatticeMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(0.4, 0.8, 1.1),
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      linewidth: 0.5
    })
  }, [])

  // Particle system for volumetric energy
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(30 * 3) // 10 particles
    const colors = new Float32Array(30 * 3)
    const sizes = new Float32Array(10)
    
    for (let i = 0; i < 10; i++) {
      const i3 = i * 3
      // Concentrate particles near center
      const radius = Math.random() * 0.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      
      // Blue-white colors
      colors[i3] = 0.4 + Math.random() * 0.3
      colors[i3 + 1] = 0.6 + Math.random() * 0.4
      colors[i3 + 2] = 0.9 + Math.random() * 0.3
      
      sizes[i] = 0.02 + Math.random() * 0.01
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geometry
  }, [])

  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })
  }, [])

  // Drag interaction system
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
        
        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
          hasMovedDuringDrag.current = true
        }
        
        if (hasMovedDuringDrag.current) {
          setTargetRotation(prev => ({
            x: prev.x + deltaY * 0.005, // Reduced sensitivity
            y: prev.y + deltaX * 0.005
          }))
        }
        
        lastMousePos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      
      isDragging.current = false
      gl.domElement.style.cursor = 'grab'
      hasMovedDuringDrag.current = false
    }

    const handleMouseEnter = () => {
      if (!isDragging.current) {
        gl.domElement.style.cursor = 'grab'
      }
    }

    const handleMouseLeave = () => {
      if (!isDragging.current) {
        gl.domElement.style.cursor = 'default'
      }
    }

    const canvas = gl.domElement
    if (canvas) {
      canvas.addEventListener('mousedown', handleMouseDown)
      canvas.addEventListener('mouseenter', handleMouseEnter)
      canvas.addEventListener('mouseleave', handleMouseLeave)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousedown', handleMouseDown)
        canvas.removeEventListener('mouseenter', handleMouseEnter)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [gl])

  // Smooth animations with refined timing
  useFrame((state, delta) => {
    if (groupRef.current && innerCoreRef.current) {
      const rotationSpeed = 2.5 // Slower rotation
      
      // Breathing pulse effect
      const breath = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 + 0.9 // Slower, subtler
      setInnerPulse(breath)
      
      // Animate particles with smoother motion
      if (particleGeometry.attributes.position) {
        const positions = particleGeometry.attributes.position.array as Float32Array
        for (let i = 0; i < 10; i++) {
          const i3 = i * 3
          // Very gentle floating motion
          positions[i3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.0005
          positions[i3 + 1] += Math.cos(state.clock.elapsedTime * 0.6 + i) * 0.0005
          positions[i3 + 2] += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.0005
        }
        particleGeometry.attributes.position.needsUpdate = true
      }
      
      if (isDragging.current) {
        // Smooth drag rotation
        const diffX = targetRotation.x - currentRotation.x
        const diffY = targetRotation.y - currentRotation.y

        setCurrentRotation({
          x: currentRotation.x + diffX * rotationSpeed * delta,
          y: currentRotation.y + diffY * rotationSpeed * delta
        })

        groupRef.current.rotation.x = currentRotation.x
        groupRef.current.rotation.y = currentRotation.y
      } else {
        // Gentle continuous rotation when not dragging - 30% slower
        groupRef.current.rotation.y += delta * 0.1
        groupRef.current.rotation.x += delta * 0.05
        
        setCurrentRotation({
          x: groupRef.current.rotation.x,
          y: groupRef.current.rotation.y
        })
      }
      
      // Scale inner core with breath cycle
      innerCoreRef.current.scale.setScalar(0.3 + breath * 0.1)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()

    setTimeout(() => {
      if (!isDragging.current && !hasMovedDuringDrag.current) {
        onClick()
      }
    }, 50)

    hasMovedDuringDrag.current = false
  }

  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* Outer crystalline shell - PERFECT cuboctahedron */}
      <mesh geometry={cuboctahedronGeometry} material={outerMaterial} />
      
      {/* Subtle edge glow */}
      <lineSegments>
        <edgesGeometry args={[cuboctahedronGeometry]} />
        <primitive object={edgeMaterial} />
      </lineSegments>
      
      {/* Inner cuboctahedron core */}
      <group ref={innerCoreRef}>
        <mesh geometry={innerCuboctahedronGeometry} material={innerCoreMaterial} />
      </group>
      
      {/* Central energy tetrahedron */}
      <mesh geometry={tetrahedronGeometry} material={tetrahedronMaterial} />
      
      {/* Symmetrical data lattice */}
      <lineSegments geometry={dataLatticeGeometry} material={dataLatticeMaterial} />
      
      {/* Volumetric energy particles */}
      <points geometry={particleGeometry} material={particleMaterial} />
      
      {/* Enhanced lighting system */}
      <pointLight
        color={new THREE.Color(0.08, 0.3, 0.8)}
        intensity={innerPulse * 2}
        distance={5}
        position={[0, 0, 0]}
      />
      
      <pointLight
        color={new THREE.Color(0.2, 0.5, 1.0)}
        intensity={innerPulse * 1.2}
        distance={3}
        position={[0.5, 0.5, 0.5]}
      />

      {/* Ambient core illumination */}
      <pointLight
        color={new THREE.Color(0.02, 0.15, 0.4)}
        intensity={0.8}
        distance={6}
      />
    </group>
  )
}