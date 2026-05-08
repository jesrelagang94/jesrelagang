# Visual Assets Transformation Guide

This guide outlines the visual elements that need updating to reflect the multi-discipline developer brand transformation.

---

## HERO SECTION SKILL BADGES

### Current Badges (HomeComponent.vue, lines 93-109)
The hero section currently displays three floating skill badges around the avatar:
1. Adobe Illustrator (ai) - Design tool
2. Adobe Photoshop (ps) - Design tool
3. Figma (figma) - Design tool

### Recommended Replacement Badges

#### Option A: Technical Tools Focus
1. **N8N** - Workflow automation platform
   - Icon style: N8N logo or automation/workflow icon
   - Color scheme: Match N8N brand colors (#EA4B71 pink/red or #FF6D5A)
   - Alternative: Generic automation icon (gears, nodes connected)

2. **Vue.js / React** - JavaScript frameworks
   - Icon style: Vue logo (green) or React logo (blue)
   - Color scheme: Vue green (#42b883) or React blue (#61dafb)
   - Alternative: JavaScript logo if showcasing both

3. **Mobile Development** - iOS/Android
   - Icon style: Smartphone/mobile device icon
   - Color scheme: Multi-color or platform-specific
   - Alternative: iOS Swift logo or Android logo

#### Option B: Capability Categories
1. **Automation** - Workflow/Integration focus
   - Icon: Connected nodes, flowchart, or automation symbol
   - Color: Orange/red (#ff6d5a)

2. **Web Development** - Full-stack capabilities
   - Icon: Code brackets, browser window, or </> symbol
   - Color: Green (#1cbe59)

3. **Mobile Apps** - Cross-platform development
   - Icon: Mobile devices, app grid, or smartphone
   - Color: Purple (#8067f0)

### SVG Icon Resources

**Free Icon Libraries:**
- **Simple Icons** (https://simpleicons.org/) - Brand logos (N8N, Vue, React, etc.)
- **Heroicons** (https://heroicons.com/) - General tech icons
- **Feather Icons** (https://feathericons.com/) - Minimal line icons
- **Font Awesome** (free version) - Comprehensive icon set

**Recommended Icons:**
```
N8N/Automation:
- Icon name: "workflow" or "share-2" (connected nodes)
- Alternative: Custom N8N logo from Simple Icons

Web Development:
- Icon name: "code" or "terminal" or "monitor"
- Alternative: Vue logo from Simple Icons

Mobile Development:
- Icon name: "smartphone" or "device-mobile"
- Alternative: Combined iOS/Android icon
```

### Implementation Notes

The hero section uses inline SVG through the `svg.js` file:
- **File location:** `C:\laragon\www\jesrelagang\src\svg.js`
- **Current exports:** `ai, figma, mouse, mouseDark, ps`
- **Required changes:** Replace `ai`, `ps`, `figma` exports with new SVG content

**Example structure in svg.js:**
```javascript
export const n8n = `<svg viewBox="0 0 24 24" fill="currentColor">
  <!-- SVG path data here -->
</svg>`;

export const vuejs = `<svg viewBox="0 0 24 24" fill="currentColor">
  <!-- SVG path data here -->
</svg>`;

export const mobile = `<svg viewBox="0 0 24 24" fill="currentColor">
  <!-- SVG path data here -->
</svg>`;
```

Then update HomeComponent.vue imports:
```javascript
import { n8n, vuejs, mobile, mouse, mouseDark } from "../svg";
```

And update the template bindings:
```vue
<span class="skills n8n anim_moveBottom" v-html="n8n"></span>
<span class="skills vuejs anim_moveBottom" v-html="vuejs"></span>
<span class="skills mobile anim_moveBottom" v-html="mobile"></span>
```

---

## SERVICE SECTION ICONS

### Current Service Icons (ServiceCompoent.vue)
Each service card displays an icon from `/public/img/svg/service/`:
1. **anchor.svg** - Creative Design
2. **physics.svg** - Graphic Design
3. **contact.svg** - UI/UX Design
4. **web.svg** - Web Design

### Recommended Replacement Icons

#### Service 1: N8N Automation & Workflow Design
**Current:** anchor.svg
**Replace with:** `workflow.svg` or `automation.svg`
**Description:** Connected nodes, flowchart, or automation gear system
**Icon suggestions:**
- Workflow/nodes connected with lines
- Automation symbol (gear with arrows)
- Integration symbol (puzzle pieces connecting)

#### Service 2: Full-Stack Web Development
**Current:** physics.svg
**Replace with:** `code.svg` or `fullstack.svg`
**Description:** Code brackets, terminal window, or layered stack
**Icon suggestions:**
- `</>` code brackets
- Terminal/command line window
- Layered stack (frontend/backend/database)

#### Service 3: Mobile App Development
**Current:** contact.svg
**Replace with:** `mobile.svg` or `smartphone.svg`
**Description:** Smartphone device, app interface, or mobile platforms
**Icon suggestions:**
- Smartphone outline with app grid
- iOS and Android devices side by side
- Mobile device with code/wrench overlay

#### Service 4: Software Engineering & Architecture
**Current:** web.svg (can potentially keep)
**Replace with:** `architecture.svg` or `engineering.svg`
**Description:** System diagram, building blocks, or blueprint
**Icon suggestions:**
- System architecture diagram (boxes and arrows)
- Blueprint/technical drawing style
- Building blocks or modular structure

#### Service 5 (Optional): Virtual Assistant & Automation Support
**New addition**
**Icon needed:** `support.svg` or `assistant.svg`
**Description:** Headset, support agent, or helping hand with tech
**Icon suggestions:**
- Headset with microphone
- Support/help icon with automation element
- Calendar/task management icon

### Creating/Finding Icons

**Option 1: Use existing icons**
Check if your template includes additional icons in:
- `C:\laragon\www\jesrelagang\public\img\svg\service\`
- Or other subdirectories under `/public/img/svg/`

**Option 2: Download from icon libraries**
1. Visit free icon sites (see "SVG Icon Resources" above)
2. Search for relevant icons
3. Download as SVG format
4. Place in `/public/img/svg/service/` directory
5. Update `src` paths in ServiceCompoent.vue

**Option 3: Create custom icons**
- Use Figma, Adobe Illustrator, or Inkscape
- Keep style consistent (line weight, corner radius, overall feel)
- Export as optimized SVG
- Ensure viewBox is set correctly for scaling

---

## BACKGROUND BRUSHES & DECORATIVE ELEMENTS

### Service Section Brushes
**Location:** `C:\laragon\www\jesrelagang\public\img\brushes\service\`

Current brushes are design/artistic themed. Consider whether they fit the new technical brand:
- **Keep if:** Abstract, minimal, or neutral decorative elements
- **Replace if:** Obviously design-focused (paintbrushes, artistic splatters, etc.)

**Replacement suggestions:**
- Geometric patterns (hexagons, circuits, network nodes)
- Subtle tech-themed patterns (binary code, circuit boards)
- Abstract geometric shapes in brand colors
- Grid or matrix-style backgrounds

### About Section Image
**Location:** `C:\laragon\www\jesrelagang\public\img\about\`

Current image may reflect designer aesthetic. Consider:
- Professional headshot with tech environment background
- Image with laptop, code, or development tools
- Office/workspace setting that reflects developer lifestyle
- Maintain professional, approachable appearance

---

## SKILLS SECTION IMAGE

### Current Image (SkillComponent.vue)
**Location:** `C:\laragon\www\jesrelagang\public\img\skills\`

Shows design-focused imagery. Recommendations:
- **Development workspace:** Laptop with code editor, multiple monitors
- **Technical setup:** Modern desk with development tools visible
- **Abstract tech:** Code snippets, terminal windows, or API diagrams
- **Professional portrait:** Developer in working environment

**Image requirements:**
- Should support light theme (1.jpg) and dark theme (2.jpg) versions
- High quality, professional appearance
- Clearly reflects technical/development focus
- Maintains visual consistency with overall design

---

## SERVICE MODAL IMAGES

### Current Images (ServiceCompoent.vue)
**Location:** `C:\laragon\www\jesrelagang\public\img\service\`

Files: 1.jpg, 2.jpg, 3.jpg, 4.jpg (potentially 5.jpg for new service)

Each service modal displays a featured image. Recommendations:

#### Image 1: N8N Automation
**Subject matter:**
- N8N workflow editor interface screenshot
- Flowchart/workflow visualization
- Integration/connection diagram
**Alternative:** Abstract automation concept (gears, connected systems)

#### Image 2: Full-Stack Web Development
**Subject matter:**
- Modern web application interface
- Code editor with web project
- Responsive web design mockup across devices
**Alternative:** Clean, modern web dashboard or application

#### Image 3: Mobile App Development
**Subject matter:**
- Mobile app interfaces on iOS/Android devices
- App store screenshots
- Mobile development environment
**Alternative:** Hand holding smartphone with polished app interface

#### Image 4: Software Engineering & Architecture
**Subject matter:**
- System architecture diagram
- Code quality metrics dashboard
- Technical documentation or blueprint
**Alternative:** Clean, professional development environment

#### Image 5: Virtual Assistant & Automation (Optional)
**Subject matter:**
- Productivity tools interface
- Task management system
- Calendar and communication tools
**Alternative:** Professional workspace with organization tools

### Image Specifications
- **Dimensions:** Check existing images for size requirements (likely 800x600 or similar)
- **Format:** JPG for photos, PNG for screenshots with transparency needs
- **Quality:** High resolution, professional appearance
- **Consistency:** Similar visual style across all service images
- **Licensing:** Use stock photos with appropriate licenses or create original screenshots

---

## PORTFOLIO/PROJECT IMAGES (Future Consideration)

If you add a portfolio section, you'll need:
- Screenshots of N8N workflows (anonymized client work)
- Web application demos (responsive views)
- Mobile app screenshots (iOS and Android)
- Code samples or architecture diagrams

**Best practices:**
- Use device mockups (laptop, phone frames) for context
- Show actual work when possible (with client permission)
- Maintain consistent presentation style
- Include brief captions explaining technology used

---

## COLOR PALETTE CONSISTENCY

### Current Accent Colors
Based on existing progress bars and elements:
- Orange/Red: #f75023 (Illustrator) → Repurpose for Automation/N8N
- Green: #1cbe59 (Photoshop) → Repurpose for Web Development
- Purple: #8067f0 (Figma) → Repurpose for Mobile Development

### Recommended Color Assignments

**N8N & Automation:**
- Primary: #ff6d5a (warm orange-red)
- Represents: Energy, action, transformation

**Full-Stack Web Development:**
- Primary: #1cbe59 (vibrant green)
- Represents: Growth, scalability, success

**Mobile & Software Engineering:**
- Primary: #8067f0 (rich purple)
- Represents: Innovation, quality, sophistication

**Additional accent:**
- Orange: #ff9800 (for Database/API elements)

### Applying Colors
Ensure new icons, images, and visual elements incorporate these colors for brand consistency:
- Use in icon fills/strokes
- Apply to decorative elements
- Maintain in progress bars and UI elements
- Consider in background brushes and patterns

---

## FAVICON & BROWSER ASSETS

### Current Favicon
Likely reflects designer brand. Consider updating:

**New favicon options:**
- Monogram "JA" with developer aesthetic
- Abstract tech symbol (code brackets, nodes)
- Minimal icon representing automation/development

**Required sizes:**
- favicon.ico (16x16, 32x32, 48x48)
- apple-touch-icon.png (180x180)
- android-chrome icons (192x192, 512x512)
- og:image for social sharing (1200x630)

### Social Media Images

**Open Graph / Twitter Card images:**
- Create professional banner (1200x630px)
- Include name and tagline
- Professional headshot or branded visual
- Consistent with overall brand aesthetic

---

## ASSET SOURCING CHECKLIST

### Free Stock Photo Resources
- **Unsplash** (https://unsplash.com/) - High-quality free photos
  - Search: "developer", "code", "workspace", "technology"
- **Pexels** (https://pexels.com/) - Free stock photos and videos
- **StockSnap** (https://stocksnap.io/) - Free high-resolution images

### Icon Resources (Repeated for Reference)
- **Simple Icons** - Brand/logo icons
- **Heroicons** - UI/tech icons (free, MIT license)
- **Feather Icons** - Minimal line icons
- **Font Awesome** - Comprehensive icon library

### Screenshot/Mockup Tools
- **Screely** (https://screely.com/) - Browser window mockups
- **Mockuphone** (https://mockuphone.com/) - Device mockups
- **Figma** - Create custom mockups and screenshots

### Design Tools for Asset Creation
- **Figma** (free tier) - Icon and graphic design
- **Inkscape** (free) - Vector graphics editor
- **GIMP** (free) - Raster image editor
- **Canva** (free tier) - Quick graphics and social media images

---

## IMPLEMENTATION PRIORITY

### Phase 1: Critical Visual Updates
1. Hero section skill badges (N8N, Vue/React, Mobile)
2. Service section icons (all 4-5 services)
3. About section image (if strongly design-focused)

### Phase 2: Supporting Visuals
4. Service modal images
5. Skills section image
6. Background brushes (if necessary)

### Phase 3: Branding Assets
7. Favicon and app icons
8. Social media sharing images
9. Portfolio screenshots (if adding portfolio section)

---

## QUICK REFERENCE: FILE LOCATIONS

### Images
```
Hero section:
- Avatar: /public/img/slider/avatar.png
- Background: /public/img/slider/1.jpg, /public/img/slider/2.jpg

About section:
- Main image: /public/img/about/1.jpg (light), /public/img/about/2.jpg (dark)

Skills section:
- Main image: /public/img/skills/1.jpg (light), /public/img/skills/2.jpg (dark)

Service icons:
- Directory: /public/img/svg/service/
- Files: anchor.svg, physics.svg, contact.svg, web.svg

Service modal images:
- Directory: /public/img/service/
- Files: 1.jpg, 2.jpg, 3.jpg, 4.jpg

Background brushes:
- About: /public/img/brushes/about/
- Service: /public/img/brushes/service/
```

### SVG Code
```
Hero badges: src/svg.js
- Exports: ai, ps, figma (to be replaced with n8n, vuejs, mobile)
```

---

## TIPS FOR VISUAL CONSISTENCY

1. **Maintain icon style:** If current icons are line-based, keep new icons line-based
2. **Color harmony:** Use the recommended color palette consistently
3. **Image quality:** All images should be high-resolution, professional
4. **Theme support:** Remember to provide both light and dark theme versions where needed
5. **File optimization:** Compress images for web performance (use tools like TinyPNG)
6. **Accessibility:** Ensure sufficient color contrast, provide alt text
7. **Scalability:** Test icons and images at various screen sizes

---

## TESTING CHECKLIST

After implementing visual changes:
- [ ] All icons display correctly on light theme
- [ ] All icons display correctly on dark theme
- [ ] Hero badges animate properly
- [ ] Service icons load without errors
- [ ] Modal images display correctly
- [ ] Images are responsive across devices
- [ ] No broken image links
- [ ] File sizes are optimized (page loads quickly)
- [ ] Visual consistency maintained throughout site
- [ ] Alt text provided for accessibility

---

**Document Version:** 1.0
**Last Updated:** 2025-10-09
**Purpose:** Visual asset transformation guide for multi-discipline developer rebrand
**Estimated Implementation Time:**
- Phase 1 (critical): 2-4 hours
- Phase 2 (supporting): 3-5 hours
- Phase 3 (branding): 1-2 hours
