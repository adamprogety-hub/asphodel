'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

interface CaseDualDeviceSceneProps {
  imageSrc: string
  title: string
  className?: string
}

// Global cache for Draco GLTF models to prevent duplicate network downloads
let globalLaptopGLTF: any = null
let globalPhoneGLTF: any = null
let globalLoadingPromise: Promise<[any, any]> | null = null

function loadSharedModels(): Promise<[any, any]> {
  if (globalLaptopGLTF && globalPhoneGLTF) {
    return Promise.resolve([globalLaptopGLTF, globalPhoneGLTF])
  }
  if (globalLoadingPromise) {
    return globalLoadingPromise
  }

  globalLoadingPromise = new Promise((resolve, reject) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    Promise.all([
      new Promise<any>((res, rej) => {
        gltfLoader.load(
          '/models/laptop_draco.glb',
          (gltf) => res(gltf),
          undefined,
          (err) => rej(err)
        )
      }),
      new Promise<any>((res, rej) => {
        gltfLoader.load(
          '/models/phone_draco.glb',
          (gltf) => res(gltf),
          undefined,
          (err) => rej(err)
        )
      }),
    ])
      .then(([laptop, phone]) => {
        globalLaptopGLTF = laptop
        globalPhoneGLTF = phone
        resolve([laptop, phone])
      })
      .catch((err) => {
        globalLoadingPromise = null
        reject(err)
      })
  })

  return globalLoadingPromise
}

