/**
 * Composable for lazy loading images with IntersectionObserver
 * Improves initial page load performance by deferring off-screen images
 *
 * Usage:
 * import { useLazyImage } from '@/composables/useLazyImage'
 * const { imageRef, isLoaded } = useLazyImage()
 *
 * <img ref="imageRef" :src="isLoaded ? actualSrc : placeholder" />
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useLazyImage(options = {}) {
  const imageRef = ref(null)
  const isLoaded = ref(false)
  let observer = null

  const {
    root = null,
    rootMargin = '50px',
    threshold = 0.01
  } = options

  onMounted(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      isLoaded.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isLoaded.value = true
            if (observer && imageRef.value) {
              observer.unobserve(imageRef.value)
            }
          }
        })
      },
      {
        root,
        rootMargin,
        threshold
      }
    )

    if (imageRef.value) {
      observer.observe(imageRef.value)
    }
  })

  onUnmounted(() => {
    if (observer && imageRef.value) {
      observer.unobserve(imageRef.value)
      observer.disconnect()
    }
  })

  return {
    imageRef,
    isLoaded
  }
}
