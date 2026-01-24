// @ts-nocheck
/**
 * Porto Climate Dashboard - Custom Element for Astro
 * 3D interactive weather visualization using Three.js
 */

declare const THREE: typeof import('three') & {
  OrbitControls: new (camera: THREE.Camera, domElement: HTMLElement) => THREE.OrbitControls;
};

declare module 'three' {
  interface OrbitControls {
    target: THREE.Vector3;
    enableDamping: boolean;
    dampingFactor: number;
    enablePan: boolean;
    enableZoom: boolean;
    minPolarAngle: number;
    maxPolarAngle: number;
    update(): void;
    dispose(): void;
  }
}

interface CityConfig {
  latitude: number;
  longitude: number;
  name: string;
}

interface ClimateData {
  temperature: {
    max: (number | null)[];
    min: (number | null)[];
  };
  wind: {
    speed: (number | null)[];
    gusts: (number | null)[];
    direction: (number | null)[];
  };
  precipitation: (number | null)[];
}

interface DataPoint {
  x: number;
  y: number;
  z: number;
  dayIndex: number;
  maxTemp?: number | null;
  minTemp?: number | null;
  speed?: number | null;
  gusts?: number | null;
  direction?: number | null;
}

// Constants
const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const DATA_COLORS = {
  temperature: { hex: 0xdc2626, css: '#DC2626' },
  temperatureMax: { hex: 0xef4444, css: '#EF4444' },
  temperatureMin: { hex: 0x60a5fa, css: '#60A5FA' },
  wind: { hex: 0x6b7280, css: '#6B7280' },
};

const FADE_SPEED = 0.15;
const BASE_RADIUS = 3.2;
const RADIUS_OFFSET = 0.35;
const MIN_HEIGHT = 1.0;
const MAX_HEIGHT = 5.0;
const MIN_EXTRUDE_HEIGHT = 0.1;
const MAX_EXTRUDE_HEIGHT = 1.5;
const CACHE_PREFIX = 'porto_climate_';

function getDayLabels(): string[] {
  const labels: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (i === 0) {
      labels.push('Hoje');
    } else {
      labels.push(DAY_NAMES[date.getDay()]);
    }
  }
  return labels;
}

class TempoChartElement extends HTMLElement {
  private city: CityConfig = { latitude: 41.1496, longitude: -8.611, name: 'Porto' };
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private orbitControls: THREE.OrbitControls | null = null;
  private animationId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private themeObserver: MutationObserver | null = null;

  private ringMeshes: { temperature: THREE.Group | null; wind: THREE.Group | null } = {
    temperature: null,
    wind: null,
  };
  private ringLabels: { temperature: THREE.Sprite[]; wind: THREE.Sprite[] } = {
    temperature: [],
    wind: [],
  };

  private climateData: ClimateData | null = null;
  private focusedRing: 'temperature' | 'wind' | null = null;
  private isDarkMode = false;
  private isDetailedMode = false;
  private isLoading = true;
  private DAYS: string[] = getDayLabels();

  connectedCallback() {
    // Read config from data attributes
    const cityAttr = this.dataset.city;
    if (cityAttr) {
      try {
        this.city = JSON.parse(cityAttr);
      } catch (e) {
        console.warn('Invalid city config, using default Porto');
      }
    }

    // Check current theme
    this.isDarkMode = document.documentElement.dataset.theme === 'dark';

    // Load view mode from localStorage
    this.loadViewMode();

    // Wait for Three.js to be available
    this.waitForThreeJS().then(() => {
      this.initScene();
      this.setupEventListeners();
      this.setupThemeObserver();
      this.loadData();
      this.animate();
    });
  }

