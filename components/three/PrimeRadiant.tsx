"use client"

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTF } from 'three/addons/loaders/GLTFLoader.js'
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js'

interface PrimeRadiantProps {
  active: boolean
  onClick: () => void
}

// Define your points array here (you'll need to import or define the actual vertices)
const points = [
  new THREE.Vector3(19.874378204345703, 19.5539493560791, -28.284255981445312),
  new THREE.Vector3(-0.12562158703804016, 39.553951263427734, 0.0),
  new THREE.Vector3(-20.125621795654297, 19.5539493560791, -28.284255981445312),
  new THREE.Vector3(-20.125621795654297, -20.4460506439209, -28.284255981445312),
  new THREE.Vector3(-40.12562561035156, -0.44604921340942383, 0.0),
  new THREE.Vector3(19.874378204345703, -20.4460506439209, -28.284255981445312),
  new THREE.Vector3(39.87437438964844, -0.44604921340942383, 0.0),
  new THREE.Vector3(-0.12562158703804016, -40.446048736572266, 0.0),
  new THREE.Vector3(19.874378204345703, 19.5539493560791, 28.284255981445312),
  new THREE.Vector3(-20.125621795654297, 19.5539493560791, 28.284255981445312),
  new THREE.Vector3(-20.125621795654297, -20.4460506439209, 28.284255981445312),
  new THREE.Vector3(19.874378204345703, -20.4460506439209, 28.284255981445312),
];

export function PrimeRadiant({ active, onClick }: PrimeRadiantProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { gl } = useThree()

  const [radiantModel, setRadiantModel] = useState<THREE.Group | null>(null)
  
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const hasMovedDuringDrag = useRef(false)

  // Gold material for inner model
  const goldMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.835, 0.714, 0.325),
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      envMapIntensity: 3.0,
      specularColor: new THREE.Color(0.9, 0.8, 0.5),
      specularIntensity: 2.0,
    })
  }, [])

  // Glass material for outer shell
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.98, 0.95, 0.85),
      transmission: 0.9,
      opacity: 0.2,
      transparent: true,
      roughness: 0.02,
      metalness: 0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      ior: 1.52,
      thickness: 0.1,
      specularIntensity: 1,
      envMapIntensity: 3,
      attenuationColor: new THREE.Color(0.95, 0.9, 0.7),
      attenuationDistance: 1.0
    })
  }, [])

  // **UPDATED: ConvexGeometry for the outer hull shell glass**
  const glassShellGeometry = useMemo(() => {
    // For performance, sample a subset of points if you have too many
    const samplePoints = points.length > 1000 
      ? points.filter((_, index) => index % Math.ceil(points.length / 1000) === 0)
      : points;
    
    const geometry = new ConvexGeometry(samplePoints);
    
    // Apply the SAME scale as your GLB model
    geometry.scale(0.205, 0.205, 0.205)

    return geometry
  }, []) // Add points dependency if points is defined outside component

  // Load model and generate convex hull
  useEffect(() => {
    const loader = new GLTFLoader()
    
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://unpkg.com/three@0.180.0/examples/jsm/libs/draco/')
    loader.setDRACOLoader(dracoLoader)

    loader.load(
      '/models/prime_radiant/PrimeRadiantHalfToFull.glb', 
      (gltf: GLTF) => {
        console.log('GLB model loaded successfully!')
        
        const model = gltf.scene
        
        // Apply gold material
        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.material = goldMaterial
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        
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

  // Drag interaction system (keep your existing code)
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

  return (
    <group ref={groupRef} onClick={handleClick} scale={0.3}>
      {/* Glass outer shell - perfectly matches model shape */}
      {glassShellGeometry && (
        <mesh
          geometry={glassShellGeometry}
          material={glassMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />
      )}
      
      {/* Gold inner model */}
      {radiantModel && <primitive object={radiantModel} />}
      
      {/* Lighting */}
      <pointLight color={new THREE.Color(0.9, 0.8, 0.5)} intensity={3} distance={6} />
      <pointLight color={new THREE.Color(1.0, 0.9, 0.6)} intensity={2} distance={4} position={[2, 1, 0]} />
      <pointLight color={new THREE.Color(0.3, 0.5, 1.0)} intensity={1.5} distance={5} position={[-1, -1, 1]} />
      <ambientLight intensity={0.6} />
    </group>
  );
}