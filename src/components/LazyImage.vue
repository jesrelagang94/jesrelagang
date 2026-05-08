<template>
  <picture v-if="webpSrc" ref="pictureRef">
    <source
      :srcset="isLoaded ? webpSrc : undefined"
      type="image/webp"
    />
    <img
      ref="imageRef"
      :src="isLoaded ? src : placeholder"
      :srcset="isLoaded && srcset ? srcset : undefined"
      :sizes="sizes"
      :alt="alt"
      :class="[className, { 'lazy-loaded': isLoaded, 'lazy-loading': !isLoaded }]"
      :loading="nativeLazy ? 'lazy' : undefined"
      :width="width"
      :height="height"
      :decoding="decoding"
      :fetchpriority="priority"
      @load="onImageLoad"
      @error="onImageError"
    />
  </picture>
  <img
    v-else
    ref="imageRef"
    :src="isLoaded ? src : placeholder"
    :srcset="isLoaded && srcset ? srcset : undefined"
    :sizes="sizes"
    :alt="alt"
    :class="[className, { 'lazy-loaded': isLoaded, 'lazy-loading': !isLoaded }]"
    :loading="nativeLazy ? 'lazy' : undefined"
    :width="width"
    :height="height"
    :decoding="decoding"
    :fetchpriority="priority"
    @load="onImageLoad"
    @error="onImageError"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLazyImage } from '@/composables/useLazyImage'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  webpSrc: {
    type: String,
    default: ''
  },
  srcset: {
    type: String,
    default: ''
  },
  sizes: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect fill="%23f0f0f0" width="1" height="1"/%3E%3C/svg%3E'
  },
  blurPlaceholder: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  },
  nativeLazy: {
    type: Boolean,
    default: true
  },
  rootMargin: {
    type: String,
    default: '100px'
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  },
  decoding: {
    type: String,
    default: 'async',
    validator: (value) => ['async', 'sync', 'auto'].includes(value)
  },
  priority: {
    type: String,
    default: 'auto',
    validator: (value) => ['high', 'low', 'auto'].includes(value)
  }
})

const emit = defineEmits(['load', 'error'])

const pictureRef = ref(null)

// Use composable for IntersectionObserver-based lazy loading
const { imageRef, isLoaded } = useLazyImage({
  rootMargin: props.rootMargin
})

// Compute actual placeholder (blur or default)
const actualPlaceholder = computed(() => {
  return props.blurPlaceholder || props.placeholder
})

const onImageLoad = (event) => {
  emit('load', event)
}

const onImageError = (event) => {
  emit('error', event)
}
</script>

<style scoped>
img {
  transition: opacity 0.4s ease-in-out, filter 0.4s ease-in-out;
  will-change: opacity, filter;
}

img.lazy-loading {
  opacity: 0.6;
  filter: blur(5px);
}

img.lazy-loaded {
  opacity: 1;
  filter: blur(0);
}

/* Prevent layout shift */
img[width][height] {
  aspect-ratio: attr(width) / attr(height);
}

/* Loading skeleton animation */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

img.lazy-loading {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
</style>
