<template>
  <div class="projects-page">
    <div class="page-header">
      <h2>Project Management</h2>
      <button class="btn-primary" @click="showModal = true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        New Project
      </button>
    </div>

    <div class="projects-grid">
      <div v-if="loading" class="loading">Loading projects...</div>
      <div v-else-if="projects.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
        <h3>No Projects Yet</h3>
        <p>Create your first project to get started</p>
        <button @click="showModal = true" class="btn-primary">Create Project</button>
      </div>
      <div v-else v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-header">
          <span :class="['status-dot', project.status]"></span>
          <span class="project-status">{{ project.status }}</span>
        </div>
        <h3>{{ project.name }}</h3>
        <p>{{ project.description || 'No description' }}</p>
        <div class="project-meta">
          <span>{{ project.client || 'No client' }}</span>
          <span>${{ project.budget?.toLocaleString() || 0 }}</span>
        </div>
        <div class="project-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (project.progress || 0) + '%' }"></div>
          </div>
          <span>{{ project.progress || 0 }}%</span>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>New Project</h2>
          <button @click="showModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="saveProject">
          <div class="form-body">
            <div class="form-group">
              <label>Project Name *</label>
              <input type="text" v-model="formData.name" required />
            </div>
            <div class="form-group">
              <label>Client</label>
              <input type="text" v-model="formData.client" />
            </div>
            <div class="form-group">
              <label>Budget ($)</label>
              <input type="number" v-model.number="formData.budget" />
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="formData.status">
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="formData.description" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showModal = false" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  name: 'ProjectsView',
  setup() {
    const projects = ref([]);
    const loading = ref(true);
    const showModal = ref(false);
    const formData = reactive({ name: '', client: '', budget: 0, status: 'planning', description: '' });

    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        projects.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.error('Error:', err);
      } finally {
        loading.value = false;
      }
    };

    const saveProject = async () => {
      try {
        await addDoc(collection(db, 'projects'), { ...formData, progress: 0, createdAt: serverTimestamp() });
        showModal.value = false;
        Object.assign(formData, { name: '', client: '', budget: 0, status: 'planning', description: '' });
        fetchProjects();
      } catch (err) {
        console.error('Error:', err);
      }
    };

    onMounted(fetchProjects);
    return { projects, loading, showModal, formData, saveProject };
  }
};
</script>

<style scoped>
.projects-page { display: flex; flex-direction: column; gap: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; }
.page-header h2 { margin: 0; font-size: 20px; color: #1a1a2e; }
.btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #C41E3A; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
.btn-primary:hover { background: #a01830; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.loading, .empty-state { grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #666; }
.empty-state svg { margin-bottom: 16px; color: #ccc; }
.empty-state h3 { margin: 0 0 8px; font-size: 18px; color: #1a1a2e; }
.empty-state p { margin: 0 0 20px; }
.project-card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
.project-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; }
.status-dot.planning { background: #f59e0b; }
.status-dot.in-progress { background: #3b82f6; }
.status-dot.completed { background: #10b981; }
.status-dot.on-hold { background: #6b7280; }
.project-status { font-size: 12px; text-transform: capitalize; color: #666; }
.project-card h3 { margin: 0 0 8px; font-size: 16px; color: #1a1a2e; }
.project-card p { margin: 0 0 16px; font-size: 14px; color: #666; line-height: 1.5; }
.project-meta { display: flex; justify-content: space-between; font-size: 13px; color: #888; margin-bottom: 12px; }
.project-progress { display: flex; align-items: center; gap: 12px; }
.progress-bar { flex: 1; height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: #C41E3A; border-radius: 3px; transition: width 0.3s; }
.project-progress span { font-size: 13px; color: #666; min-width: 36px; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 500px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0; }
.modal-header h2 { margin: 0; font-size: 18px; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #999; }
.form-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 14px; font-weight: 500; }
.form-group input, .form-group select, .form-group textarea { padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #C41E3A; }
.modal-actions { display: flex; gap: 12px; padding: 20px 24px; border-top: 1px solid #f0f0f0; justify-content: flex-end; }
.btn-secondary { padding: 10px 20px; background: #f3f4f6; color: #666; border: none; border-radius: 8px; cursor: pointer; }
</style>
