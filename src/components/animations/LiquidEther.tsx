import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LiquidEther.css';

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const webglRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef(true);
  const resizeRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    function makePaletteTexture(stops: string[]) {
      let arr: string[];
      if (Array.isArray(stops) && stops.length > 0) {
        arr = stops.length === 1 ? [stops[0], stops[0]] : stops;
      } else {
        arr = ['#ffffff', '#ffffff'];
      }
      const w = arr.length;
      const data = new Uint8Array(w * 4);
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i * 4 + 0] = Math.round(c.r * 255);
        data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255);
        data[i * 4 + 3] = 255;
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    }

    const paletteTex = makePaletteTexture(colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    class CommonClass {
      width = 0;
      height = 0;
      aspect = 1;
      pixelRatio = 1;
      renderer: THREE.WebGLRenderer | null = null;
      clock: THREE.Clock | null = null;
      container: HTMLDivElement | null = null;

      init(container: HTMLDivElement) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.display = 'block';
        this.clock = new THREE.Clock();
        this.clock.start();
      }

      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);
      }

      update() {
        if (!this.clock) return;
        this.clock.getDelta();
      }
    }

    const Common = new CommonClass();

    class MouseClass {
      mouseMoved = false;
      coords = new THREE.Vector2();
      coords_old = new THREE.Vector2();
      diff = new THREE.Vector2();
      timer: number | null = null;
      container: HTMLDivElement | null = null;
      docTarget: Document | null = null;
      listenerTarget: Window | null = null;
      isHoverInside = false;
      hasUserControl = false;
      isAutoActive = false;
      autoIntensity = 2.0;
      takeoverActive = false;
      takeoverStartTime = 0;
      takeoverDuration = 0.25;
      takeoverFrom = new THREE.Vector2();
      takeoverTo = new THREE.Vector2();
      onInteract: (() => void) | null = null;
      private _onMouseMove = this.onDocumentMouseMove.bind(this);
      private _onTouchStart = this.onDocumentTouchStart.bind(this);
      private _onTouchMove = this.onDocumentTouchMove.bind(this);
      private _onTouchEnd = this.onTouchEnd.bind(this);
      private _onDocumentLeave = this.onDocumentLeave.bind(this);

      init(container: HTMLDivElement) {
        this.container = container;
        this.docTarget = container.ownerDocument || null;
        const defaultView = (this.docTarget?.defaultView) || window;
        this.listenerTarget = defaultView;
        this.listenerTarget.addEventListener('mousemove', this._onMouseMove);
        this.listenerTarget.addEventListener('touchstart', this._onTouchStart, { passive: true });
        this.listenerTarget.addEventListener('touchmove', this._onTouchMove, { passive: true });
        this.listenerTarget.addEventListener('touchend', this._onTouchEnd);
        if (this.docTarget) this.docTarget.addEventListener('mouseleave', this._onDocumentLeave);
      }

      dispose() {
        if (this.listenerTarget) {
          this.listenerTarget.removeEventListener('mousemove', this._onMouseMove);
          this.listenerTarget.removeEventListener('touchstart', this._onTouchStart);
          this.listenerTarget.removeEventListener('touchmove', this._onTouchMove);
          this.listenerTarget.removeEventListener('touchend', this._onTouchEnd);
        }
        if (this.docTarget) this.docTarget.removeEventListener('mouseleave', this._onDocumentLeave);
      }

      isPointInside(clientX: number, clientY: number) {
        if (!this.container) return false;
        const rect = this.container.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      }

      updateHoverState(clientX: number, clientY: number) {
        this.isHoverInside = this.isPointInside(clientX, clientY);
        return this.isHoverInside;
      }

      setCoords(x: number, y: number) {
        if (!this.container) return;
        if (this.timer) window.clearTimeout(this.timer);
        const rect = this.container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const nx = (x - rect.left) / rect.width;
        const ny = (y - rect.top) / rect.height;
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
        this.mouseMoved = true;
        this.timer = window.setTimeout(() => {
          this.mouseMoved = false;
        }, 100);
      }

      setNormalized(nx: number, ny: number) {
        this.coords.set(nx, ny);
        this.mouseMoved = true;
      }

      onDocumentMouseMove(event: MouseEvent) {
        if (!this.updateHoverState(event.clientX, event.clientY)) return;
        if (this.onInteract) this.onInteract();
        this.setCoords(event.clientX, event.clientY);
        this.hasUserControl = true;
      }

      onDocumentTouchStart(event: TouchEvent) {
        if (event.touches.length !== 1) return;
        const t = event.touches[0];
        if (!this.updateHoverState(t.clientX, t.clientY)) return;
        if (this.onInteract) this.onInteract();
        this.setCoords(t.clientX, t.clientY);
        this.hasUserControl = true;
      }

      onDocumentTouchMove(event: TouchEvent) {
        if (event.touches.length !== 1) return;
        const t = event.touches[0];
        if (!this.updateHoverState(t.clientX, t.clientY)) return;
        if (this.onInteract) this.onInteract();
        this.setCoords(t.clientX, t.clientY);
      }

      onTouchEnd() {
        this.isHoverInside = false;
      }

      onDocumentLeave() {
        this.isHoverInside = false;
      }

      update() {
        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);
        if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);
      }
    }

    const Mouse = new MouseClass();

    const faceVert = `
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5) + (pos.xy) * 0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `;

    const colorFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `;

    class ShaderPass {
      props: any;
      uniforms: any;
      scene: THREE.Scene;
      camera: THREE.Camera;
      material: THREE.RawShaderMaterial | null = null;
      geometry: THREE.PlaneGeometry | null = null;
      plane: THREE.Mesh | null = null;

      constructor(props: any) {
        this.props = props || {};
        this.uniforms = this.props.material?.uniforms;
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
      }

      init() {
        if (this.uniforms) {
          this.material = new THREE.RawShaderMaterial(this.props.material);
          this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
          this.plane = new THREE.Mesh(this.geometry, this.material);
          this.scene.add(this.plane);
        }
      }

      update() {
        Common.renderer?.setRenderTarget(this.props.output || null);
        Common.renderer?.render(this.scene, this.camera);
        Common.renderer?.setRenderTarget(null);
      }
    }

    class Simulation {
      options: any;
      fbos: Record<string, THREE.WebGLRenderTarget>;
      fboSize = new THREE.Vector2();
      cellScale = new THREE.Vector2();
      boundarySpace = new THREE.Vector2();
      output: any;

      constructor(options: any) {
        this.options = { ...options };
        this.fbos = {};
        this.init();
      }

      init() {
        this.calcSize();
        this.createAllFBO();
        this.createOutput();
      }

      createAllFBO() {
        const type = THREE.FloatType;
        const opts = { type, depthBuffer: false, stencilBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping };
        this.fbos = {
          vel_0: new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts),
          vel_1: new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts),
          vel_viscous0: new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts),
          vel_viscous1: new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts),
          div: new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts),
          pressure_0: new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts),
          pressure_1: new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts)
        };
      }

      createOutput() {
        this.output = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.RawShaderMaterial({
          vertexShader: faceVert,
          fragmentShader: colorFrag,
          transparent: true,
          depthWrite: false,
          uniforms: {
            velocity: { value: this.fbos.vel_0.texture },
            palette: { value: paletteTex },
            bgColor: { value: bgVec4 }
          }
        }));
      }

      calcSize() {
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));
        const pxX = 1.0 / width;
        const pxY = 1.0 / height;
        this.cellScale.set(pxX, pxY);
        this.fboSize.set(width, height);
      }

      resize() {
        this.calcSize();
        Object.values(this.fbos).forEach((target) => target.setSize(this.fboSize.x, this.fboSize.y));
      }
    }

    const simulation = new Simulation({
      resolution,
      mouse_force: mouseForce,
      cursor_size: cursorSize,
      viscous,
      iterations_viscous: iterationsViscous,
      iterations_poisson: iterationsPoisson,
      dt: 0.014,
      isViscous,
      BFECC: true,
      isBounce
    });

    const scene = new THREE.Scene();
    scene.add(simulation.output);
    Common.init(mountRef.current);
    Mouse.init(mountRef.current);

    const container = mountRef.current;
    container.style.position = container.style.position || 'relative';
    container.style.overflow = container.style.overflow || 'hidden';
    container.prepend(Common.renderer!.domElement);

    const animate = () => {
      Mouse.update();
      Common.update();
      if (Common.renderer) {
        Common.renderer.clear();
        Common.renderer.render(scene, new THREE.Camera());
      }
      webglRef.current = { simulation, scene };
      window.requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      Common.resize();
      simulation.resize();
    };
    window.addEventListener('resize', resize);
    resizeObserverRef.current = new ResizeObserver(resize);
    resizeObserverRef.current.observe(container);

    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const isVisible = entry?.isIntersecting && entry.intersectionRatio > 0;
      isVisibleRef.current = isVisible;
    }, { threshold: [0, 0.01, 0.1] });
    io.observe(container);
    intersectionObserverRef.current = io;

    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      if (intersectionObserverRef.current) intersectionObserverRef.current.disconnect();
      window.removeEventListener('resize', resize);
      Mouse.dispose();
      if (Common.renderer) {
        const canvas = Common.renderer.domElement;
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        Common.renderer.dispose();
      }
    };
  }, [colors, cursorSize, isBounce, isViscous, iterationsPoisson, iterationsViscous, mouseForce, resolution, viscous, autoDemo, autoIntensity, autoRampDuration, autoResumeDelay, autoSpeed, takeoverDuration]);

  return <div ref={mountRef} className={`liquid-ether-container ${className || ''}`} style={style} />;
}
