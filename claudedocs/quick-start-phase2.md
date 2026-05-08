# Phase 2 Quick Start Guide
**Fast implementation guide for next optimization phase**

---

## 1. Image Lazy Loading (5 minutes)

### Step 1: Import LazyImage Component
```vue
<script setup>
import LazyImage from '@/components/LazyImage.vue'
</script>
```

### Step 2: Replace Regular Images
**Before:**
```vue
<img src="/img/portfolio/1.jpg" alt="Portfolio item" class="img-fluid" />
```

**After:**
```vue
<LazyImage
  src="/img/portfolio/1.jpg"
  alt="Portfolio item"
  class-name="img-fluid"
  root-margin="100px"
/>
```

### Example: Portfolio Gallery
```vue
<template>
  <div class="portfolio-grid">
    <LazyImage
      v-for="image in portfolioImages"
      :key="image.id"
      :src="image.src"
      :alt="image.title"
      class-name="portfolio-image"
      @load="onImageLoaded"
    />
  </div>
</template>

<script setup>
import LazyImage from '@/components/LazyImage.vue'

const onImageLoaded = (event) => {
  console.log('Image loaded:', event.target.src)
}
</script>
```

**Expected Impact:** -500-800ms First Contentful Paint

---

## 2. Convert Critical Images to WebP (10 minutes)

### Option A: Manual Conversion (Quick)
1. Use online tool: https://squoosh.app/
2. Upload these 5 images:
   - `public/img/slider/avatar.png` (883 KB → ~250 KB)
   - `public/img/brushes/service/5.png` (253 KB → ~90 KB)
   - `public/img/slider/1.jpg` (244 KB → ~170 KB)
   - `public/img/intro/light.png` (150 KB → ~75 KB)
   - `public/img/intro/dark.png` (130 KB → ~65 KB)
3. Export as WebP (quality: 85)
4. Replace original files or use picture element

### Option B: Automated Conversion (Better)
```bash
# Install sharp
npm install --save-dev sharp

# Edit scripts/optimize-images.js
# Uncomment the conversion code at the bottom

# Run conversion
node scripts/optimize-images.js
```

### Use Picture Element for WebP with Fallback
```vue
<picture>
  <source srcset="/img/slider/avatar.webp" type="image/webp">
  <img src="/img/slider/avatar.png" alt="Avatar">
</picture>
```

**Expected Impact:** -1.1 MB total, -400-600ms LCP

---

## 3. CSS Purging with PurgeCSS (15 minutes)

### Step 1: Install PurgeCSS
```bash
npm install --save-dev @fullhuman/postcss-purgecss
```

### Step 2: Update vite.config.js
Add to existing config:

```javascript
import purgecss from '@fullhuman/postcss-purgecss'

export default defineConfig({
  // ... existing config

  css: {
    postcss: {
      plugins: [
        purgecss({
          content: [
            './index.html',
            './src/**/*.{vue,js,ts,jsx,tsx}',
            './public/**/*.html'
          ],
          // Safelist: Preserve dynamic classes
          safelist: {
            standard: [
              /^swiper/,
              /^wow/,
            /^isotope/,
              /^tilt/,
              /^active$/,
              /^show$/
            ],
            deep: [
              /^swiper-/,
              /^wow-/,
              /^isotope-/
            ],
            greedy: [
              /data-wow/,
              /data-swiper/
            ]
          },
          // Preserve @keyframes, @font-face
          keyframes: true,
          fontFace: true
        })
      ]
    }
  }
})
```

### Step 3: Test Build
```bash
npm run build
# Check dist/assets/index-*.css size
# Should be reduced from 244 KB to ~100-120 KB
```

### Step 4: Test in Browser
```bash
npm run preview
# Verify all styles still work correctly
# Check for missing animations, layouts
```

**Expected Impact:** -150-200 KB CSS, -300-500ms LCP

---

## 4. Font Optimization (10 minutes)

### Check Used Glyphs
1. Search codebase for icon usage:
```bash
grep -r "icon-" src/
grep -r "fontello" src/
```

2. List all used icon classes

### Option A: Font Subsetting (Best)
Use fonttools or online subsetter to include only used glyphs

### Option B: Switch to SVG Icons (Better long-term)
Replace icon font with individual SVG icons for better tree-shaking

### Add font-display (Quick win)
In your CSS file with @font-face:
```css
@font-face {
  font-family: 'fontello';
  src: url('../font/fontello.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* Add this */
}
```

**Expected Impact:** -500 KB with subsetting, improved perceived performance with swap