  disconnectedCallback() {
    // Cleanup
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.orbitControls) {
      this.orbitControls.dispose();
    }
  }

  private async waitForThreeJS(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (typeof THREE !== 'undefined' && THREE.OrbitControls) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }

  private setupThemeObserver() {
    this.themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          this.isDarkMode = document.documentElement.dataset.theme === 'dark';
          this.updateSceneColors();
          this.renderAllRings();
        }
      }
    });
    this.themeObserver.observe(document.documentElement, { attributes: true });
  }

  private initScene() {
    const container = this.querySelector('.chart-wrapper') as HTMLElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(33, width / height, 0.1, 1000);
    this.camera.position.set(9, 9, 9);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Controls
    this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.target.set(0, 2, 0);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
    this.orbitControls.enablePan = false;
    this.orbitControls.enableZoom = false;
    this.orbitControls.minPolarAngle = Math.PI / 2.5;
    this.orbitControls.maxPolarAngle = Math.PI / 2.5;
    this.orbitControls.update();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-5, 8, -5);
    this.scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight3.position.set(0, -5, 0);
    this.scene.add(directionalLight3);

    // Base platform
    this.createBasePlatform();

    // Day labels
    this.createDayLabels();

    // Center label
    this.createCenterLabel();

    // Setup resize observer
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);
  }

  private createBasePlatform() {
    if (!this.scene) return;
    const radius = 4;

    let precipValues = [0, 0, 0, 0, 0, 0, 0];
    let maxPrecip = 0;

    if (this.climateData?.precipitation) {
      precipValues = this.climateData.precipitation.map((v) => v ?? 0);
      const validValues = precipValues.filter((v) => v > 0);
      maxPrecip = validValues.length > 0 ? Math.max(...validValues) : 0;
    }

    const wedgeColor = 0x7dd3fc;

    for (let i = 0; i < 7; i++) {
      const angle1 = (i / 7) * Math.PI * 2 - Math.PI / 2;
      const angle2 = ((i + 1) / 7) * Math.PI * 2 - Math.PI / 2;
      const midAngle = (angle1 + angle2) / 2;

      const precip = precipValues[i] || 0;
      const extrudeHeight =
        maxPrecip > 0
          ? MIN_EXTRUDE_HEIGHT + (precip / maxPrecip) * (MAX_EXTRUDE_HEIGHT - MIN_EXTRUDE_HEIGHT)
          : MIN_EXTRUDE_HEIGHT;

      const shape = new THREE.Shape();
      shape.moveTo(0, 0);

      const segments = 12;
      for (let j = 0; j <= segments; j++) {
        const a = angle1 + (angle2 - angle1) * (j / segments);
        shape.lineTo(Math.sin(a) * radius, Math.cos(a) * radius);
      }
      shape.lineTo(0, 0);

      const extrudeSettings = { depth: extrudeHeight, bevelEnabled: false };
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.rotateX(-Math.PI / 2);

      const material = new THREE.MeshStandardMaterial({
        color: wedgeColor,
        transparent: true,
        opacity: 0.6,
        roughness: 0.2,
        metalness: 0.1,
      });

      const wedge = new THREE.Mesh(geometry, material);
      wedge.userData.isBasePlatform = true;
      this.scene.add(wedge);

      // Precipitation label
      const labelRadius = radius * 0.6;
      const labelX = Math.sin(midAngle) * labelRadius;
      const labelZ = Math.cos(midAngle) * labelRadius;

      const canvas = document.createElement('canvas');
      canvas.width = 80;
      canvas.height = 40;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = this.isDarkMode ? '#ffffff' : '#1e3a5f';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(precip.toFixed(1) + 'mm', 40, 20);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(labelX, extrudeHeight + 0.3, labelZ);
      sprite.scale.set(0.8, 0.4, 1);
      sprite.userData.isBasePlatform = true;
      this.scene.add(sprite);
    }

    // Lines from center
    const lineY = MAX_EXTRUDE_HEIGHT + 0.02;
    const lineColor = this.isDarkMode ? 0x555555 : 0x999999;
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const points = [new THREE.Vector3(0, lineY, 0), new THREE.Vector3(x, lineY, z)];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: 0.6,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.userData.isBasePlatform = true;
      this.scene.add(line);
    }

    // Outer ring
    const ringGeometry = new THREE.RingGeometry(3.95, 4, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: this.isDarkMode ? 0x444444 : 0x888888,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = lineY;
    ring.userData.isBasePlatform = true;
    this.scene.add(ring);
  }

  private createDayLabels() {
    if (!this.scene) return;

    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
      const radius = 4.3;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 50;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = this.isDarkMode ? '#aaaaaa' : '#555555';
      ctx.font = '500 24px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.DAYS[i], 50, 25);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x, MAX_EXTRUDE_HEIGHT + 0.15, z);
      sprite.scale.set(1, 0.5, 1);
      sprite.userData.isDayLabel = true;
      this.scene.add(sprite);
    }
  }

  private createCenterLabel() {
    if (!this.scene) return;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = this.isDarkMode ? '#4a90d9' : '#1a365d';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.city.name.toUpperCase(), 128, 40);

    const today = new Date();
    const day = today.getDate();
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const month = months[today.getMonth()];
    ctx.font = '500 32px monospace';
    ctx.fillStyle = this.isDarkMode ? '#aaaaaa' : '#555555';
    ctx.fillText(`${day} ${month}`, 128, 90);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(0, MAX_EXTRUDE_HEIGHT + 1.5, 0);
    sprite.scale.set(2.5, 1.25, 1);
    sprite.userData.isCenterLabel = true;
    this.scene.add(sprite);
  }

  private updateSceneColors() {
    if (!this.scene) return;

    const toRemove: THREE.Object3D[] = [];
    this.scene.children.forEach((child) => {
      if (child.userData.isBasePlatform || child.userData.isDayLabel || child.userData.isCenterLabel) {
        toRemove.push(child);
      }
    });
    toRemove.forEach((obj) => this.scene!.remove(obj));

    this.createBasePlatform();
    this.createDayLabels();
    this.createCenterLabel();
  }

  private drawWindArrow(ctx: CanvasRenderingContext2D, x: number, y: number, direction: number, size: number) {
    const radians = ((direction - 90) * Math.PI) / 180;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(radians);

    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.lineTo(size / 3, size / 2);
    ctx.lineTo(0, size / 3);
    ctx.lineTo(-size / 3, size / 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  private createTemperatureLabel(maxTemp: number | null, minTemp: number | null, position: THREE.Vector3): THREE.Sprite {
    const canvas = document.createElement('canvas');

    if (this.isDetailedMode) {
      canvas.width = 120;
      canvas.height = 48;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = this.isDarkMode ? 'rgba(36, 36, 36, 0.95)' : 'rgba(251, 254, 251, 0.95)';
      ctx.beginPath();
      ctx.roundRect(8, 8, 104, 32, 4);
      ctx.fill();
      ctx.strokeStyle = this.isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = '500 16px monospace';
      ctx.textBaseline = 'middle';

      const maxText = maxTemp !== null ? `${maxTemp}°` : '—';
      ctx.fillStyle = DATA_COLORS.temperatureMax.css;
      ctx.textAlign = 'right';
      ctx.fillText(maxText, 54, 24);

      ctx.fillStyle = this.isDarkMode ? '#666666' : '#999999';
      ctx.textAlign = 'center';
      ctx.fillText('/', 60, 24);

      const minText = minTemp !== null ? `${minTemp}°` : '—';
      ctx.fillStyle = DATA_COLORS.temperatureMin.css;
      ctx.textAlign = 'left';
      ctx.fillText(minText, 66, 24);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.renderOrder = 999;
      sprite.position.copy(position);
      sprite.position.y += 0.5;
      sprite.scale.set(1.0, 0.4, 1);
      return sprite;
    } else {
      canvas.width = 96;
      canvas.height = 48;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = this.isDarkMode ? 'rgba(36, 36, 36, 0.95)' : 'rgba(251, 254, 251, 0.95)';
      ctx.beginPath();
      ctx.roundRect(8, 8, 80, 32, 4);
      ctx.fill();
      ctx.strokeStyle = this.isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const text = maxTemp !== null ? `${maxTemp}°` : '—';
      ctx.fillStyle = DATA_COLORS.temperature.css;
      ctx.font = '500 18px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 48, 24);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.renderOrder = 999;
      sprite.position.copy(position);
      sprite.position.y += 0.5;
      sprite.scale.set(0.8, 0.4, 1);
      return sprite;
    }
  }

  private createWindLabel(
    speed: number | null,
    gusts: number | null,
    direction: number | null,
    position: THREE.Vector3
  ): THREE.Sprite {
    const canvas = document.createElement('canvas');

    if (this.isDetailedMode) {
      canvas.width = 160;
      canvas.height = 48;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = this.isDarkMode ? 'rgba(36, 36, 36, 0.95)' : 'rgba(251, 254, 251, 0.95)';
      ctx.beginPath();
      ctx.roundRect(4, 8, 152, 32, 4);
      ctx.fill();
      ctx.strokeStyle = this.isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = DATA_COLORS.wind.css;
      ctx.font = '500 14px monospace';
      ctx.textBaseline = 'middle';

      const speedText = speed !== null ? `${speed}kn` : '—';
      ctx.textAlign = 'left';
      ctx.fillText(speedText, 14, 24);

      if (direction !== null) {
        this.drawWindArrow(ctx, 80, 24, direction, 12);
      }

      const gustText = gusts !== null ? `G:${gusts}` : '';
      ctx.textAlign = 'right';
      ctx.fillText(gustText, 148, 24);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.renderOrder = 999;
      sprite.position.copy(position);
      sprite.position.y += 0.5;
      sprite.scale.set(1.3, 0.4, 1);
      return sprite;
    } else {
      canvas.width = 96;
      canvas.height = 48;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = this.isDarkMode ? 'rgba(36, 36, 36, 0.95)' : 'rgba(251, 254, 251, 0.95)';
      ctx.beginPath();
      ctx.roundRect(8, 8, 80, 32, 4);
      ctx.fill();
      ctx.strokeStyle = this.isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const text = speed !== null ? `${speed}kn` : '—';
      ctx.fillStyle = DATA_COLORS.wind.css;
      ctx.font = '500 18px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 48, 24);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.renderOrder = 999;
      sprite.position.copy(position);
      sprite.position.y += 0.5;
      sprite.scale.set(0.8, 0.4, 1);
      return sprite;
    }
  }

  private createRing(dataType: 'temperature' | 'wind', ringIndex: number): THREE.Group | null {
    if (!this.scene || !this.climateData) return null;

    const color = DATA_COLORS[dataType];
    const radius = BASE_RADIUS + ringIndex * RADIUS_OFFSET;

    const group = new THREE.Group();
    const labels: THREE.Sprite[] = [];
    const points: DataPoint[] = [];

    if (dataType === 'temperature') {
      const maxTemps = this.climateData.temperature.max;
      const minTemps = this.climateData.temperature.min;

      const validMaxTemps = maxTemps.filter((v): v is number => v !== null);
      if (validMaxTemps.length === 0) return null;

      const minVal = Math.min(...validMaxTemps);
      const maxVal = Math.max(...validMaxTemps);
      const range = maxVal - minVal || 1;

      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        if (maxTemps[i] !== null) {
          const normalized = (maxTemps[i]! - minVal) / range;
          const y = MIN_HEIGHT + normalized * (MAX_HEIGHT - MIN_HEIGHT);
          points.push({
            x,
            y,
            z,
            maxTemp: maxTemps[i],
            minTemp: minTemps[i],
            dayIndex: i,
          });
        }
      }

      points.forEach((point) => {
        const sphereGeometry = new THREE.SphereGeometry(0.16, 24, 24);
        const sphereMaterial = new THREE.MeshLambertMaterial({
          color: color.hex,
          transparent: true,
          opacity: 0.85,
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(point.x, point.y, point.z);
        group.add(sphere);

        const position = new THREE.Vector3(point.x, point.y, point.z);
        const label = this.createTemperatureLabel(point.maxTemp ?? null, point.minTemp ?? null, position);
        label.userData.dayIndex = point.dayIndex;
        label.userData.basePosition = position.clone();
        label.visible = false;
        labels.push(label);
        group.add(label);
      });
    } else if (dataType === 'wind') {
      const speeds = this.climateData.wind.speed;
      const gusts = this.climateData.wind.gusts;
      const directions = this.climateData.wind.direction;

      const validSpeeds = speeds.filter((v): v is number => v !== null);
      if (validSpeeds.length === 0) return null;

      const minVal = Math.min(...validSpeeds);
      const maxVal = Math.max(...validSpeeds);
      const range = maxVal - minVal || 1;

      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        if (speeds[i] !== null) {
          const normalized = (speeds[i]! - minVal) / range;
          const y = MIN_HEIGHT + normalized * (MAX_HEIGHT - MIN_HEIGHT);
          points.push({
            x,
            y,
            z,
            speed: speeds[i],
            gusts: gusts[i],
            direction: directions[i],
            dayIndex: i,
          });
        }
      }

      points.forEach((point) => {
        const sphereGeometry = new THREE.SphereGeometry(0.16, 24, 24);
        const sphereMaterial = new THREE.MeshLambertMaterial({
          color: color.hex,
          transparent: true,
          opacity: 0.85,
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(point.x, point.y, point.z);
        group.add(sphere);

        const position = new THREE.Vector3(point.x, point.y, point.z);
        const label = this.createWindLabel(
          point.speed ?? null,
          point.gusts ?? null,
          point.direction ?? null,
          position
        );
        label.userData.dayIndex = point.dayIndex;
        label.userData.basePosition = position.clone();
        label.visible = false;
        labels.push(label);
        group.add(label);
      });
    }

    // Connect with smooth tube
    if (points.length > 1) {
      const curvePoints = points.map((p) => new THREE.Vector3(p.x, p.y, p.z));
      if (points.length >= 3) {
        curvePoints.push(curvePoints[0]);
      }
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeometry = new THREE.TubeGeometry(curve, 72, 0.06, 12, points.length >= 3);
      const tubeMaterial = new THREE.MeshLambertMaterial({
        color: color.hex,
        transparent: true,
        opacity: 0.75,
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      group.add(tube);
    }

    group.userData.dataType = dataType;
    this.scene.add(group);

    this.ringLabels[dataType] = labels;
    return group;
  }

  private clearRings() {
    (['temperature', 'wind'] as const).forEach((type) => {
      if (this.ringMeshes[type] && this.scene) {
        this.scene.remove(this.ringMeshes[type]!);
        this.ringMeshes[type] = null;
      }
      this.ringLabels[type] = [];
    });
  }

  private renderAllRings() {
    this.clearRings();
    if (!this.climateData) return;

    this.ringMeshes.temperature = this.createRing('temperature', 0);
    this.ringMeshes.wind = this.createRing('wind', 1);

    this.updateSceneColors();
    this.updateRingFocus();
  }

  private focusRing(dataType: 'temperature' | 'wind') {
    if (this.focusedRing === dataType) {
      this.focusedRing = null;
    } else {
      this.focusedRing = dataType;
    }
    this.updateRingFocus();
    this.updateLegendStyles();
  }

  private updateRingFocus() {
    (['temperature', 'wind'] as const).forEach((type) => {
      const mesh = this.ringMeshes[type];
      const labels = this.ringLabels[type];
      if (!mesh) return;

      const isFocused = this.focusedRing === type;
      const isDimmed = this.focusedRing !== null && this.focusedRing !== type;

      mesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
          const meshChild = child as THREE.Mesh;
          if (meshChild.geometry.type === 'SphereGeometry') {
            meshChild.userData.targetOpacity = isDimmed ? 0 : 0.85;
          } else if (meshChild.geometry.type === 'TubeGeometry') {
            meshChild.userData.targetOpacity = isDimmed ? 0 : 0.75;
          }
        }
      });

      labels.forEach((label) => {
        label.userData.shouldShow = isFocused;
      });
    });
  }

  private updateLegendStyles() {
    this.querySelectorAll('.legend-item').forEach((item) => {
      const el = item as HTMLElement;
      const type = el.dataset.type;
      el.classList.toggle('focused', this.focusedRing === type);
      el.classList.toggle('dimmed', this.focusedRing !== null && this.focusedRing !== type);
    });
  }

  private setupEventListeners() {
    // Legend click
    this.querySelectorAll('.legend-item').forEach((item) => {
      item.addEventListener('click', () => {
        const type = (item as HTMLElement).dataset.type as 'temperature' | 'wind';
        this.focusRing(type);
      });
    });

    // View mode toggle
    const viewModeToggle = this.querySelector('#viewModeToggle');
    if (viewModeToggle) {
      viewModeToggle.addEventListener('click', () => this.toggleViewMode());
    }

    // Share button
    const shareBtn = this.querySelector('#shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => this.shareCurrentState());
    }

    // Retry button
    const retryBtn = this.querySelector('#retryBtn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.loadData());
    }
  }

  private toggleViewMode() {
    this.isDetailedMode = !this.isDetailedMode;
    localStorage.setItem('viewMode', this.isDetailedMode ? 'detailed' : 'simple');
    this.updateViewModeUI();
    this.renderAllRings();
  }

  private loadViewMode() {
    const savedMode = localStorage.getItem('viewMode');
    this.isDetailedMode = savedMode === 'detailed';
    this.updateViewModeUI();
  }

  private updateViewModeUI() {
    const toggle = this.querySelector('#viewModeToggle');
    const text = this.querySelector('#viewModeText');
    if (toggle && text) {
      toggle.classList.toggle('detailed', this.isDetailedMode);
      text.textContent = this.isDetailedMode ? 'detalhado' : 'simples';
    }
  }

  private async shareCurrentState() {
    const url = window.location.href;
    const shareBtn = this.querySelector('#shareBtn');
    const shareBtnText = this.querySelector('#shareBtnText');

    if (!shareBtn || !shareBtnText) return;

    try {
      await navigator.clipboard.writeText(url);
      shareBtn.classList.add('copied');
      shareBtnText.textContent = 'Copiado!';

      setTimeout(() => {
        shareBtn.classList.remove('copied');
        shareBtnText.textContent = 'Partilhar';
      }, 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      shareBtn.classList.add('copied');
      shareBtnText.textContent = 'Copiado!';

      setTimeout(() => {
        shareBtn.classList.remove('copied');
        shareBtnText.textContent = 'Partilhar';
      }, 2000);
    }
  }

  private animateOpacities() {
    (['temperature', 'wind'] as const).forEach((type) => {
      const mesh = this.ringMeshes[type];
      const labels = this.ringLabels[type];
      if (!mesh) return;

      mesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const meshChild = child as THREE.Mesh;
          const material = meshChild.material as THREE.MeshLambertMaterial;
          if (material && meshChild.userData.targetOpacity !== undefined) {
            const current = material.opacity;
            const target = meshChild.userData.targetOpacity;
            if (Math.abs(current - target) > 0.01) {
              material.opacity += (target - current) * FADE_SPEED;
            } else {
              material.opacity = target;
            }
          }
        }
      });

      labels.forEach((label) => {
        const shouldShow = label.userData.shouldShow;
        const currentOpacity = (label.material as THREE.SpriteMaterial).opacity;
        const targetOpacity = shouldShow ? 1 : 0;

        if (Math.abs(currentOpacity - targetOpacity) > 0.01) {
          (label.material as THREE.SpriteMaterial).opacity += (targetOpacity - currentOpacity) * FADE_SPEED;
          label.visible = (label.material as THREE.SpriteMaterial).opacity > 0.01;
        } else {
          (label.material as THREE.SpriteMaterial).opacity = targetOpacity;
          label.visible = targetOpacity > 0;
        }
      });
    });
  }

  private updateLabelVisibility() {
    if (!this.camera) return;

    const cameraDir = new THREE.Vector3();
    this.camera.getWorldDirection(cameraDir);
    cameraDir.y = 0;
    cameraDir.normalize();

    (['temperature', 'wind'] as const).forEach((type) => {
      const labels = this.ringLabels[type];
      labels.forEach((label) => {
        if (!label.visible) return;

        const labelPos = label.userData.basePosition.clone();
        labelPos.y = 0;
        labelPos.normalize();

        const dot = labelPos.dot(cameraDir);
        const normalized = (dot + 1) / 2;
        const facingOpacity = Math.pow(1 - normalized, 1.5);

        const shouldShow = label.userData.shouldShow;
        const baseOpacity = shouldShow ? 1 : 0;
        (label.material as THREE.SpriteMaterial).opacity = baseOpacity * facingOpacity;
        label.visible = (label.material as THREE.SpriteMaterial).opacity > 0.01;
      });
    });
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    if (this.orbitControls) this.orbitControls.update();
    this.animateOpacities();
    this.updateLabelVisibility();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  private handleResize() {
    const container = this.querySelector('.chart-wrapper') as HTMLElement;
    if (!container || !this.camera || !this.renderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private showLoading(show: boolean) {
    const el = this.querySelector('.chart-loading') as HTMLElement;
    if (el) el.style.display = show ? 'flex' : 'none';
  }

  private showError(show: boolean) {
    const el = this.querySelector('.chart-error') as HTMLElement;
    if (el) el.classList.toggle('show', show);
  }

  private async loadData() {
    this.showLoading(true);
    this.showError(false);
    this.isLoading = true;

    try {
      this.climateData = await this.fetchClimateData();
      this.showLoading(false);
      this.isLoading = false;
      this.renderAllRings();
    } catch (error) {
      console.error('Failed to load climate data:', error);
      this.showLoading(false);
      this.showError(true);
      this.isLoading = false;
      this.updateSceneColors();
    }
  }

  private getFromCache(key: string): ClimateData | null {
    try {
      const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 6 * 60 * 60 * 1000) {
          return data;
        }
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      }
    } catch (e) {
      console.warn('Cache read error:', e);
    }
    return null;
  }

  private saveToCache(key: string, data: ClimateData) {
    try {
      localStorage.setItem(
        `${CACHE_PREFIX}${key}`,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (e) {
      console.warn('Cache write error:', e);
    }
  }

  private async fetchWithRetry(url: string, maxRetries = 3): Promise<unknown> {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(url);
        if (response.status === 429) {
          const waitTime = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
          console.log(`Rate limited. Retrying in ${Math.round(waitTime / 1000)}s...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    }
    throw lastError;
  }

  private async fetchClimateData(): Promise<ClimateData> {
    const today = new Date().toISOString().split('T')[0];

    const cached = this.getFromCache(today);
    if (cached) {
      console.log('Using cached forecast data', today);
      return cached;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.city.latitude}&longitude=${this.city.longitude}&daily=temperature_2m_max,temperature_2m_min,wind_gusts_10m_max,wind_speed_10m_max,wind_direction_10m_dominant,precipitation_sum,shortwave_radiation_sum&models=icon_seamless&timezone=GMT&wind_speed_unit=kn`;
    const data = (await this.fetchWithRetry(url)) as {
      daily: {
        temperature_2m_max: (number | null)[];
        temperature_2m_min: (number | null)[];
        wind_speed_10m_max: (number | null)[];
        wind_gusts_10m_max: (number | null)[];
        wind_direction_10m_dominant: (number | null)[];
        precipitation_sum: (number | null)[];
      };
    };

    const result: ClimateData = {
      temperature: {
        max: data.daily.temperature_2m_max.map((t) => (t !== null ? Math.round(t) : null)),
        min: data.daily.temperature_2m_min.map((t) => (t !== null ? Math.round(t) : null)),
      },
      wind: {
        speed: data.daily.wind_speed_10m_max.map((w) => (w !== null ? Math.round(w) : null)),
        gusts: data.daily.wind_gusts_10m_max.map((g) => (g !== null ? Math.round(g) : null)),
        direction: data.daily.wind_direction_10m_dominant.map((d) => (d !== null ? Math.round(d) : null)),
      },
      precipitation: data.daily.precipitation_sum.map((p) => (p !== null ? Math.round(p * 10) / 10 : null)),
    };

    this.saveToCache(today, result);
    return result;
  }
}

// Register the custom element
if (!customElements.get('tempo-chart')) {
  customElements.define('tempo-chart', TempoChartElement);
}

export { TempoChartElement };
