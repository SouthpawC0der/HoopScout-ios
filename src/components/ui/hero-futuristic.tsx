// @ts-nocheck
'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from 'three/tsl';

// Original depth-matched texture pair — required for the 3D parallax effect to work correctly
const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP   = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

/* ─── Post Processing ──────────────────────────────────────────────── */

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    // THREE.PostProcessing was renamed to THREE.RenderPipeline in r168+
    const postProcessing = new (THREE.RenderPipeline ?? THREE.PostProcessing)(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(uScanProgress)));

    // Navy blue scan overlay
    const blueOverlay = vec3(0, 0.12, 0.9).mul(oneMinus(scanLine)).mul(0.4);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, blueOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

/* ─── Scene ────────────────────────────────────────────────────────── */

const WIDTH  = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer  = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength  = 0.01;

    const tDepthMap = texture(depthMap);
    const tMap      = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect   = float(WIDTH).div(HEIGHT);
    const tUv      = vec2(uv().x.mul(aspect), uv().y);
    const tiling   = vec2(120.0);
    const tiledUv  = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist     = float(tiledUv.length());
    const dot      = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth    = tDepthMap;
    const flow     = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    // Navy blue animated dot particles
    const mask  = dot.mul(flow).mul(vec3(0, 0.3, 9));
    const final = blendScreen(tMap, mask);

    const mat = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material: mat, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    if (meshRef.current) {
      const mat = (meshRef.current as any).material;
      if (mat && 'opacity' in mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.4, h * 0.4, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

/* ─── HoopScout Hero Overlay ───────────────────────────────────────── */

const TITLE_WORDS = ['SCOUT', 'SMARTER.', 'PLAY', 'HARDER.'];
const SUBTITLE    = 'Find courts, track players, and dominate every game.';

export default function HeroFuturistic() {
  const [visibleWords,    setVisibleWords]    = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [ctasVisible,     setCtasVisible]     = useState(false);
  const [delays,          setDelays]          = useState<number[]>([]);
  const [subtitleDelay,   setSubtitleDelay]   = useState(0);

  useEffect(() => {
    setDelays(TITLE_WORDS.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, []);

  useEffect(() => {
    if (visibleWords < TITLE_WORDS.length) {
      const t = setTimeout(() => setVisibleWords((v) => v + 1), 520);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setSubtitleVisible(true), 600);
    const t2 = setTimeout(() => setCtasVisible(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visibleWords]);

  return (
    <div className="relative h-svh overflow-hidden">
      {/* HTML overlay — sits above the canvas */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 pointer-events-none">

        {/* Badge */}
        <div
          className={`mb-5 transition-all duration-700 ${ctasVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <span
            className="inline-flex items-center px-4 py-1.5 text-sm font-semibold rounded-full border pointer-events-auto"
            style={{
              color: '#F97316',
              borderColor: 'rgba(249,115,22,0.35)',
              backgroundColor: 'rgba(249,115,22,0.12)',
            }}
          >
            Now Available on iOS &amp; Android
          </span>
        </div>

        {/* Wordmark */}
        <p
          className="mb-4 text-2xl font-black tracking-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: 'rgba(255,255,255,0.5)' }}
        >
          HOOP<span style={{ color: '#F97316' }}>SCOUT</span>
        </p>

        {/* Animated title */}
        <h1
          className="font-black leading-none mb-4"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <div className="flex flex-wrap gap-x-4 gap-y-0">
            {TITLE_WORDS.map((word, i) => (
              <span
                key={i}
                className={`text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl ${i < visibleWords ? 'hero-word-in' : 'opacity-0'}`}
                style={{
                  animationDelay: `${i * 0.12 + (delays[i] ?? 0)}s`,
                  color: i % 2 === 1 ? '#F97316' : '#ffffff',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl xl:text-2xl font-medium max-w-lg mb-8 ${subtitleVisible ? 'hero-subtitle-in' : 'opacity-0'}`}
          style={{
            animationDelay: `${TITLE_WORDS.length * 0.12 + 0.2 + subtitleDelay}s`,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          {SUBTITLE}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 pointer-events-auto transition-all duration-700 ${ctasVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <Link
            href="#download"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-base transition-opacity duration-200 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#F97316,#F59E0B)' }}
          >
            Download Free
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white font-semibold text-base border transition-colors duration-200 hover:bg-white/10 backdrop-blur-sm"
            style={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            Shop Merch
          </Link>
        </div>

        {/* Social proof */}
        <div
          className={`mt-8 flex flex-wrap items-center gap-6 text-sm transition-all duration-700 ${ctasVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ color: 'rgba(255,255,255,0.35)', transitionDelay: '0.4s' }}
        >
          <div className="flex items-center gap-1.5">
            {[0,1,2,3,4].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
            ))}
            <span className="ml-1">4.9 App Store</span>
          </div>
          <span aria-hidden="true">·</span>
          <span>10,000+ Players</span>
          <span aria-hidden="true">·</span>
          <span>500+ Courts Mapped</span>
        </div>
      </div>

      {/* WebGPU Canvas — fills entire hero */}
      <Canvas
        flat
        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
      >
        <PostProcessing fullScreenEffect />
        <Scene />
      </Canvas>
    </div>
  );
}
