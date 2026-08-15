import { useEffect, useRef } from 'react';
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';
import './Threads.css';

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
}
float line(vec2 uv, float offset, float time) {
  float wave = sin(uv.x * 4.0 + offset * 9.0 + time) * uAmplitude * 0.07;
  wave += (noise(vec2(uv.x * 2.0, offset + time * 0.08)) - 0.5) * uAmplitude * 0.16;
  float y = 0.15 + offset * uDistance + wave;
  return smoothstep(0.018, 0.0, abs(uv.y - y));
}
void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float lines = 0.0;
  for (int i = 0; i < 18; i++) {
    lines += line(uv, float(i) / 18.0, iTime * 0.42 + float(i) * 0.18);
  }
  float alpha = min(lines, 1.0) * 0.58;
  gl_FragColor = vec4(uColor, alpha);
}`;

// Adapted for SweetHour from the React Bits Threads background component.
export default function Threads({ color = [0.76, 0.57, 0.23], amplitude = 1, distance = 0.82, className = '' }) {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(0);
  const propsRef = useRef({ color, amplitude, distance });
  propsRef.current = { color, amplitude, distance };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Color(1, 1, 1) },
        uColor: { value: new Color(...propsRef.current.color) },
        uAmplitude: { value: propsRef.current.amplitude },
        uDistance: { value: propsRef.current.distance },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.dpr = dpr;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(container);

    const render = (time) => {
      animationFrameRef.current = requestAnimationFrame(render);
      if (!visible || document.hidden) return;
      const current = propsRef.current;
      program.uniforms.uColor.value.set(...current.color);
      program.uniforms.uAmplitude.value = current.amplitude;
      program.uniforms.uDistance.value = current.distance;
      program.uniforms.iTime.value = time * 0.001;
      renderer.render({ scene: mesh });
    };
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      observer.disconnect();
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className={`threads-container ${className}`} aria-hidden="true" />;
}
