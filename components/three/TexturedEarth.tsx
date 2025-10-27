"use client"

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTexture, useProgress } from '@react-three/drei'
import { useLoading } from '@/components/ui/LoadingContext'

interface TexturedEarthProps {
  isZoomed?: boolean
}

export function TexturedEarth({ isZoomed = false }: TexturedEarthProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { startLoading, updateProgress, stopLoading } = useLoading()
  const { progress, active } = useProgress()

  // Track texture loading progress
  useEffect(() => {
    if (active) {
      startLoading("RENDERING STAR CHART")
    }
  }, [active, startLoading])

  useEffect(() => {
    if (!active && progress === 100) {
      updateProgress(100)
      setTimeout(stopLoading, 500)
    } else if (active) {
      updateProgress(progress)
    }
  }, [progress, active, updateProgress, stopLoading])

  const groupRef = useRef<THREE.Group>(null)

  const [targetRotation, setTargetRotation] = useState({ x: 0, y: Math.PI * 0.8 })
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: Math.PI * 0.8 })
  const isDragging = useRef(false)
  const isFreeDragging = useRef(false)
  const autoRotation = useRef(true)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const hasMovedDuringDrag = useRef(false)
  const isReturningToDefault = useRef(false)

  const { camera } = useThree()

  // Load textures
  const [texturesLoaded, setTexturesLoaded] = useState(false)
  
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader()
    
    const earthDay = loader.load('/textures/earth/earth-map.jpg')
    const normalMap = loader.load('/textures/earth/earth-normal.tif')
    const specularMap = loader.load('/textures/earth/earth-specular.tif')
    const cloudTexture = loader.load('/textures/earth/earth-clouds.jpg')
    const nightMap = loader.load('/textures/earth/earth-nightmap.jpg')
    
    // Set texture parameters for 8K quality
    ;[earthDay, normalMap, specularMap, cloudTexture, nightMap].forEach(texture => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        texture.anisotropy = 16
        texture.minFilter = THREE.NearestFilter
        texture.magFilter = THREE.NearestFilter
    })
    
    setTexturesLoaded(true)
    
    return { earthDay, normalMap, specularMap, cloudTexture, nightMap }
  }, [])

  // Toroidal geometry
  const toroidalGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 96, 96)
    const positions = geometry.attributes.position
    const uvs = geometry.attributes.uv

    // Apply toroidal deformation
    for (let i = 0; i < positions.count; i++) {
      const x: number = positions.getX(i)
      const y: number = positions.getY(i)
      const z: number = positions.getZ(i)
      
      const radius: number = Math.sqrt(x*x + y*y + z*z)
      const theta: number = Math.acos(z / radius)
      const phi: number = Math.atan2(y, x)
      
      const equatorFlattening: number = 1.0 - 0.08 * Math.pow(Math.sin(theta), 2)
      const polarEffect: number = 1.0 - 0.15 * Math.exp(-8 * Math.pow(Math.sin(theta), 2))
      const toroidalBulge: number = 1.0 + 0.06 * Math.sin(theta * 2)
      
      const finalScale: number = equatorFlattening * polarEffect * toroidalBulge

      positions.setX(i, x * finalScale)
      positions.setY(i, y * finalScale)
      positions.setZ(i, z * finalScale)
    
      // Correct UV calculation with proper wrapping
      const u = ((phi + Math.PI) / (2 * Math.PI))
      const v = 1.0 - (theta / Math.PI)

      // Apply offset to move seam to Pacific Ocean
      let finalU = u + 0.73
      if (finalU >= 1.0) finalU = finalU - 1.0
      if (finalU < 0.0) finalU = finalU + 1.0

      const seamBuffer = 0.0005
      if (finalU < seamBuffer) {
        finalU = seamBuffer
      } else if (finalU > 1.0 - seamBuffer) {
        finalU = 1.0 - seamBuffer
      }

      uvs.setX(i, finalU)
      uvs.setY(i, v)
    }
    
    uvs.needsUpdate = true
    geometry.computeVertexNormals()

    // Apply pole correction
    geometry.rotateX(-Math.PI / 2)

    return geometry
  }, [])

  // Earth material with textures
  const earthMaterial = useMemo(() => {
    if (!texturesLoaded) {
      return new THREE.MeshPhongMaterial({ color: 0x2a5fa0 })
    }
    
    return new THREE.MeshPhongMaterial({
        map: textures.earthDay,
        normalMap: textures.normalMap,
        normalScale: new THREE.Vector2(0.8, 0.8),
        specularMap: textures.specularMap,
        specular: new THREE.Color(0x333333),
        shininess: 40,
    })
  }, [texturesLoaded, textures])

  // Cloud material
  const cloudMaterial = useMemo(() => {
    if (!texturesLoaded) return null
    
    return new THREE.MeshPhongMaterial({
      map: textures.cloudTexture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      alphaMap: textures.cloudTexture,
    })
  }, [texturesLoaded, textures])

  // DRAG INTERACTION SYSTEM
  useEffect(() => {
    if (isZoomed) {
      // When zoomed in, ensure auto-rotation continues
      autoRotation.current = true
      isReturningToDefault.current = false
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      
      isDragging.current = true
      isFreeDragging.current = e.ctrlKey
      isReturningToDefault.current = false
      autoRotation.current = false
      hasMovedDuringDrag.current = false
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      document.body.style.cursor = isFreeDragging.current ? 'all-scroll' : 'grabbing'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMousePos.current.x
        const deltaY = e.clientY - lastMousePos.current.y
        
        // Check if movement exceeds threshold (increased to 8px for more tolerance)
        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
          hasMovedDuringDrag.current = true
        }
        
        // Only apply rotation if we've exceeded the threshold
        if (hasMovedDuringDrag.current) {
          if (e.ctrlKey !== isFreeDragging.current) {
            isFreeDragging.current = e.ctrlKey
            document.body.style.cursor = isFreeDragging.current ? 'all-scroll' : 'grabbing'
          }

          if (isFreeDragging.current) {
            setTargetRotation(prev => ({
              x: prev.x + deltaY * 0.01,
              y: prev.y + deltaX * 0.01
            }))
          } else {
            setTargetRotation(prev => ({
              x: 0,
              y: prev.y + deltaX * 0.01
            }))
          }
        }
        
        lastMousePos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDragging.current && e.key === 'Control') {
        isFreeDragging.current = true
        document.body.style.cursor = 'all-scroll'
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isDragging.current && e.key === 'Control') {
        isFreeDragging.current = false
        document.body.style.cursor = 'grabbing'
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      
      isDragging.current = false
      isFreeDragging.current = false
      document.body.style.cursor = 'default'
      
      // Only resume auto-rotation if we actually dragged
      if (hasMovedDuringDrag.current) {
        autoRotation.current = true
        isReturningToDefault.current = false
      }

      // Reset the flag for the next interaction
      hasMovedDuringDrag.current = false
    }

    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
    }

    return () => {
      if (canvas) canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
}, [isZoomed])

  // SMOOTH ANIMATIONS
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth zoom animation
      const targetZ = isZoomed ? 1.5 : 3.1
      const zoomSpeed = 64.0
      if (Math.abs(camera.position.z - targetZ) > 0.01) {
        camera.position.z += (targetZ - camera.position.z) * delta * zoomSpeed
        camera.updateProjectionMatrix()
      }

      const rotationSpeed = 64.0
      // Adjust rotation speed based on zoom - slower when zoomed in
      const baseRotationSpeed = isZoomed ? 0.05 : 0.1
      
      if (autoRotation.current && !isDragging.current) {
        // Normal auto-rotation with gradual vertical correction
        groupRef.current.rotation.y += delta * baseRotationSpeed

        // Gradually return X rotation to 0 (horizontal)
        if (Math.abs(groupRef.current.rotation.x) > 0.001) {
            groupRef.current.rotation.x -= groupRef.current.rotation.x * delta * rotationSpeed
        }

        // Keep currentRotation in sync
        setCurrentRotation({
            x: groupRef.current.rotation.x,
            y: groupRef.current.rotation.y
        })
      } else if (isReturningToDefault.current && !isDragging.current) {
        // Smooth reorientation for BOTH X and Y
        const diffX = targetRotation.x - currentRotation.x
        const diffY = targetRotation.y - currentRotation.y
        
        setCurrentRotation({
          x: currentRotation.x + diffX * rotationSpeed * delta,
          y: currentRotation.y + diffY * rotationSpeed * delta
        })
        
        groupRef.current.rotation.x = currentRotation.x
        groupRef.current.rotation.y = currentRotation.y
        
        // Continue rotation during reorientation
        groupRef.current.rotation.y += delta * baseRotationSpeed * 0.5

        if (Math.abs(diffX) < 0.001 && Math.abs(diffY) < 0.001) {
            isReturningToDefault.current = false
            autoRotation.current = true          
        }
      } else {
      // Dragging or immediate update
      const diffX = targetRotation.x - currentRotation.x
      const diffY = targetRotation.y - currentRotation.y

      // During drag, interpolate smoothly but quickly
      if (isDragging.current) {
        setCurrentRotation({
            x: currentRotation.x + diffX * rotationSpeed * 2 * delta,
            y: currentRotation.y + diffY * rotationSpeed * 2 * delta
        })

        groupRef.current.rotation.x = currentRotation.x
        groupRef.current.rotation.y = currentRotation.y
      } else {
        autoRotation.current = true
      }
    }
   }
  })

  // CLICK HANDLING
  const handleEarthClick = (e: any) => {
    e.stopPropagation()

    // Use a timeout to ensure all mouse events have been processed
    setTimeout(() => {
      // Only trigger if we're definitely not dragging and haven't moved
      if (!isDragging.current && !hasMovedDuringDrag.current) {
        window.dispatchEvent(new CustomEvent('earthBriefingOpen'))
        autoRotation.current = true
        isReturningToDefault.current = false
      }
    }, 50);

    // Reset for next interaction
    hasMovedDuringDrag.current = false
  }

  return (
    <group ref={groupRef}>
      {/* Earth Surface */}
      <mesh 
        ref={meshRef} 
        geometry={toroidalGeometry}
        material={earthMaterial}
        onClick={handleEarthClick}
        onPointerEnter={() => {
          if (!isDragging.current) document.body.style.cursor = 'grab'
        }}
        onPointerLeave={() => {
          if (!isDragging.current) document.body.style.cursor = 'default'
        }}
      >
        {/* Clouds Layer */}
        {cloudMaterial && (
          <mesh geometry={toroidalGeometry} material={cloudMaterial} scale={1.005} />
        )}
      </mesh>
    </group>
  )
}