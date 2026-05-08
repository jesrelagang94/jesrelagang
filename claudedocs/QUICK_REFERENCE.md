# Performance Optimization - Quick Reference Card

**Status:** Phase 1 Complete ✅ | **Next:** Phase 2

---

## Current State (After Phase 1)

### Bundle Sizes
```
JS:  322 KB → 96 KB gzipped → 84 KB brotli
CSS: 300 KB → 50 KB gzipped → 38 KB brotli
Initial Load: ~90 KB (72% reduction from baseline)
```

### Optimizations Active
✅ Route-based lazy loading
✅ Code splitting (3 vendor chunks)
✅ Terser minification
✅ Gzip + Brotli compression
✅ Console statements removed

---

## Quick Commands

```bash
# Development
npm run dev

# Build with optimization
npm run build

# Preview production
npm run preview

# Analyze images
node scripts/optimize-images.js

# View bundle analysis
# After build: open dist/stats.html
```

---

## Phase 2 Quick Actions

### 1. Lazy Load Images (5 min)
```vue
<script setup>
import LazyImage from '@/components/LazyImage.vue'
</script>

<template>
  <LazyImage src="/img/portfolio/1.jpg" alt="Portfolio" />
</template>
```

### 2. Convert Images to WebP (10 min)
1. Go to https://squoosh.app/
2. Upload these 5 images:
   - slider/avatar.png (883 KB)
   - brushes/service/5.png (253 KB)
   - slider/1.jpg (244 KB)
   - intro/light.png (150 KB)
   - intro/dark.png (130 KB)
3. Export as WebP (quality: 85)
4. Replace original files

### 3. Install PurgeCSS (15 min)
```bash
npm install --save-dev @fullhuman/postcss-purgecss
```
Add to vite.config.js (see quick-start-phase2.md)

---

## Impact Summary

| Action | Time | Impact |
|--------|------|--------|
| Lazy load images | 5 min | -500-800ms FCP |
| Convert images to WebP | 10 min | -1.1 MB, -600ms LCP |
| PurgeCSS | 15 min | -200 KB CSS, -500ms LCP |
| **Total Quick Wins** | **30 min** | **~900ms faster** |

---

## Performance Targets

### Current (Phase 1)
- JS: 96 KB gzipped ✅
- CSS: 50 KB gzipped ⚠️
- Images: 2.6 MB ❌

### Target (After Phase 2)
- JS: 70-75 KB gzipped
- CSS: 20-25 KB gzipped
- Images: 1.5 MB
- Lighthouse: 90+

---

## Files to Know

### Configuration
- `vite.config.js` - Build optimization
- `src/router/index.js` - Lazy loading

### Tools
- `src/components/LazyImage.vue` - Lazy loading component
- `scripts/optimize-images.js` - Image analyzer

### Documentation
- `PERFORMANCE.md` - Main summary
- `claudedocs/quick-start-phase2.md` - Implementation guide
- `claudedocs/performance-results.md` - Detailed results
- `dist/stats.html` - Bundle visualizer

---

## Testing Checklist

- [ ] Build completes successfully
- [ ] Bundle sizes acceptable
- [ ] Preview works correctly
- [ ] All images load
- [ ] Animations work
- [ ] Mobile viewport tested
- [ ] Lighthouse audit run
- [ ] Metrics improved

---

## Common Issues

**Issue:** Images not lazy loading
**Fix:** Check browser supports IntersectionObserver

**Issue:** PurgeCSS removes needed styles
**Fix:** Add to safelist in vite.config.js

**Issue:** Swiper breaks after update
**Fix:** Update import: `import { Swiper } from 'swiper/vue'`

---

## Support Resources

**Documentation:**
- Full guide: `claudedocs/performance-optimization-report.md`
- Quick start: `claudedocs/quick-start-phase2.md`
- Results: `claudedocs/performance-results.md`

**Tools:**
- Squoosh: https://squoosh.app/
- Lighthouse: Chrome DevTools
- Bundle analyzer: dist/stats.html (after build)

---

**Next Action:** Implement Phase 2 (30-40 min for quick wins)
