"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { gsap } from "gsap"
import Matter from "matter-js"

interface Destination {
  id: string
  title: string
  subtitle: string
  description: string
  position: { x: number; y: number; z: number }
  href: string
}

interface EarthHubProps {
  destinations: Destination[]
  onSelectDestination: (id: string) => void
  cameraAngle: number
  mousePosition: { x: number; y: number }
  satellitesVisible: boolean
}

export default function EarthHub({
  destinations,
  onSelectDestination,
  cameraAngle,
  mousePosition,
  satellitesVisible,
}: EarthHubProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // --- Scene Setup ---
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.set(0, 0, 500)

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 7.5)
    scene.add(directionalLight)

    // --- Earth Sphere ---
    const earthGeometry = new THREE.SphereGeometry(150, 64, 64)
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0x3366ff,
      roughness: 1,
      metalness: 0,
    })
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earthMesh)

    // --- Satellites / Destinations ---
    const satelliteMeshes: THREE.Mesh[] = []

    destinations.forEach(dest => {
      const geo = new THREE.SphereGeometry(10, 16, 16)
      const mat = new THREE.MeshStandardMaterial({ color: 0xffcc00 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(dest.position.x, dest.position.y, dest.position.z)
      scene.add(mesh)
      satelliteMeshes.push(mesh)

      // Click handling with GSAP scale animation
      mesh.userData = { id: dest.id }
    })

    // --- Matter.js Physics (optional for satellites collisions/float) ---
    const engine = Matter.Engine.create()
    const world = engine.world
    const bodies: Matter.Body[] = []

    satelliteMeshes.forEach(mesh => {
      const body = Matter.Bodies.circle(mesh.position.x, mesh.position.y, 10, { restitution: 0.9 })
      Matter.World.add(world, body)
      bodies.push(body)
    })

    // --- Mouse Raycaster for clicking satellites ---
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(satelliteMeshes)
      if (intersects.length > 0) {
        const selected = intersects[0].object
        gsap.to(selected.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, yoyo: true, repeat: 1 })
        onSelectDestination(selected.userData.id)
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("click", onClick)

    // --- Orbit Controls for camera rotation ---
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.minDistance = 300
    controls.maxDistance = 800

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate)
      // Rotate Earth slowly
      earthMesh.rotation.y += 0.002

      // Update Matter.js physics
      Matter.Engine.update(engine)
      bodies.forEach((body, i) => {
        satelliteMeshes[i].position.x = body.position.x
        satelliteMeshes[i].position.y = body.position.y
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // --- Handle window resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("click", onClick)
      renderer.dispose()
    }
  }, [destinations, onSelectDestination])

  return <canvas ref={canvasRef} className="w-full h-full block" />
}
