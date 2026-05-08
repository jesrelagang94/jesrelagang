# Content Customization Guide - Jesrel Agang Portfolio

This guide helps you customize the remaining template content with your personal information.

---

## 📊 **About Section** (AboutComponent.vue:12-20)

### Years of Experience Counter
**Current**: 18 years
**Location**: src/components/AboutComponent.vue, line 12
**Update to**: Your actual years of development experience

### Total Projects Counter
**Current**: 9K projects
**Location**: src/components/AboutComponent.vue, line 20
**Update to**: Your actual completed project count

---

## 🔗 **Social Media Links** (HomeComponent.vue:34-47)

**Current**: All links are placeholders (`#`)
**Location**: src/components/HomeComponent.vue, lines 34-47

### Links to Update:
- **Facebook**: Line 36 - Replace `href="#"` with your Facebook profile URL
- **Twitter**: Line 39 - Replace `href="#"` with your Twitter/X profile URL
- **LinkedIn**: Line 42 - Replace `href="#"` with your LinkedIn profile URL
- **Behance**: Line 45 - Replace `href="#"` or change to GitHub/other platform

**Example**:
```vue
<a href="https://linkedin.com/in/jesrelagang"><i class="icon-linkedin-1"></i></a>
```

---

## 🛠️ **Skills Section** (SkillComponent.vue:12-59)

**Current Skills**: Illustrator (85%), Photoshop (95%), Figma (75%)
**Location**: src/components/SkillComponent.vue

### Replace with Your Tech Stack:
Examples for full-stack developer:
- **JavaScript/TypeScript** - 90%
- **Vue.js/React** - 85%
- **Node.js/Express** - 80%
- **PHP/Laravel** - 75%
- **MySQL/PostgreSQL** - 85%
- **Git/Docker** - 80%

**Color Codes** (data-color):
- `#f75023` - Orange/Red
- `#1cbe59` - Green
- `#8067f0` - Purple
- `#ffb400` - Yellow (suggested)

---

## 💼 **Services Section** (ServiceCompoent.vue)

**Current Services**: Creative Design, Graphic Design, UI/UX Design, Web Design
**Pricing**: $99, $199, $299, $399

### Update to Your Services:
Examples:
1. **Full-Stack Development** - Custom web applications
2. **Frontend Development** - React/Vue.js applications
3. **Backend Development** - API & database design
4. **E-commerce Solutions** - Online stores & payment integration

**Files to Update**:
- src/components/ServiceCompoent.vue (lines 36, 76, 145, 215)
- Update service titles, descriptions, and pricing
- Replace `/public/img/service/1-4.jpg` with your project screenshots

---

## 📁 **Portfolio Projects** (PortfolioComponent.vue)

**Current Projects**: Template examples with YouTube/Vimeo/Soundcloud embeds
**Location**: src/components/PortfolioComponent.vue

### Project Categories:
- **All** - Show everything
- **Youtube** - Video demos
- **Vimeo** - Alternative video platform
- **Soundcloud** - Audio projects
- **Popup** - Image galleries
- **Detail** - Detailed project pages

### How to Customize:
1. Replace project titles (lines 78, 103, 128, 153, 178, 203)
2. Update category names to match your work (Web Apps, Mobile, etc.)
3. Replace image paths:
   - `/public/img/portfolio/1.jpg` through `/public/img/portfolio/6.jpg`
4. Update video IDs or remove video categories if not needed

**Example Project**:
```vue
<div class="entry ja_portfolio_animation_wrap"
     data-title="E-Commerce Platform"
     data-category="Web App">
```

---

## 📝 **Blog/News Section** (NewsComponent.vue)

**Current Posts**: 3 placeholder blog posts
**Location**: src/components/NewsComponent.vue

### Blog Posts to Update:
1. **Post 1** (line 32):
   - Title: "Jim Morisson Says when the musics over turn off the light"
   - Category: Web Development
   - Date: 23 Dec

2. **Post 2** (line 64):
   - Title: "How to be appreciated for your hard work as a developer"
   - Category: Branding

3. **Post 3** (line 98):
   - Title: "How designers and developers can collaborate better"
   - Category: Social Media

### Customization Steps:
1. Update blog post titles (lines 33-36, 65-68, 99-101)
2. Change categories to your topics
3. Update dates (lines 17-18, 51-52, 83-84)
4. Replace blog content in popup modals (lines 134-153, 175-194, 216-235)
5. Replace `/public/img/news/1-3.jpg` with your blog featured images

---

## 🖼️ **Images to Replace**

### Priority Images:
1. **Profile/Avatar**: `/public/img/slider/avatar.png`
2. **Hero Background**: `/public/img/slider/1.jpg` (light), `/public/img/slider/2.jpg` (dark)
3. **About Section**: `/public/img/skills/1.jpg` (light), `/public/img/skills/2.jpg` (dark)
4. **Portfolio Items**: `/public/img/portfolio/1-6.jpg`
5. **Service Screenshots**: `/public/img/service/1-4.jpg`
6. **Blog Images**: `/public/img/news/1-3.jpg`

### Image Specifications:
- **Avatar**: 400x400px PNG with transparent background
- **Hero Background**: 1920x1080px JPG
- **Portfolio**: Various sizes (check existing thumbs folder)
- **Quality**: High-resolution, optimized for web

---

## 🎨 **Color Customization** (Optional)

**CSS File**: `public/css/colors.css`

### Current Color Scheme:
- **Orange**: `#f75023` - Primary accent
- **Green**: `#1cbe59` - Success/secondary
- **Purple**: `#8067f0` - Tertiary accent

### How to Change:
1. Open `public/css/colors.css`
2. Search and replace color hex codes
3. Maintain consistent color usage across sections

---

## ✅ **Quick Start Checklist**

- [ ] Update years of experience counter (AboutComponent.vue:12)
- [ ] Update total projects counter (AboutComponent.vue:20)
- [ ] Add social media links (HomeComponent.vue:34-47)
- [ ] Replace skills with your tech stack (SkillComponent.vue)
- [ ] Update service offerings (ServiceCompoent.vue)
- [ ] Add portfolio projects (PortfolioComponent.vue)
- [ ] Customize blog posts or remove section (NewsComponent.vue)
- [ ] Replace all images with personal photos/screenshots
- [ ] Update email to your actual email (already set to jesrelagang@gmail.com)
- [ ] Test all links and navigation

---

## 🚀 **Next Steps**

1. **Content First**: Update text content in components
2. **Images Second**: Replace placeholder images with your assets
3. **Test Locally**: Run `npm run dev` to preview changes
4. **Build for Production**: Run `npm run build` when ready
5. **Deploy**: Upload to your hosting provider

---

## 📞 **Need Help?**

If you need assistance customizing specific sections, refer to:
- **Vue 3 Documentation**: https://vuejs.org/guide/
- **Component Structure**: Each `.vue` file has `<template>`, `<script>`, `<style>` sections
- **Path References**: All image paths start with `/public/` for Vite compatibility

---

**Generated**: 2025-10-09
**Portfolio**: Jesrel Agang - Full-Stack Developer
