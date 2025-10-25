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
  new THREE.Vector3(19.874378204345703, 19.5539493560791, -28.284255981445312), // Right intersection of 2 triangles and 2 squares
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
      color: new THREE.Color(0.831, 0.686, 0.216),
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
      color: new THREE.Color(1, 1, 1),
      transmission: 0.7,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.01,
      ior: 1.52,
      thickness: 1.0,
      specularIntensity: 2,
      envMapIntensity: 3,
      attenuationColor: new THREE.Color(1, 1, 1),
      attenuationDistance: 1.5
    })
  }, [])

  const debugMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(1, 0, 0),
      wireframe: true,
      transparent: true,
      opacity: 0.8
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
    geometry.scale(0.21, 0.21, 0.21)

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

        // DEBUG: Check the actual size of the loaded model
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        console.log('GLB model original size:', size)
        console.log('GLB model bounds:', box.min, box.max)
        
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
          material={debugMaterial}
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