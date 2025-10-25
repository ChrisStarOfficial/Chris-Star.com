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

  const [cageModel, setCageModel] = useState<THREE.Group | null>(null)
  const [shellModel, setShellModel] = useState<THREE.Group | null>(null)
  
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const hasMovedDuringDrag = useRef(false)

  // Metallic gold material for the cage (inner core)
  const cageMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.831, 0.686, 0.216), // #d4af37 in RGB
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      envMapIntensity: 3.0,
      specularColor: new THREE.Color(0.9, 0.8, 0.5),
      specularIntensity: 2.0,
      emissive: new THREE.Color(0.3, 0.2, 0.1),
      emissiveIntensity: 0.2,
    })
  }, [])

  // Glass material for the shell (outer glass)
  const shellMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(1.0, 1.0, 1.0),
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      thickness: 1.5,
      roughness: 0.02,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      ior: 1.52,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(1.0, 1.0, 1.0),
      envMapIntensity: 2.0,
      attenuationColor: new THREE.Color(1.0, 1.0, 1.0),
      attenuationDistance: 2.0,
    })
  }, [])

  // Load both GLB models
  useEffect(() => {
    const loader = new GLTFLoader()
    
    // Set up Draco decompression
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://unpkg.com/three@0.180.0/examples/jsm/libs/draco/')
    loader.setDRACOLoader(dracoLoader)

    let modelsLoaded = 0
    const totalModels = 2

    const checkAllModelsLoaded = () => {
      modelsLoaded++
      if (modelsLoaded === totalModels) {
        console.log('All Prime Radiant models loaded successfully!')
      }
    }

    // Load Cage model
    loader.load(
      '/models/prime_radiant/PrimeRadiantHalfToFull_Cage.glb', 
      (gltf: GLTF) => {
        const model = gltf.scene
        
        // DEBUG: Check root model transforms
        console.log('=== CAGE MODEL DEBUG ===')
        console.log('Model rotation:', model.rotation)
        console.log('Model position:', model.position) 
        console.log('Model scale:', model.scale)
        
        // DEBUG: Check children rotations
        model.traverse((child) => {
          if (child.rotation.x !== 0 || child.rotation.y !== 0 || child.rotation.z !== 0) {
            console.log('Child with rotation:', child.name, child.rotation)
          }
        })

        // Apply cage material to all meshes
        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.material = cageMaterial
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        
        // Scale and position
        model.rotation.set(0, 0, 0)
        model.scale.set(0.2, 0.2, 0.2)
        model.position.set(0, 0, 0)
        
        setCageModel(model)
        checkAllModelsLoaded()
      }, 
      undefined,
      (error: unknown) => {
        console.error('Error loading Cage GLB model:', error)
      }
    )

    // Load Shell model
    loader.load(
      '/models/prime_radiant/PrimeRadiantHalfToFull_Shell.glb', 
      (gltf: GLTF) => {
        const model = gltf.scene
        
        // DEBUG: Check root model transforms
        console.log('=== SHELL MODEL DEBUG ===')
        console.log('Model rotation:', model.rotation)
        console.log('Model position:', model.position)
        console.log('Model scale:', model.scale)
        
        // DEBUG: Check children rotations
        model.traverse((child) => {
          if (child.rotation.x !== 0 || child.rotation.y !== 0 || child.rotation.z !== 0) {
            console.log('Child with rotation:', child.name, child.rotation)
          }
        })

        // Apply shell material to all meshes
        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.material = shellMaterial
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        
        // Scale and position (same as cage)
        model.rotation.set(0, 0, 0)
        model.scale.set(0.2, 0.2, 0.2)
        model.position.set(0, 0, 0)
        
        setShellModel(model)
        checkAllModelsLoaded()
      }, 
      undefined,
      (error: unknown) => {
        console.error('Error loading Shell GLB model:', error)
      }
    )
  }, [cageMaterial, shellMaterial])

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

  useEffect(() => {
    if (cageModel && shellModel) {
      console.log('=== FINAL MODEL COMPARISON ===')
      console.log('Cage Model:', cageModel)
      console.log('Shell Model:', shellModel)
      
      console.log('Cage hierarchy:')
      cageModel.traverse((child) => console.log(child.name, child.rotation, child.position))
      
      console.log('Shell hierarchy:')  
      shellModel.traverse((child) => console.log(child.name, child.rotation, child.position))
    }
  }, [cageModel, shellModel])

  const handleClick = (e: any) => {
    e.stopPropagation()

    hasMovedDuringDrag.current = false
  }

  // Scene structure
  return (
    <group ref={groupRef} onClick={handleClick} scale={0.3}>
      {/* Cage model (inner core) */}
      {cageModel && <primitive object={cageModel} />}
      
      {/* Shell model (outer glass) */}
      {shellModel && <primitive object={shellModel} />}
      
      {/* Enhanced lighting for both models */}
      <pointLight color={new THREE.Color(0.9, 0.8, 0.5)} intensity={3} distance={6} />
      <pointLight color={new THREE.Color(0.3, 0.5, 1.0)} intensity={2} distance={4} position={[2, 1, 0]} />
      <pointLight color={new THREE.Color(0.1, 0.3, 0.8)} intensity={1.5} distance={5} position={[-1, -1, 1]} />

      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.5} />
    </group>
  );
}