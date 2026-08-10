"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AbstractConfig {
  geometry: () => THREE.BufferGeometry;
  color: number;
  wireframe?: boolean;
  opacity?: number;
  metalness?: number;
  roughness?: number;
  animation: (mesh: THREE.Mesh, time: number) => void;
}

const ABSTRACTS: Record<string, AbstractConfig> = {
  "3d-forma-organica": {
    geometry: () => new THREE.TorusKnotGeometry(0.6, 0.2, 128, 32),
    color: 0x818cf8,
    opacity: 0.75,
    metalness: 0.2,
    roughness: 0.4,
    animation: (m, t) => {
      m.rotation.y = t * 0.3;
      m.rotation.x = Math.sin(t * 0.5) * 0.3;
      m.scale.setScalar(1 + Math.sin(t * 0.8) * 0.05);
    },
  },
  "3d-liquido-metalico": {
    geometry: () => {
      const geo = new THREE.IcosahedronGeometry(0.7, 6);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const offset = Math.sin(x * 3) * Math.cos(y * 3) * 0.08;
        pos.setXYZ(i, x + offset * x * 0.5, y + offset * y * 0.5, z + offset * z * 0.5);
      }
      geo.computeVertexNormals();
      return geo;
    },
    color: 0xc0c0c0,
    metalness: 0.95,
    roughness: 0.05,
    animation: (m, t) => {
      m.rotation.y = t * 0.4;
      m.rotation.z = t * 0.2;
    },
  },
  "3d-cristal-facetado": {
    geometry: () => new THREE.IcosahedronGeometry(0.7, 0),
    color: 0xe0e7ff,
    opacity: 0.6,
    metalness: 0.1,
    roughness: 0.0,
    animation: (m, t) => {
      m.rotation.y = t * 0.35;
      m.rotation.x = Math.cos(t * 0.3) * 0.2;
    },
  },
  "3d-particulas-orbita": {
    geometry: () => {
      const count = 2000;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 0.5 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return geo;
    },
    color: 0x38bdf8,
    animation: (m, t) => {
      m.rotation.y = t * 0.15;
      m.rotation.x = t * 0.08;
    },
  },
  "3d-onda-geometrica": {
    geometry: () => {
      const size = 2;
      const segments = 40;
      const geo = new THREE.PlaneGeometry(size, size, segments, segments);
      return geo;
    },
    color: 0x34d399,
    wireframe: true,
    animation: (m, t) => {
      const geo = m.geometry as THREE.PlaneGeometry;
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 5 + t * 2) * Math.cos(y * 5 + t * 1.5) * 0.15);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      m.rotation.x = -0.5;
    },
  },
  "3d-espiral-luminosa": {
    geometry: () => {
      const count = 1500;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 12;
        const r = t * 0.8;
        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = (t - 0.5) * 1.2;
        positions[i * 3 + 2] = Math.sin(angle) * r;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return geo;
    },
    color: 0xfbbf24,
    animation: (m, t) => {
      m.rotation.y = t * 0.5;
    },
  },
  "3d-aurora-forma": {
    geometry: () => new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16, 2, 3),
    color: 0x4ade80,
    opacity: 0.65,
    metalness: 0.3,
    roughness: 0.2,
    animation: (m, t) => {
      m.rotation.y = t * 0.25;
      m.rotation.z = Math.sin(t * 0.4) * 0.3;
      m.scale.set(
        1 + Math.sin(t * 0.6) * 0.08,
        1 + Math.cos(t * 0.7) * 0.08,
        1 + Math.sin(t * 0.5) * 0.08
      );
    },
  },

  // ─── Premium Glass ───
  "3d-orb-cristal": {
    geometry: () => new THREE.IcosahedronGeometry(0.7, 4),
    color: 0xc7d2fe,
    opacity: 0.35,
    metalness: 0.0,
    roughness: 0.0,
    animation: (m, t) => {
      m.rotation.y = t * 0.3;
      m.rotation.x = Math.sin(t * 0.4) * 0.15;
      m.scale.setScalar(1 + Math.sin(t * 0.7) * 0.03);
    },
  },

  // ─── Chrome Blob ───
  "3d-chrome-blob": {
    geometry: () => {
      const geo = new THREE.SphereGeometry(0.6, 64, 64);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const noise = Math.sin(x * 4) * Math.cos(y * 4) * Math.sin(z * 4) * 0.12;
        pos.setXYZ(i, x + noise * x, y + noise * y, z + noise * z);
      }
      geo.computeVertexNormals();
      return geo;
    },
    color: 0xe2e8f0,
    metalness: 0.98,
    roughness: 0.02,
    animation: (m, t) => {
      m.rotation.y = t * 0.35;
      m.rotation.z = t * 0.15;
    },
  },

  // ─── Iridescent Shell ───
  "3d-iridiscente": {
    geometry: () => new THREE.TorusGeometry(0.5, 0.2, 48, 100),
    color: 0xffffff,
    metalness: 0.5,
    roughness: 0.1,
    animation: (m, t) => {
      m.rotation.x = t * 0.2;
      m.rotation.y = t * 0.35;
      // Shift hue via material color
      const hue = (Math.sin(t * 0.3) + 1) / 2;
      const col = new THREE.Color().setHSL(hue, 0.8, 0.6);
      (m.material as THREE.MeshStandardMaterial).color.copy(col);
    },
  },

  // ─── Liquid Metal ───
  "3d-liquido-vivo": {
    geometry: () => {
      const geo = new THREE.IcosahedronGeometry(0.65, 7);
      const pos = geo.attributes.position;
      const seed = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        seed[i] = Math.random() * 100;
      }
      (geo as any)._seed = seed;
      return geo;
    },
    color: 0xb0b0b0,
    metalness: 0.95,
    roughness: 0.05,
    animation: (m, t) => {
      const geo = m.geometry as THREE.IcosahedronGeometry;
      const pos = geo.attributes.position;
      const seed = (geo as any)._seed as Float32Array;
      if (seed) {
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          const len = Math.sqrt(x * x + y * y + z * z);
          const nx = x / len, ny = y / len, nz = z / len;
          const disp = Math.sin(seed[i] + t * 2) * 0.08 + Math.cos(seed[i] * 0.7 + t * 1.5) * 0.04;
          pos.setXYZ(i, nx * (0.65 + disp), ny * (0.65 + disp), nz * (0.65 + disp));
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
      }
      m.rotation.y = t * 0.3;
    },
  },

  // ─── Metaball ───
  "3d-metaball": {
    geometry: () => {
      const geo = new THREE.SphereGeometry(0.6, 48, 48);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const blob1 = Math.sin(x * 3 + y * 2) * 0.15;
        const blob2 = Math.cos(z * 3 - x * 2) * 0.12;
        const blob3 = Math.sin(y * 4 + z * 3) * 0.1;
        const offset = blob1 + blob2 + blob3;
        const len = Math.sqrt(x * x + y * y + z * z);
        pos.setXYZ(i, x + (x / len) * offset, y + (y / len) * offset, z + (z / len) * offset);
      }
      geo.computeVertexNormals();
      return geo;
    },
    color: 0xa78bfa,
    opacity: 0.8,
    metalness: 0.3,
    roughness: 0.4,
    animation: (m, t) => {
      m.rotation.y = t * 0.25;
      m.rotation.x = Math.sin(t * 0.3) * 0.2;
      m.scale.set(
        1 + Math.sin(t * 0.5) * 0.06,
        1 + Math.cos(t * 0.6) * 0.06,
        1 + Math.sin(t * 0.4) * 0.06
      );
    },
  },

  // ─── Wireframe Glow ───
  "3d-wireframe-glow": {
    geometry: () => new THREE.IcosahedronGeometry(0.7, 1),
    color: 0x22d3ee,
    wireframe: true,
    animation: (m, t) => {
      m.rotation.y = t * 0.4;
      m.rotation.x = t * 0.2;
    },
  },

  // ─── Particle Swarm (Points) ───
  "3d-particulas-mouse": {
    geometry: () => {
      const count = 3000;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const r = 0.3 + Math.random() * 0.7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        sizes[i] = 0.5 + Math.random() * 1.5;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      return geo;
    },
    color: 0xf472b6,
    animation: (m, t) => {
      m.rotation.y = t * 0.1;
      m.rotation.x = Math.sin(t * 0.2) * 0.1;
    },
  },

  // ─── Distortion Wave ───
  "3d-ondas-distorsion": {
    geometry: () => new THREE.PlaneGeometry(2.5, 2.5, 60, 60),
    color: 0x6ee7b7,
    wireframe: false,
    animation: (m, t) => {
      const geo = m.geometry as THREE.PlaneGeometry;
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const wave1 = Math.sin(x * 4 + t * 1.5) * 0.08;
        const wave2 = Math.cos(y * 3 + t * 1.2) * 0.06;
        const wave3 = Math.sin((x + y) * 2 + t * 2) * 0.04;
        pos.setZ(i, wave1 + wave2 + wave3);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      m.rotation.x = -0.6;
    },
  },

  // ─── Kinetic Sculpture ───
  "3d-escultura-cinetica": {
    geometry: () => new THREE.TorusKnotGeometry(0.4, 0.12, 80, 16),
    color: 0xfbbf24,
    metalness: 0.7,
    roughness: 0.15,
    animation: (m, t) => {
      m.rotation.y = t * 0.5;
      m.rotation.z = t * 0.3;
      m.position.y = Math.sin(t * 0.8) * 0.1;
    },
  },

  // ─── Neon Torus ───
  "3d-anillo-neon": {
    geometry: () => new THREE.TorusGeometry(0.5, 0.08, 32, 100),
    color: 0xff006e,
    opacity: 0.9,
    metalness: 0.0,
    roughness: 0.0,
    animation: (m, t) => {
      m.rotation.x = t * 0.3;
      m.rotation.y = t * 0.5;
      // Pulsing glow
      const pulse = 0.7 + Math.sin(t * 2) * 0.3;
      (m.material as THREE.MeshStandardMaterial).color.setRGB(pulse, 0, pulse * 0.4);
    },
  },

  // ─── Holographic Plane ───
  "3d-plano-holografico": {
    geometry: () => new THREE.PlaneGeometry(1.8, 1.8, 40, 40),
    color: 0x06b6d4,
    opacity: 0.7,
    metalness: 0.4,
    roughness: 0.1,
    animation: (m, t) => {
      const geo = m.geometry as THREE.PlaneGeometry;
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const scanline = Math.sin(y * 20 + t * 4) * 0.02;
        const warp = Math.sin(x * 3 + t) * 0.03;
        pos.setZ(i, scanline + warp);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      // Holographic color shift
      const hue = (t * 0.1) % 1;
      const col = new THREE.Color().setHSL(hue, 0.7, 0.5);
      (m.material as THREE.MeshStandardMaterial).color.copy(col);
      m.rotation.x = -0.3;
    },
  },

  // ─── Crystal Cluster ───
  "3d-cristal-cluster": {
    geometry: () => new THREE.OctahedronGeometry(0.5, 0),
    color: 0xddd6fe,
    opacity: 0.7,
    metalness: 0.2,
    roughness: 0.0,
    animation: (m, t) => {
      m.rotation.y = t * 0.3;
      m.rotation.z = Math.sin(t * 0.5) * 0.2;
      m.scale.set(
        1 + Math.sin(t * 0.4) * 0.05,
        1 + Math.cos(t * 0.5) * 0.08,
        1 + Math.sin(t * 0.3) * 0.05
      );
    },
  },

  // ─── Luz Prismática ───
  "3d-luz-prismatica": {
    geometry: () => new THREE.OctahedronGeometry(0.65, 2),
    color: 0xffffff,
    metalness: 0.3,
    roughness: 0.0,
    animation: (m, t) => {
      m.rotation.y = t * 0.4;
      m.rotation.x = t * 0.2;
      const hue = (Math.sin(t * 0.25) + 1) / 2;
      const col = new THREE.Color().setHSL(hue, 0.9, 0.65);
      (m.material as THREE.MeshStandardMaterial).color.copy(col);
    },
  },

  // ─── Estructura Atómica ───
  "3d-estructura-atomica": {
    geometry: () => new THREE.IcosahedronGeometry(0.5, 1),
    color: 0x38bdf8,
    metalness: 0.6,
    roughness: 0.2,
    animation: (m, t) => {
      m.rotation.y = t * 0.3;
      m.rotation.z = t * 0.15;
      m.scale.setScalar(1 + Math.sin(t * 0.6) * 0.04);
    },
  },

  // ─── Nebula Cósmica ───
  "3d-nebula-cosmica": {
    geometry: () => {
      const count = 4000;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 0.2 + Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        const t = i / count;
        colors[i * 3] = 0.3 + t * 0.5;
        colors[i * 3 + 1] = 0.1 + t * 0.3;
        colors[i * 3 + 2] = 0.6 + t * 0.4;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      return geo;
    },
    color: 0xc084fc,
    animation: (m, t) => {
      m.rotation.y = t * 0.08;
      m.rotation.x = t * 0.05;
    },
  },

  // ─── Loop Infinito ───
  "3d-loop-infinito": {
    geometry: () => new THREE.TorusKnotGeometry(0.45, 0.15, 128, 32, 3, 2),
    color: 0xf43f5e,
    opacity: 0.85,
    metalness: 0.0,
    roughness: 0.0,
    animation: (m, t) => {
      m.rotation.y = t * 0.35;
      m.rotation.x = t * 0.2;
      const pulse = 0.8 + Math.sin(t * 1.5) * 0.2;
      (m.material as THREE.MeshStandardMaterial).color.setRGB(pulse, 0.1, pulse * 0.3);
    },
  },

  // ─── Explosión Geométrica ───
  "3d-explosion-geometrica": {
    geometry: () => new THREE.TetrahedronGeometry(0.5, 0),
    color: 0xf97316,
    metalness: 0.5,
    roughness: 0.2,
    animation: (m, t) => {
      m.rotation.y = t * 0.6;
      m.rotation.x = t * 0.4;
      m.rotation.z = t * 0.3;
      const s = 0.8 + Math.sin(t * 0.7) * 0.2;
      m.scale.setScalar(s);
    },
  },

  // ─── Plasma Orgánico ───
  "3d-plasma-organico": {
    geometry: () => {
      const geo = new THREE.SphereGeometry(0.6, 48, 48);
      const pos = geo.attributes.position;
      const seed = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        seed[i] = Math.random() * Math.PI * 2;
      }
      (geo as any)._seed = seed;
      return geo;
    },
    color: 0x34d399,
    opacity: 0.75,
    metalness: 0.1,
    roughness: 0.3,
    animation: (m, t) => {
      const geo = m.geometry as THREE.SphereGeometry;
      const pos = geo.attributes.position;
      const seed = (geo as any)._seed as Float32Array;
      if (seed) {
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          const len = Math.sqrt(x * x + y * y + z * z);
          const nx = x / len, ny = y / len, nz = z / len;
          const pulse = Math.sin(seed[i] * 3 + t * 1.8) * 0.1 +
                        Math.cos(seed[i] * 5 + t * 2.2) * 0.06;
          pos.setXYZ(i, nx * (0.6 + pulse), ny * (0.6 + pulse), nz * (0.6 + pulse));
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
      }
      m.rotation.y = t * 0.2;
    },
  },

  // ─── Cristales Flotantes ───
  "3d-cristales-flotantes": {
    geometry: () => new THREE.OctahedronGeometry(0.4, 0),
    color: 0xe9d5ff,
    opacity: 0.65,
    metalness: 0.3,
    roughness: 0.0,
    animation: (m, t) => {
      m.rotation.y = t * 0.35;
      m.rotation.x = Math.sin(t * 0.4) * 0.3;
      m.position.y = Math.sin(t * 0.7) * 0.08;
    },
  },

  // ─── Polvo Estelar ───
  "3d-polvo-estelar": {
    geometry: () => {
      const count = 2500;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 0.3 + Math.random() * 0.7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        const hue = Math.random();
        const col = new THREE.Color().setHSL(hue, 0.7, 0.7);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      return geo;
    },
    color: 0xfbbf24,
    animation: (m, t) => {
      m.rotation.y = t * 0.12;
      m.rotation.x = Math.sin(t * 0.15) * 0.1;
    },
  },
};

export default function ThreeDPreview({ elementoId }: { elementoId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const config = ABSTRACTS[elementoId];
    if (!config) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const mat = new THREE.MeshStandardMaterial({
      color: config.color,
      metalness: config.metalness ?? 0.4,
      roughness: config.roughness ?? 0.3,
      transparent: config.opacity !== undefined,
      opacity: config.opacity ?? 1,
      wireframe: config.wireframe ?? false,
      side: config.wireframe ? THREE.DoubleSide : THREE.FrontSide,
    });

    const mesh = new THREE.Mesh(config.geometry(), mat);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(-3, -1, -2);
    scene.add(fill);

    // Drag state
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      velX = (e.clientX - prevX) * 0.008;
      velY = (e.clientY - prevY) * 0.008;
      mesh.rotation.y += velX;
      mesh.rotation.x += velY;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.style.cursor = "grab";

    let raf: number;
    let startTime = performance.now();

    const loop = () => {
      const t = (performance.now() - startTime) / 1000;

      if (!isDragging) {
        velX *= 0.92;
        velY *= 0.92;
        mesh.rotation.y += velX;
        mesh.rotation.x += velY;
        config.animation(mesh, t);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [elementoId]);

  return <div ref={ref} className="h-full w-full touch-none" />;
}
