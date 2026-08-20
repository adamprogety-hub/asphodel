'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

/**
 * Contained canvas — fills its parent container (no position:fixed).
 * Parent must have position:relative and defined dimensions.
 */
export default function BreezeCanvasContained() {
  const mountRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = mountRef.current
    if (!canvas) return

    const parent = canvas.parentElement!
    const W = () => parent.offsetWidth
    const H = () => parent.offsetHeight

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W(), H())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.4

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0908)
    scene.fog = new THREE.FogExp2(0x0a0908, 0.06)

    const camera = new THREE.PerspectiveCamera(52, W() / H(), 0.1, 80)
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    // ── Environment ───────────────────────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment()).texture

    // ── Lights ────────────────────────────────────────────────────
    const dl1 = new THREE.DirectionalLight(0xc8d8f0, 2.5); dl1.position.set(4, 6, 8)
    const dl2 = new THREE.DirectionalLight(0x9bb0cc, 1.8); dl2.position.set(-6, 3, 5)
    const dl3 = new THREE.DirectionalLight(0xe8d0b0, 1.2); dl3.position.set(0, -4, 6)
    const al  = new THREE.AmbientLight(0x8090a8, 0.6)
    ;[dl1, dl2, dl3, al].forEach(l => scene.add(l))

    // ── Geometry helper ───────────────────────────────────────────
    const makeGeo = (w: number, h: number, bev: number, dep: number) => {
      const geo = new THREE.BoxGeometry(w, h, dep, 1, 1, 1)
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i)
        const bx = Math.max(Math.abs(x) - (w/2 - bev), 0)
        const by = Math.max(Math.abs(y) - (h/2 - bev), 0)
        const r  = Math.sqrt(bx*bx + by*by)
        if (r > bev) { pos.setX(i, x*(bev/r)); pos.setY(i, y*(bev/r)) }
      }
      geo.center()
      return geo
    }

    // ── Seeded random ─────────────────────────────────────────────
    let _seed = 0x9e3779b9
    const rand = () => {
      _seed ^= _seed << 13; _seed ^= _seed >>> 17; _seed ^= _seed << 5
      return ((_seed >>> 0) / 0xffffffff)
    }

    // ── Grid ──────────────────────────────────────────────────────
    const COLS = 38, ROWS = 28, COUNT = COLS * ROWS
    const SW = 0.64, SH = 0.74, DEPTH = 0.06
    const STEP_X = SW * 0.92, STEP_Y = SH * 0.88

    const geo = makeGeo(SW, SH, 0.10, DEPTH)
    const mat = new THREE.MeshStandardMaterial({ color: 0x7080a0, metalness: 0.97, roughness: 0.07, envMapIntensity: 1.3 })
    const mesh = new THREE.InstancedMesh(geo, mat, COUNT)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(mesh)

    const dummy = new THREE.Object3D()
    const baseX = new Float32Array(COUNT), baseY = new Float32Array(COUNT)
    const phX = new Float32Array(COUNT), phY = new Float32Array(COUNT), phD = new Float32Array(COUNT)
    const nRX = new Float32Array(COUNT), nRZ = new Float32Array(COUNT)
    const colData = new Float32Array(COUNT * 3)
    const palette = [[0.42,0.48,0.58],[0.50,0.55,0.64],[0.36,0.42,0.52],[0.56,0.60,0.68],[0.46,0.51,0.60]]
    const offX = ((COLS-1)*STEP_X)/2, offY = ((ROWS-1)*STEP_Y)/2

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c
        const colOff = (r % 2 === 0) ? 0 : STEP_X * 0.5
        baseX[i] = c * STEP_X - offX + colOff
        baseY[i] = r * STEP_Y - offY
        phX[i] = baseX[i] * 0.55 + rand() * 0.3
        phY[i] = baseY[i] * 0.48 + rand() * 0.3
        const d = Math.sqrt(baseX[i]*baseX[i] + baseY[i]*baseY[i])
        phD[i] = d * 0.32 + rand() * 0.5
        nRX[i] = (rand()-0.5) * 0.04
        nRZ[i] = (rand()-0.5) * 0.04
        const col = palette[Math.floor(rand() * palette.length)]
        const j = (rand()-0.5) * 0.04
        colData[i*3] = col[0]+j; colData[i*3+1] = col[1]+j; colData[i*3+2] = col[2]+j
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
    const mouse = { x: 0, y: 0 }, mSmooth = { x: 0, y: 0 }
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // ── Anim ──────────────────────────────────────────────────────
    let animId = 0
    const clock = new THREE.Clock()
    let elapsed = 0

    const tick = () => {
      animId = requestAnimationFrame(tick)
      elapsed += clock.getDelta()
      const t = elapsed

      mSmooth.x += (mouse.x - mSmooth.x) * 0.04
      mSmooth.y += (mouse.y - mSmooth.y) * 0.04
      camera.position.x = mSmooth.x * 0.5
      camera.position.y = -mSmooth.y * 0.3
      camera.lookAt(0, 0, 0)

      for (let i = 0; i < COUNT; i++) {
        const wave  = Math.sin(t * 0.7 + phX[i] + phY[i] + phD[i]) * 0.15
        const wave2 = Math.sin(t * 0.4 + phD[i] * 1.3) * 0.08
        dummy.position.set(baseX[i], baseY[i], wave + wave2)
        dummy.rotation.set(nRX[i] + wave * 0.15, 0, nRZ[i] + wave2 * 0.1)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      camera.aspect = W() / H()
      camera.updateProjectionMatrix()
      renderer.setSize(W(), H())
    })
    ro.observe(parent)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      ro.disconnect()
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      scene.clear()
    }
  }, [])

  return (
    <canvas
      ref={mountRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
