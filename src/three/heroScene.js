import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Color palette matching 3D model colors
const COLORS = {
  primary: 0xC41E3A,      // Crimson Red (from chair)
  secondary: 0x8B0000,    // Dark Red
  accent: 0x1a1a2e,       // Dark charcoal (from desk)
  cream: 0xfdf8f3,        // Cream background
  darkBg: 0x0a0a0f,       // Dark background
};

class HeroScene {
  constructor(container, isDark = false) {
    this.container = container;
    this.isDark = isDark;
    this.width = container.clientWidth;
    this.height = container.clientHeight;

    // Rotation variables (ajala style)
    this.isDragging = false;
    this.previousMouseX = 0;
    this.targetRotationY = 0;
    this.currentRotationY = 0;
    this.mouseTargetRotationY = 0; // For mouse hover parallax effect

    this.model = null;
    this.pivotGroup = null;
    this.particles = null;
    this.floor = null;
    this.animationId = null;

    this.init();
    this.createLights();
    this.createFloor();
    this.createParticles();
    this.loadModel('/3d_model/low_poly_man_working_at_a_table_with_a_laptop.glb');
    this.setupEventListeners();
    this.animate();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.isDark ? COLORS.darkBg : COLORS.cream);

    // Camera - positioned exactly like ajala (viewing model on the right)
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.set(10, 3, 12);
    this.camera.lookAt(6, 2, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);
  }

  createLights() {
    // Ambient light (brighter)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    // Main directional light with shadows (brighter)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Fill light (white for brightness)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);

    // Front fill light
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
    frontLight.position.set(0, 3, 10);
    this.scene.add(frontLight);
  }

  createFloor() {
    // Floor removed - cleaner look without brown ground
    this.floor = null;
  }

  createParticles() {
    // Particles exactly like ajala
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 60;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = Math.random() * 8;
      positions[i + 2] = (Math.random() - 0.5) * 15;

      // Red particle colors (matching 3D model chair)
      if (Math.random() > 0.5) {
        // Crimson red
        particleColors[i] = 0.77;
        particleColors[i + 1] = 0.12;
        particleColors[i + 2] = 0.23;
      } else {
        // Light red / pink
        particleColors[i] = 0.95;
        particleColors[i + 1] = 0.4;
        particleColors[i + 2] = 0.45;
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      vertexColors: true
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  loadModel(path) {
    const loader = new GLTFLoader();

    // Model position (moved further right)
    const modelPositionX = 10;

    // Create a pivot group for rotation
    this.pivotGroup = new THREE.Group();
    this.pivotGroup.position.set(modelPositionX, 0, 0);
    this.scene.add(this.pivotGroup);

    loader.load(
      path,
      (gltf) => {
        this.model = gltf.scene;

        // Auto-scale the model
        const box = new THREE.Box3().setFromObject(this.model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim; // Smaller model size
        this.model.scale.setScalar(scale);

        // Center the model within the pivot group
        box.setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.x = -center.x;
        this.model.position.y = -center.y + (size.y * scale / 2);
        this.model.position.z = -center.z;

        // Enable shadows on the model
        this.model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.pivotGroup.add(this.model);

        // Handle animations if present
        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.model);
          gltf.animations.forEach((clip) => {
            this.mixer.clipAction(clip).play();
          });
        }

        console.log('Model loaded successfully');
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(1);
        console.log(`Loading model: ${percent}%`);
      },
      (error) => {
        console.error('Error loading model:', error);
        this.createFallbackModel();
      }
    );
  }

  createFallbackModel() {
    // Fallback placeholder if model fails to load
    const group = new THREE.Group();

    const woodMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.primary,
      roughness: 0.7,
      metalness: 0.2
    });

    const fabricMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.secondary,
      roughness: 0.9,
      metalness: 0.1
    });

    // Simple desk placeholder
    const bodyGeometry = new THREE.BoxGeometry(3, 0.2, 1.5);
    const body = new THREE.Mesh(bodyGeometry, woodMaterial);
    body.position.y = 1.5;
    body.castShadow = true;
    group.add(body);

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
    [[-1.4, 0.75, 0.65], [1.4, 0.75, 0.65], [-1.4, 0.75, -0.65], [1.4, 0.75, -0.65]].forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, woodMaterial);
      leg.position.set(...pos);
      leg.castShadow = true;
      group.add(leg);
    });

    // Monitor
    const monitorGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
    const monitor = new THREE.Mesh(monitorGeometry, fabricMaterial);
    monitor.position.set(0, 2.2, 0);
    monitor.castShadow = true;
    group.add(monitor);

    this.model = group;
    this.pivotGroup.add(group);
  }

  setupEventListeners() {
    // Mouse events for rotation (exactly like ajala)
    this.handleMouseDown = (e) => {
      this.isDragging = true;
      this.previousMouseX = e.clientX;
      this.container.style.cursor = 'grabbing';
      e.preventDefault();
    };

    this.handleMouseUp = () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    };

    this.handleMouseMove = (event) => {
      if (this.isDragging) {
        const deltaX = event.clientX - this.previousMouseX;
        this.targetRotationY += deltaX * 0.005; // Normalized slower rotation
        this.previousMouseX = event.clientX;
      } else {
        // Subtle rotation based on mouse position (parallax effect)
        const rect = this.container.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouseTargetRotationY = mouseX * 0.8; // Stronger rotation based on mouse X
      }
    };

    // Touch events for mobile rotation
    this.handleTouchStart = (e) => {
      this.isDragging = true;
      this.previousMouseX = e.touches[0].clientX;
      e.preventDefault();
    };

    this.handleTouchEnd = () => {
      this.isDragging = false;
    };

    this.handleTouchMove = (e) => {
      if (this.isDragging) {
        const deltaX = e.touches[0].clientX - this.previousMouseX;
        this.targetRotationY += deltaX * 0.005; // Normalized slower rotation
        this.previousMouseX = e.touches[0].clientX;
      }
    };

    // Resize
    this.handleResize = () => {
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    };

    // Add event listeners
    this.container.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.container.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('resize', this.handleResize);

    // Set cursor style
    this.container.style.cursor = 'grab';
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Smooth rotation interpolation (normalized speed)
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;
    if (this.pivotGroup) {
      // Combine drag rotation with mouse hover parallax
      const mouseInfluence = this.isDragging ? 0 : this.mouseTargetRotationY * 0.15;
      this.pivotGroup.rotation.y = this.currentRotationY + mouseInfluence;
    }

    // Animate particles (gentle floating)
    if (this.particles) {
      const posArray = this.particles.geometry.attributes.position.array;
      for (let i = 1; i < posArray.length; i += 3) {
        posArray[i] += Math.sin(Date.now() * 0.0005 + i) * 0.001;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // Update animation mixer if exists (slowed down)
    if (this.mixer) {
      this.mixer.update(0.005); // Slower animation playback
    }

    this.renderer.render(this.scene, this.camera);
  }

  setDarkMode(isDark) {
    this.isDark = isDark;
    this.scene.background = new THREE.Color(isDark ? COLORS.darkBg : COLORS.cream);
    if (this.floor) {
      this.floor.material.color.setHex(isDark ? 0x111118 : 0xE8DDD4);
    }
  }

  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.container.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.container.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('resize', this.handleResize);

    if (this.model) {
      this.model.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }

    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }

    if (this.floor) {
      this.floor.geometry.dispose();
      this.floor.material.dispose();
    }

    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

export default HeroScene;
