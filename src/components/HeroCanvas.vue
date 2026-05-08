<template>
  <div ref="canvasContainer" class="hero-canvas-container"></div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import HeroScene from '../three/heroScene';

export default {
  name: 'HeroCanvas',
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const canvasContainer = ref(null);
    let heroScene = null;

    onMounted(() => {
      if (canvasContainer.value) {
        heroScene = new HeroScene(canvasContainer.value, props.dark);
      }
    });

    onUnmounted(() => {
      if (heroScene) {
        heroScene.dispose();
        heroScene = null;
      }
    });

    watch(() => props.dark, (newVal) => {
      if (heroScene) {
        heroScene.setDarkMode(newVal);
      }
    });

    return {
      canvasContainer
    };
  }
};
</script>

<style scoped>
.hero-canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: auto;
}

.hero-canvas-container canvas {
  display: block;
}
</style>