export default function CaseDualDeviceScene({
  imageSrc,
  title,
  className = '',
}: CaseDualDeviceSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isDisposed = false
    let animationFrameId: number | null = null
    let isVisible = true

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene()

    const width = container.clientWidth || 600
    const height = container.clientHeight || 400

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const camera = new THREE.PerspectiveCamera(26, width / height, 0.1, 20)
    camera.position.set(0.0, isMobile ? -0.01 : -0.005, isMobile ? 1.05 : 0.82)
    camera.lookAt(isMobile ? 0.01 : 0.025, -0.02, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.outputColorSpace = THREE.SRGBColorSpace

    // Canvas styling
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.pointerEvents = 'none'

    container.appendChild(renderer.domElement)

    // 2. Premium Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
    scene.add(ambientLight)

    // Key light (crisp studio highlight on device contours)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6)
    keyLight.position.set(2.2, 3.5, 2.5)
    scene.add(keyLight)

    // Fill light (cool tone from opposite side)
    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.7)
    fillLight.position.set(-2.5, 2.0, 2.0)
    scene.add(fillLight)

    // Rim light (sharp back edge highlight for titanium & aluminum edges)
    const rimLight = new THREE.DirectionalLight(0xa5b4fc, 2.2)
    rimLight.position.set(0, 3.0, -2.5)
    scene.add(rimLight)

    // Front soft fill
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2)
    frontLight.position.set(0, 0.5, 3.0)
    scene.add(frontLight)

    // Bottom bounce light
    const bounceLight = new THREE.DirectionalLight(0xf1f5f9, 0.9)
    bounceLight.position.set(0, -2.5, 1.5)
    scene.add(bounceLight)

    // Root Group for Mouse Parallax - shifted right on desktop so devices are centered & balanced
    let rootBaseX = isMobile ? 0.0 : 0.09
    const rootGroup = new THREE.Group()
    rootGroup.position.x = rootBaseX
    scene.add(rootGroup)

    let laptopGroup: THREE.Group | null = null
    let phoneGroup: THREE.Group | null = null

    // Base positions, rotations, and scales for "Two Heroes (Smartphone Diagonal Hero, Laptop Grounded Background)" Choreography
    // Laptop: Secondary Hero lowered further down (y: -0.19, z: -0.16) in elegant 3/4 semi-turn
    const laptopBasePos = new THREE.Vector3(-0.075, -0.19, -0.16)
    const laptopBaseRot = new THREE.Euler(0.14, 0.48, -0.04)
    const laptopBaseScale = 0.96

    // Smartphone: Primary Hero (z: 0.16), fully visible, scaled to 1.56, lowered slightly (y: -0.015), top-left back, bottom-right forward, falling right
    const phoneBasePos = new THREE.Vector3(0.065, -0.015, 0.16)
    const phoneBaseRot = new THREE.Euler(-0.28, -0.40, -0.18)
    const phoneBaseScale = 1.56

    // Load and clone models (using original factory PBR materials)
    loadSharedModels()
      .then(([laptopGLTF, phoneGLTF]) => {
        if (isDisposed) return

        // ── A. Configure Laptop (Background Hero, behind smartphone) ──
        const laptopInstance = laptopGLTF.scene.clone(true) as THREE.Group
        laptopInstance.position.copy(laptopBasePos)
        laptopInstance.rotation.copy(laptopBaseRot)
        laptopInstance.scale.setScalar(laptopBaseScale)

        laptopInstance.traverse((child: any) => {
          if (child.isMesh && child.material) {
            child.material = Array.isArray(child.material)
              ? child.material.map((m: any) => m.clone())
              : child.material.clone()
          }
        })
        laptopGroup = laptopInstance
        rootGroup.add(laptopInstance)

        // ── B. Configure Smartphone (Primary Foreground Hero, diagonal tilt) ──
        const phoneInstance = phoneGLTF.scene.clone(true) as THREE.Group
        phoneInstance.position.copy(phoneBasePos)
        phoneInstance.rotation.copy(phoneBaseRot)
        phoneInstance.scale.setScalar(phoneBaseScale)

        phoneInstance.traverse((child: any) => {
          if (child.isMesh && child.material) {
            child.material = Array.isArray(child.material)
              ? child.material.map((m: any) => m.clone())
              : child.material.clone()
          }
        })
        phoneGroup = phoneInstance
        rootGroup.add(phoneInstance)

        setIsLoaded(true)
        renderer.render(scene, camera)
      })
      .catch((err) => {
        console.error('Failed to load 3D devices for case:', err)
        if (!isDisposed) setHasError(true)
      })

    // 3. Mouse Parallax and Smooth Tracking
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetMouseX = x
      targetMouseY = y
    }

    const handleMouseLeave = () => {
      targetMouseX = 0
      targetMouseY = 0
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    // 4. Viewport Intersection Observer (pause render loop offscreen)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !animationFrameId) {
          clock.start()
          renderLoop()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    // 5. Render Loop with Ambient Floating & Depth Parallax
    const clock = new THREE.Clock()

    const renderLoop = () => {
      if (isDisposed || !isVisible) {
        animationFrameId = null
        return
      }

      const time = clock.getElapsedTime()

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05
      currentMouseY += (targetMouseY - currentMouseY) * 0.05

      // Subtle root parallax
      rootGroup.position.x = rootBaseX + currentMouseX * 0.012
      rootGroup.position.y = -currentMouseY * 0.008

      // Laptop floating choreography (background depth)
      if (laptopGroup) {
        laptopGroup.position.y = laptopBasePos.y + Math.sin(time * 1.1 + 0.8) * 0.003
        laptopGroup.rotation.y = laptopBaseRot.y + currentMouseX * 0.04
        laptopGroup.rotation.x = laptopBaseRot.x - currentMouseY * 0.03
      }

      // Smartphone floating choreography (dynamic diagonal tilt, subtle responsive floating)
      if (phoneGroup) {
        phoneGroup.position.y = phoneBasePos.y + Math.sin(time * 1.3) * 0.004
        phoneGroup.position.x = phoneBasePos.x + currentMouseX * 0.012
        phoneGroup.rotation.x = phoneBaseRot.x - currentMouseY * 0.08
        phoneGroup.rotation.y = phoneBaseRot.y + currentMouseX * 0.10
        phoneGroup.rotation.z = phoneBaseRot.z + Math.sin(time * 1.1) * 0.003
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(renderLoop)
    }

    renderLoop()

    // 6. Handle Window Resize
    const handleResize = () => {
      if (!container || isDisposed) return
      const newW = container.clientWidth
      const newH = container.clientHeight
      const isMobileNow = typeof window !== 'undefined' && window.innerWidth < 768
      camera.aspect = newW / newH
      camera.position.z = isMobileNow ? 1.05 : 0.82
      camera.position.y = isMobileNow ? -0.01 : -0.005
      camera.lookAt(isMobileNow ? 0.01 : 0.025, -0.02, 0)
      rootBaseX = isMobileNow ? 0.0 : 0.09
      rootGroup.position.x = rootBaseX
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
      renderer.render(scene, camera)
    }

    window.addEventListener('resize', handleResize)

    // 7. Cleanup
    return () => {
      isDisposed = true
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      scene.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose())
          } else if (obj.material) {
            obj.material.dispose()
          }
        }
      })

      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  if (hasError) {
    // Graceful fallback to image if WebGL fails
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover object-top"
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: 'transparent',
        cursor: 'grab',
      }}
    >
      {/* Loading state indicator - completely transparent, no edge artifacts or backdrop blur */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            zIndex: 1,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '2px solid rgba(0, 0, 0, 0.08)',
              borderTopColor: '#111111',
              animation: 'pfSpin 0.8s linear infinite',
            }}
          />
          <style jsx>{`
            @keyframes pfSpin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