---

## 5. Update Swiper Library (5 minutes)

### Current State
```json
"swiper": "^8.1.6",
"vue-awesome-swiper": "^5.0.1"
```

### Step 1: Update Swiper
```bash
npm install swiper@latest
```

### Step 2: Remove vue-awesome-swiper
```bash
npm uninstall vue-awesome-swiper
```

### Step 3: Update Import in Components
**Before:**
```javascript
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css'
```

**After:**
```javascript
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
```

**Expected Impact:** -20-30 KB bundle size

---

## Testing Checklist

After each optimization:

- [ ] Run `npm run build` successfully
- [ ] Check bundle sizes in console output
- [ ] Run `npm run preview` and test functionality
- [ ] Check all images load correctly
- [ ] Verify all animations still work
- [ ] Test on mobile viewport
- [ ] Run Lighthouse audit
- [ ] Compare before/after metrics

---

## Lighthouse Testing

### Before Optimization
```bash
# Open DevTools > Lighthouse
# Run audit with:
- Mode: Navigation
- Device: Mobile
- Categories: Performance, Best Practices
```

### After Each Optimization
Run Lighthouse again and compare:
- Performance score
- First Contentful Paint
- Largest Contentful Paint
- Total Blocking Time
- Cumulative Layout Shift

**Target Scores:**
- Performance: 90+
- Best Practices: 95+
- Accessibility: 95+
- SEO: 95+

---

## Quick Wins (30 minutes total)

Do these in order for maximum impact:

1. **Lazy load images** (5 min) → -500ms FCP
2. **Convert top 3 images to WebP** (10 min) → -600 KB
3. **Add font-display: swap** (2 min) → Better perceived performance
4. **Update Swiper** (5 min) → -25 KB
5. **Test with Lighthouse** (5 min) → Verify improvements

**Total time: 27 minutes**
**Total impact: ~900ms faster load, ~625 KB smaller**

---

## Common Issues & Solutions

### Issue: Images not lazy loading
**Solution:** Check that IntersectionObserver is supported
```javascript
if ('IntersectionObserver' in window) {
  // Use lazy loading
} else {
  // Fallback to immediate loading
}
```

### Issue: PurgeCSS removes needed styles
**Solution:** Add to safelist in vite.config.js
```javascript
safelist: {
  standard: [/your-class-pattern/],
}
```

### Issue: Swiper breaks after update
**Solution:** Update import paths
```javascript
// Old (v8)
import { Swiper } from 'vue-awesome-swiper'

// New (v11)
import { Swiper } from 'swiper/vue'
```

### Issue: WebP images not displaying
**Solution:** Use picture element with fallback
```vue
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>
```

---

## Performance Monitoring

### Setup Web Vitals Tracking
```bash
npm install web-vitals
```

```javascript
// src/utils/analytics.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  console.log(metric)
  // Send to your analytics service
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### Track in Production
```vue
// src/main.js
import './utils/analytics'
```

---

## Expected Phase 2 Results

| Metric | Before Phase 2 | After Phase 2 | Improvement |
|--------|----------------|---------------|-------------|
| **JS Bundle** | 96 KB gzipped | 70-75 KB | -22-27% |
| **CSS Bundle** | 50 KB gzipped | 20-25 KB | -50-60% |
| **Images (critical)** | 1.6 MB | 500-700 KB | -56-69% |
| **Fonts** | 350 KB | 50-100 KB | -71-86% |
| **FCP** | 1.2-1.5s | 0.7-1.0s | -42-50% |
| **LCP** | 2.0-2.5s | 1.2-1.5s | -40-52% |
| **Lighthouse** | 75-80 | 90-95 | +13-20% |

---

## Next Steps After Phase 2

1. **Critical CSS extraction** - Inline above-the-fold styles
2. **Service Worker** - Add offline support and caching
3. **Responsive images** - Generate multiple image sizes
4. **Preload/prefetch** - Resource hints for critical assets
5. **HTTP/2 optimization** - Server push configuration
6. **CDN integration** - Move static assets to CDN

---

## Resources

**Tools:**
- [Squoosh](https://squoosh.app/) - Image optimization
- [Font Subsetter](https://everythingfonts.com/subsetter) - Font subsetting
- [PurgeCSS](https://purgecss.com/) - Remove unused CSS
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing

**Documentation:**
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Vue Performance](https://vuejs.org/guide/best-practices/performance.html)
- [Web.dev](https://web.dev/performance/) - Performance best practices
