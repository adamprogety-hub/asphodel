'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export default function BreezeCanvas() {
  const mountRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = mountRef.current
    if (!canvas) return

    // ── Renderer ────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.FogExp2(0x000000, 0.055)

    // ── Camera — straight-on, field faces viewer ─────────────────
    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 80)
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    // ── Lighting ─────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0c1018, 3.5))

    const key = new THREE.DirectionalLight(0xbccce0, 6.5)
    key.position.set(3, 12, 8)
    scene.add(key)

    const back = new THREE.DirectionalLight(0x7080b0, 4.0)
    back.position.set(-2, 4, -12)
    scene.add(back)

    const side = new THREE.DirectionalLight(0x506080, 2.8)
    side.position.set(-16, 0, 4)
    scene.add(side)

    const sh1 = new THREE.PointLight(0xd0e0f8, 5.5, 28)
    const sh2 = new THREE.PointLight(0xf0e0c0, 3.5, 20)
    scene.add(sh1, sh2)

    // ── Environment ───────────────────────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.0).texture
    pmrem.dispose()

    // ── Scale geometry — rounded triangle (lamellar armor plate) ──
    function makeScaleGeo(w: number, h: number, r: number, depth: number) {
      const shape = new THREE.Shape()
      const verts = [
        new THREE.Vector2(0,       h * 0.68),
        new THREE.Vector2(-w*0.50,-h * 0.36),
        new THREE.Vector2( w*0.50,-h * 0.36),
      ]
      for (let i = 0; i < 3; i++) {
        const p = verts[(i+2)%3], c = verts[i], n = verts[(i+1)%3]
        const v0 = new THREE.Vector2().subVectors(p, c).normalize().multiplyScalar(r)
        const v1 = new THREE.Vector2().subVectors(n, c).normalize().multiplyScalar(r)
        if (i === 0) shape.moveTo(c.x+v0.x, c.y+v0.y)
        else          shape.lineTo(c.x+v0.x, c.y+v0.y)
        shape.quadraticCurveTo(c.x, c.y, c.x+v1.x, c.y+v1.y)
      }
      shape.closePath()
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: depth * 0.55,
        bevelSize: r * 0.42,
        bevelSegments: 6,
      })
      geo.computeVertexNormals()
      geo.center()
      return geo
    }

    // ── Seeded random — ensures both canvas halves are identical ──
    let _seed = 0x9e3779b9
    const rand = () => {
      _seed ^= _seed << 13; _seed ^= _seed >>> 17; _seed ^= _seed << 5
      return ((_seed >>> 0) / 0xffffffff)
    }

    // ── Grid — XY plane, perpendicular to screen ──────────────────
    // Intentionally larger than viewport so field bleeds off all 4 edges
    const COLS = 48
    const ROWS = 34
    const COUNT = COLS * ROWS

    const SW    = 0.64
    const SH    = 0.74
    const DEPTH = 0.06
    const STEP_X = SW * 0.92
    const STEP_Y = SH * 0.88

    const geo = makeScaleGeo(SW, SH, 0.10, DEPTH)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x7080a0,
      metalness: 0.97,
      roughness: 0.07,
      envMapIntensity: 1.3,
    })

    const mesh = new THREE.InstancedMesh(geo, mat, COUNT)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(mesh)

    const dummy  = new THREE.Object3D()
    const baseX  = new Float32Array(COUNT)
    const baseY  = new Float32Array(COUNT)
    const phX    = new Float32Array(COUNT)
    const phY    = new Float32Array(COUNT)
    const phD    = new Float32Array(COUNT)
    const nRX    = new Float32Array(COUNT)
    const nRZ    = new Float32Array(COUNT)

    const colData = new Float32Array(COUNT * 3)
    const palette = [
      [0.42, 0.48, 0.58],
      [0.50, 0.55, 0.64],
      [0.36, 0.42, 0.52],
      [0.56, 0.60, 0.68],
      [0.46, 0.51, 0.60],
    ]

    const offX = ((COLS-1) * STEP_X) / 2
    const offY = ((ROWS-1) * STEP_Y) / 2

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c
        const colOffset = (r % 2 === 0) ? 0 : STEP_X * 0.5

        baseX[i] = c * STEP_X - offX + colOffset
        baseY[i] = r * STEP_Y - offY

        phX[i] = baseX[i] * 0.55 + rand() * 0.3
        phY[i] = baseY[i] * 0.48 + rand() * 0.3
        const d = Math.sqrt(baseX[i]*baseX[i] + baseY[i]*baseY[i])
        phD[i] = d * 0.32 + rand() * 0.5

        nRX[i] = (rand()-0.5) * 0.04
        nRZ[i] = (rand()-0.5) * 0.04

        const col = palette[Math.floor(rand() * palette.length)]
        const j = (rand()-0.5) * 0.04
        colData[i*3]   = col[0]+j
        colData[i*3+1] = col[1]+j
        colData[i*3+2] = col[2]+j

        dummy.position.set(baseX[i], baseY[i], 0)
        dummy.rotation.set(nRX[i], 0, nRZ[i])
        dummy.scale.setScalar(1.0)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      }
    }

    mesh.instanceColor = new THREE.InstancedBufferAttribute(colData, 3)
    mesh.instanceMatrix.needsUpdate = true

    // ── Mouse parallax ────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 }
    const mSmooth = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // ── Wave constants ────────────────────────────────────────────
    const BREATH_AMP  = 0.55
    const TILT_AMP    = 0.08
    const WAVE_SPEED  = 0.38
    const WAVE2_SPEED = 0.22

    // ── Render loop ───────────────────────────────────────────────
    const clock = new THREE.Clock()
    let frame = 0
    let animId: number

    const tick = () => {
      animId = requestAnimationFrame(tick)
      frame++
      const t = clock.getElapsedTime()

      mSmooth.x += (mouse.x - mSmooth.x) * 0.022
      mSmooth.y += (mouse.y - mSmooth.y) * 0.022

      camera.position.x = mSmooth.x * 0.8
      camera.position.y = mSmooth.y * -0.5
      camera.lookAt(mSmooth.x * 0.2, -mSmooth.y * 0.1, 0)

      // Orbiting shimmer lights
      sh1.position.set(
        Math.sin(t * 0.13) * 12,
        Math.sin(t * 0.09 + 1.0) * 7,
        10 + Math.sin(t * 0.07) * 3
      )
      sh2.position.set(
        Math.cos(t * 0.10 + 2.2) * 9,
        Math.cos(t * 0.12 + 0.5) * 6,
        8 + Math.cos(t * 0.08 + 1.5) * 2
      )

      if (frame % 2 === 0) {
        for (let i = 0; i < COUNT; i++) {
          // Three-layer breathing wave
          const wave1 = Math.sin(t * WAVE_SPEED + phX[i] + phY[i] * 0.6) * BREATH_AMP
          const wave2 = Math.sin(t * WAVE2_SPEED + phD[i]) * BREATH_AMP * 0.4
          const wave3 = Math.sin(t * 1.1 + phX[i] * 1.8 + phY[i] * 1.4) * BREATH_AMP * 0.1
          const dz = wave1 + wave2 + wave3

          const rx = nRX[i] + Math.sin(t * WAVE_SPEED + phX[i] + phY[i]*0.6 + 0.3) * TILT_AMP
          const rz = nRZ[i] + Math.cos(t * WAVE2_SPEED + phD[i] + 0.5) * TILT_AMP * 0.5
          const ry = Math.sin(t * 0.15 + phD[i] * 0.6) * 0.022

          dummy.position.set(baseX[i], baseY[i], dz)
          dummy.rotation.set(rx, ry, rz)
          dummy.scale.setScalar(1.0)
          dummy.updateMatrix()
          mesh.setMatrixAt(i, dummy.matrix)
        }
        mesh.instanceMatrix.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    tick()

    // ── Resize ────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      scene.clear()
    }
  }, [])

  return (
    <canvas
      ref={mountRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ display: 'block' }}
    />
  )
}
