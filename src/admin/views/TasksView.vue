<template>
  <div class="tasks-page">
    <div class="page-header">
      <h2>Task Management</h2>
      <button class="btn-primary" @click="showModal = true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add Task
      </button>
    </div>

    <div class="kanban-board">
      <div v-for="column in columns" :key="column.id" class="kanban-column">
        <div class="column-header">
          <h3>{{ column.title }}</h3>
          <span class="task-count">{{ getTasksByStatus(column.id).length }}</span>
        </div>
        <div class="task-list">
          <div v-for="task in getTasksByStatus(column.id)" :key="task.id" class="task-card" @click="editTask(task)">
            <div class="task-priority" :class="task.priority"></div>
            <h4>{{ task.title }}</h4>
            <p>{{ task.description || 'No description' }}</p>
            <div class="task-footer">
              <span class="task-project">{{ task.project || 'No project' }}</span>
              <span class="task-due" v-if="task.dueDate">{{ formatDate(task.dueDate) }}</span>
            </div>
          </div>
          <div v-if="getTasksByStatus(column.id).length === 0" class="empty-column">
            No tasks
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editingTask ? 'Edit Task' : 'New Task' }}</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="saveTask">
          <div class="form-body">
            <div class="form-group">
              <label>Title *</label>
              <input type="text" v-model="formData.title" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Status</label>
                <select v-model="formData.status">
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div class="form-group">
                <label>Priority</label>
                <select v-model="formData.priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Due Date</label>
              <input type="date" v-model="formData.dueDate" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="formData.description" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">{{ editingTask ? 'Update' : 'Create' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  name: 'TasksView',
  setup() {
    const tasks = ref([]);
    const showModal = ref(false);
    const editingTask = ref(null);
    const columns = [
      { id: 'todo', title: 'To Do' },
      { id: 'in-progress', title: 'In Progress' },
      { id: 'review', title: 'Review' },
      { id: 'done', title: 'Done' }
    ];
    const formData = reactive({ title: '', status: 'todo', priority: 'medium', dueDate: '', description: '' });

    const getTasksByStatus = (status) => tasks.value.filter(t => t.status === status);
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const fetchTasks = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'tasks'));
        tasks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.error('Error:', err);
      }
    };

    const closeModal = () => {
      showModal.value = false;
      editingTask.value = null;
      Object.assign(formData, { title: '', status: 'todo', priority: 'medium', dueDate: '', description: '' });
    };

    const editTask = (task) => {
      editingTask.value = task;
      Object.assign(formData, task);
      showModal.value = true;
    };

    const saveTask = async () => {
      try {
        if (editingTask.value) {
          await updateDoc(doc(db, 'tasks', editingTask.value.id), { ...formData, updatedAt: serverTimestamp() });
        } else {
          await addDoc(collection(db, 'tasks'), { ...formData, createdAt: serverTimestamp() });
        }
        closeModal();
        fetchTasks();
      } catch (err) {
        console.error('Error:', err);
      }
    };

    onMounted(fetchTasks);
    return { tasks, columns, showModal, editingTask, formData, getTasksByStatus, formatDate, closeModal, editTask, saveTask };
  }
};
</script>

<style scoped>
.tasks-page { display: flex; flex-direction: column; gap: 24px; height: calc(100vh - 140px); }
.page-header { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
.page-header h2 { margin: 0; font-size: 20px; color: #1a1a2e; }
.btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #C41E3A; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
.btn-primary:hover { background: #a01830; }
.kanban-board { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; flex: 1; overflow-x: auto; }
.kanban-column { background: #f9fafb; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; min-width: 250px; }
.column-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.column-header h3 { margin: 0; font-size: 14px; font-weight: 600; color: #1a1a2e; }
.task-count { background: #e5e7eb; padding: 2px 8px; border-radius: 10px; font-size: 12px; color: #666; }
.task-list { flex: 1; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; }
.task-card { background: #fff; border-radius: 8px; padding: 14px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: box-shadow 0.2s; position: relative; }
.task-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.task-priority { position: absolute; top: 0; left: 0; width: 4px; height: 100%; border-radius: 8px 0 0 8px; }
.task-priority.high { background: #ef4444; }
.task-priority.medium { background: #f59e0b; }
.task-priority.low { background: #10b981; }
.task-card h4 { margin: 0 0 8px; font-size: 14px; color: #1a1a2e; padding-left: 8px; }
.task-card p { margin: 0 0 12px; font-size: 13px; color: #666; padding-left: 8px; line-height: 1.4; }
.task-footer { display: flex; justify-content: space-between; font-size: 12px; color: #888; padding-left: 8px; }
.empty-column { text-align: center; padding: 20px; color: #999; font-size: 14px; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 500px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0; }
.modal-header h2 { margin: 0; font-size: 18px; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #999; }
.form-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 14px; font-weight: 500; }
.form-group input, .form-group select, .form-group textarea { padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #C41E3A; }
.modal-actions { display: flex; gap: 12px; padding: 20px 24px; border-top: 1px solid #f0f0f0; justify-content: flex-end; }
.btn-secondary { padding: 10px 20px; background: #f3f4f6; color: #666; border: none; border-radius: 8px; cursor: pointer; }
@media (max-width: 1024px) { .kanban-board { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .kanban-board { grid-template-columns: 1fr; } }
</style>
