"use client"

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTF } from 'three/addons/loaders/GLTFLoader.js'

interface PrimeRadiantProps {
  active: boolean
  onClick: () => void
}

export function PrimeRadiant({ active, onClick }: PrimeRadiantProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { gl, scene } = useThree()

  const [radiantModel, setRadiantModel] = useState<THREE.Group | null>(null)
  
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const hasMovedDuringDrag = useRef(false)

  // Metallic gold material - replaces the STL material
  const goldMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.831, 0.686, 0.216), // #d4af37 in RGB
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      envMapIntensity: 2.5,
      specularColor: new THREE.Color(0.9, 0.8, 0.5),
      specularIntensity: 1.5,
    })
  }, [])

  // Load GLB model
  useEffect(() => {
    const loader = new GLTFLoader()
    
    // Set up Draco decompression
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://unpkg.com/three@0.180.0/examples/jsm/libs/draco/')
    loader.setDRACOLoader(dracoLoader)

    loader.load(
      '/models/prime_radiant/PrimeRadiantHalfToFull.glb', 
      (gltf: GLTF) => {
        console.log('GLB model loaded successfully!')
        
        const model = gltf.scene
        
        // Apply gold material to all meshes in the model
        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.material = goldMaterial
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        
        // Scale and position the model
        model.scale.set(0.2, 0.2, 0.2)
        model.position.set(0, 0, 0)
        
        setRadiantModel(model)
      }, 
      undefined,
      (error: unknown) => {
        console.error('Error loading GLB model:', error)
      }
    )
  }, [goldMaterial])

  // Drag interaction system
  useEffect(() => {
    const canvas = gl.domElement as HTMLCanvasElement;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      
      isDragging.current = true
      hasMovedDuringDrag.current = false
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMousePos.current.x
        const deltaY = e.clientY - lastMousePos.current.y
        
        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
          hasMovedDuringDrag.current = true;
        }
        
        if (hasMovedDuringDrag.current && groupRef.current) {
          groupRef.current.rotation.x += deltaY * 0.005
          groupRef.current.rotation.y += deltaX * 0.005
        }
        
        lastMousePos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return
      
      isDragging.current = false
      canvas.style.cursor = 'grab'
      hasMovedDuringDrag.current = false
    }

    const handleMouseEnter = () => {
      if (!isDragging.current) {
        canvas.style.cursor = 'grab'
      }
    }

    const handleMouseLeave = () => {
      if (!isDragging.current) {
        canvas.style.cursor = 'default'
      }
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    };
  }, [gl]);

  const handleClick = (e: any) => {
    e.stopPropagation()

    hasMovedDuringDrag.current = false
  }

  // Scene structure
  return (
    <group ref={groupRef} onClick={handleClick} scale={0.3}>
      {/* GLB-based Prime Radiant */}
      {radiantModel && <primitive object={radiantModel} />}
      
      {/* Enhanced golden lighting INSIDE the component */}
      <pointLight color={new THREE.Color(0.9, 0.8, 0.5)} intensity={3} distance={6} />
      <pointLight color={new THREE.Color(1.0, 0.9, 0.6)} intensity={2} distance={4} position={[2, 1, 0]} />

      {/* Always include ambient light as fallback */}
      <ambientLight intensity={0.4} />
    </group>
  );
}