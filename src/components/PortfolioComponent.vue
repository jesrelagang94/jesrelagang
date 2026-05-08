<template>
  <div class="ja_section" id="portfolio">
    <div class="ja_portfolio">
      <div class="container">
        <div class="ja_main_title" data-align="center">
          <span>Portfolio</span>
          <h3>Featured Projects & Work</h3>
          <p>
            Showcasing real-world solutions in N8N automation, full-stack development, mobile apps, and virtual assistant services
          </p>
        </div>
        <div class="portfolio_filter">
          <ul>
            <li v-for="cat in categories" :key="cat.id">
              <a
                class="c-pointer"
                :class="activeCategory === cat.id ? 'current' : ''"
                @click.prevent="filterProjects(cat.id, cat.filter)"
                :data-filter="cat.filter"
              >
                {{ cat.label }}
              </a>
            </li>
          </ul>
        </div>
        <div class="ja_portfolio_titles"></div>
        <div class="portfolio_list wow fadeInUp" data-wow-duration="1s">
          <ul class="gallery_zoom grid">
            <li
              v-for="project in projects"
              :key="project.id"
              :class="`${project.category} grid-item`"
            >
              <div class="inner">
                <div
                  class="entry ja_portfolio_animation_wrap"
                  :data-title="project.title"
                  :data-category="project.categoryLabel"
                >
                  <a
                    class="portfolio_popup c-pointer"
                    href="#"
                    @click.prevent="openProject(project.id)"
                  >
                    <img src="/img/thumbs/42-56.jpg" alt="" aria-hidden="true" />
                    <div
                      class="main"
                      :data-img-url="project.image"
                      :style="`background-image: url('${project.image}')`"
                    ></div>
                  </a>
                </div>
                <div class="mobile_title">
                  <h3>{{ project.title }}</h3>
                  <span>{{ project.categoryLabel }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="brush_1 wow zoomIn" data-wow-duration="1s" aria-hidden="true">
        <img src="/img/brushes/portfolio/1.png" alt="" aria-hidden="true" />
      </div>
      <div class="brush_2 wow fadeInRight" data-wow-duration="1s" aria-hidden="true">
        <img src="/img/brushes/portfolio/2.png" alt="" aria-hidden="true" />
      </div>
    </div>
  </div>

  <!-- Project Detail Modal -->
  <div :class="`${selectedProject ? '' : 'hidden_content'}`">
    <ModalBox :close="closeProject" v-if="selectedProject">
      <div class="popup_details">
        <div class="top_image" @click="openImageViewer">
          <img src="/img/thumbs/4-2.jpg" alt="" aria-hidden="true" />
          <div
            class="main"
            :data-img-url="selectedProject.image"
            :style="`background-image: url('${selectedProject.image}')`"
          ></div>
          <div class="image-viewer-hint">
            <i class="icon-search"></i>
            <span>Click to view fullscreen</span>
          </div>
        </div>
        <div class="portfolio_main_title">
          <h3>{{ selectedProject.title }}</h3>
          <span>
            <a href="#" @click.prevent="">{{ selectedProject.categoryLabel }}</a>
          </span>
          <div></div>
        </div>
        <div class="main_details">
          <div class="textbox">
            <p>{{ selectedProject.description }}</p>
            <div v-if="selectedProject.results" class="results-section">
              <h4>Key Results:</h4>
              <ul class="results-list">
                <li v-for="(result, index) in selectedProject.results" :key="index">
                  <i class="icon-check" aria-hidden="true"></i>
                  {{ result }}
                </li>
              </ul>
            </div>
            <div v-if="selectedProject.technologies" class="tech-stack">
              <h4>Technologies Used:</h4>
              <div class="tech-badges">
                <span
                  v-for="(tech, index) in selectedProject.technologies"
                  :key="index"
                  class="tech-badge"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
          <div class="detailbox">
            <ul>
              <li>
                <span class="first">Client</span>
                <span>{{ selectedProject.client }}</span>
              </li>
              <li>
                <span class="first">Category</span>
                <span>
                  <a href="#" @click.prevent="">{{ selectedProject.categoryLabel }}</a>
                </span>
              </li>
              <li>
                <span class="first">Date</span>
                <span>{{ selectedProject.date }}</span>
              </li>
              <li v-if="selectedProject.link">
                <span class="first">Live Project</span>
                <span>
                  <a :href="selectedProject.link" target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ModalBox>
  </div>

  <!-- Full-Screen Image Viewer -->
  <div v-if="imageViewerOpen" class="image-viewer-overlay" @click="closeImageViewer">
    <div class="image-viewer-container" @click.stop>
      <button class="viewer-close" @click="closeImageViewer" aria-label="Close viewer">
        <i class="icon-cancel"></i>
      </button>

      <div class="viewer-controls">
        <button @click="zoomIn" class="control-btn" aria-label="Zoom in">
          <i class="icon-plus"></i>
        </button>
        <button @click="resetZoom" class="control-btn" aria-label="Reset zoom">
          <i class="icon-target"></i>
        </button>
        <button @click="zoomOut" class="control-btn" aria-label="Zoom out">
          <i class="icon-minus"></i>
        </button>
      </div>

      <div
        class="viewer-image-wrapper"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @wheel="handleWheel"
      >
        <img
          :src="selectedProject.image"
          :alt="selectedProject.title"
          :style="imageStyle"
          draggable="false"
          class="viewer-image"
        />
      </div>

      <div class="viewer-info">
        <p>{{ selectedProject.title }}</p>
        <small>Use mouse wheel to zoom • Drag to pan</small>
      </div>
    </div>
  </div>
</template>

<script>
import ModalBox from "./popup/ModalBox.vue";
import Isotope from "isotope-layout";
import { portfolioData, categories, getProjectById } from "@/data/portfolioData";

export default {
  name: "PortfolioComponent",
  data() {
    return {
      projects: portfolioData,
      categories: categories,
      activeCategory: "all",
      selectedProject: null,
      iso: null,
      imageViewerOpen: false,
      zoom: 1,
      posX: 0,
      posY: 0,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0
    };
  },
  computed: {
    imageStyle() {
      return {
        transform: `translate(${this.posX}px, ${this.posY}px) scale(${this.zoom})`,
        cursor: this.isDragging ? 'grabbing' : 'grab',
        transition: this.isDragging ? 'none' : 'transform 0.3s ease'
      };
    }
  },
  mounted() {
    setTimeout(() => {
      this.iso = new Isotope(".gallery_zoom", {
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
  },
  methods: {
    filterProjects(categoryId, filter) {
      this.activeCategory = categoryId;

      if (this.iso) {
        this.iso.arrange({ filter: filter });
      }
    },
    openProject(projectId) {
      this.selectedProject = getProjectById(projectId);
    },
    closeProject() {
      this.selectedProject = null;
    },
    openImageViewer() {
      this.imageViewerOpen = true;
      this.zoom = 1;
      this.posX = 0;
      this.posY = 0;
      document.body.style.overflow = 'hidden';
    },
    closeImageViewer() {
      this.imageViewerOpen = false;
      this.zoom = 1;
      this.posX = 0;
      this.posY = 0;
      document.body.style.overflow = '';
    },
    zoomIn() {
      this.zoom = Math.min(this.zoom + 0.25, 5);
    },
    zoomOut() {
      this.zoom = Math.max(this.zoom - 0.25, 0.5);
    },
    resetZoom() {
      this.zoom = 1;
      this.posX = 0;
      this.posY = 0;
    },
    handleWheel(e) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      this.zoom = Math.max(0.5, Math.min(5, this.zoom + delta));
    },
    startDrag(e) {
      this.isDragging = true;
      this.dragStartX = e.clientX - this.posX;
      this.dragStartY = e.clientY - this.posY;
    },
    drag(e) {
      if (!this.isDragging) return;
      this.posX = e.clientX - this.dragStartX;
      this.posY = e.clientY - this.dragStartY;
    },
    stopDrag() {
      this.isDragging = false;
    }
  },
  components: { ModalBox },
};
</script>

<style scoped>
/* Results Section */
.results-section {
  margin: 25px 0;
  padding: 20px;
  background: #f9f9f9;
  border-left: 4px solid #C41E3A;
  border-radius: 4px;
}

.results-section h4 {
  margin: 0 0 15px 0;
  color: #C41E3A;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.results-list li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  font-size: 14px;
  line-height: 1.6;
}

.results-list li i {
  color: #1cbe59;
  font-size: 16px;
  flex-shrink: 0;
}

/* Tech Stack */
.tech-stack {
  margin: 25px 0;
}

.tech-stack h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-badge {
  display: inline-block;
  padding: 6px 14px;
  background: linear-gradient(135deg, #C41E3A 0%, #ff6b3d 100%);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Cursor Pointer */
.c-pointer {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .results-section,
  .tech-stack {
    padding: 15px;
  }

  .tech-badge {
    font-size: 11px;
    padding: 5px 12px;
  }
}

/* Image Viewer Hint */
.top_image {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.top_image:hover {
  transform: scale(1.02);
}

.image-viewer-hint {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(247, 80, 35, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.top_image:hover .image-viewer-hint {
  opacity: 1;
}

.image-viewer-hint i {
  font-size: 14px;
}

/* Full-Screen Image Viewer */
.image-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.image-viewer-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.viewer-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  font-size: 24px;
}

.viewer-close:hover {
  background: rgba(247, 80, 35, 0.9);
  border-color: #C41E3A;
  transform: rotate(90deg);
}

.viewer-controls {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
}

.control-btn:hover {
  background: rgba(247, 80, 35, 0.9);
  border-color: #C41E3A;
  transform: scale(1.1);
}

.control-btn i {
  font-size: 18px;
}

.viewer-image-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}

.viewer-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform-origin: center center;
}

.viewer-info {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 15px 30px;
  border-radius: 50px;
  text-align: center;
  z-index: 10;
}

.viewer-info p {
  color: white;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.viewer-info small {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

/* Responsive Image Viewer */
@media (max-width: 768px) {
  .viewer-close {
    width: 40px;
    height: 40px;
    top: 15px;
    right: 15px;
    font-size: 20px;
  }

  .viewer-controls {
    top: 15px;
    padding: 8px;
  }

  .control-btn {
    width: 38px;
    height: 38px;
    font-size: 16px;
  }

  .viewer-info {
    bottom: 15px;
    padding: 12px 20px;
    max-width: 90%;
  }

  .viewer-info p {
    font-size: 14px;
  }

  .viewer-info small {
    font-size: 11px;
  }

  .image-viewer-hint {
    font-size: 11px;
    padding: 6px 12px;
  }
}
</style>
