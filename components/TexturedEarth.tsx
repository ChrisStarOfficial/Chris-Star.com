"use client"

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface TexturedEarthProps {
  isZoomed?: boolean
}

export function TexturedEarth({ isZoomed = false }: TexturedEarthProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 })
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const isFreeDragging = useRef(false)
  const autoRotation = useRef(true)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const hasMovedDuringDrag = useRef(false)
  const isReturningToDefault = useRef(false)

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
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.anisotropy = 16
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter
    })
    
    setTexturesLoaded(true)
    
    return { earthDay, normalMap, specularMap, cloudTexture, nightMap }
  }, [])

  // Toroidal geometry
  const toroidalGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 96, 96)
    const positions = geometry.attributes.position
    
    for (let i = 0; i < positions.count; i++) {
      const x: number = positions.getX(i)
      const y: number = positions.getY(i)
      const z: number = positions.getZ(i)
      
      const radius: number = Math.sqrt(x*x + y*y + z*z)
      const theta: number = Math.acos(z / radius)
      
      const equatorFlattening: number = 1.0 - 0.08 * Math.pow(Math.sin(theta), 2)
      const polarEffect: number = 1.0 - 0.15 * Math.exp(-8 * Math.pow(Math.sin(theta), 2))
      const toroidalBulge: number = 1.0 + 0.06 * Math.sin(theta * 2)
      
      const finalScale: number = equatorFlattening * polarEffect * toroidalBulge
      
      positions.setX(i, x * finalScale)
      positions.setY(i, y * finalScale)
      positions.setZ(i, z * finalScale)
    }
    
    geometry.computeVertexNormals()
    // FIX: Rotate the geometry so poles are correct for Earth textures
    geometry.rotateX(-Math.PI / 2) // Rotate so north pole is up
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
        
        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
          hasMovedDuringDrag.current = true
        }
        
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
      
      if (hasMovedDuringDrag.current) {
        // Check if vertical orientation needs reset (if X rotation is not near 0)
        const needsVerticalReset = Math.abs(targetRotation.x) > 0.1

        if (needsVerticalReset) {
            // Smooth vertical reorientation ONLY
            isReturningToDefault.current = true
            setTargetRotation(prev => ({ x: 0, y: prev.y }))
        } else {
            // No vertical adjustment needed, just resume auto-rotation
            setTimeout(() => { 
                if (!isDragging.current) autoRotation.current = true 
            }, 100)
        }
      }
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
  }, [])

  // SMOOTH ANIMATIONS
  useFrame((state, delta) => {
    if (groupRef.current) {
      const rotationSpeed = 4.0
      
      if (autoRotation.current && !isDragging.current) {
        // Normal auto-rotation
        groupRef.current.rotation.y += delta * 0.1
      } else if (isReturningToDefault.current && !isDragging.current) {
        // Smooth vertical reorientation only
        const diffX = targetRotation.x - currentRotation.x
        
        setCurrentRotation({
          x: currentRotation.x + diffX * rotationSpeed * delta,
          y: currentRotation.y
        })
        
        groupRef.current.rotation.x = currentRotation.x
        groupRef.current.rotation.y = currentRotation.y
        
        // When vertical reorientation completes, resume auto-rotation
        if (Math.abs(diffX) < 0.001) {
            isReturningToDefault.current = false
            autoRotation.current = true          
        }
      } else {
        // Dragging
        setCurrentRotation(targetRotation)
        groupRef.current.rotation.x = targetRotation.x
        groupRef.current.rotation.y = targetRotation.y
      }
    }
  })

  // CLICK HANDLING
  const handleEarthClick = (e: any) => {
    e.stopPropagation()
    if (!isDragging.current && !hasMovedDuringDrag.current) {
      window.dispatchEvent(new CustomEvent('earthBriefingOpen'))
    }
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
        
        {/* Atmosphere Glow */}
        <mesh>
          <sphereGeometry args={[1.08, 32, 32]} />
          <meshBasicMaterial 
            color="#1a4577"
            transparent 
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      </mesh>
    </group>
  )
}