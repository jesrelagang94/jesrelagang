import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export const useLeadsStore = defineStore('leads', () => {
  const leads = ref([]);
  const currentLead = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Stats computed
  const stats = computed(() => {
    const total = leads.value.length;
    const newLeads = leads.value.filter(l => l.status === 'new').length;
    const qualified = leads.value.filter(l => l.status === 'qualified').length;
    const won = leads.value.filter(l => l.status === 'won').length;
    const lost = leads.value.filter(l => l.status === 'lost').length;
    const totalValue = leads.value.reduce((sum, l) => sum + (l.value || 0), 0);

    return { total, newLeads, qualified, won, lost, totalValue };
  });

  // Fetch all leads
  const fetchLeads = async (filters = {}) => {
    try {
      loading.value = true;
      error.value = null;

      let q = collection(db, 'leads');
      const constraints = [orderBy('createdAt', 'desc')];

      if (filters.status) {
        constraints.unshift(where('status', '==', filters.status));
      }
      if (filters.source) {
        constraints.unshift(where('source', '==', filters.source));
      }
      if (filters.limit) {
        constraints.push(limit(filters.limit));
      }

      q = query(q, ...constraints);
      const snapshot = await getDocs(q);

      leads.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return leads.value;
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching leads:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  // Get single lead
  const fetchLead = async (id) => {
    try {
      loading.value = true;
      const docRef = doc(db, 'leads', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        currentLead.value = { id: docSnap.id, ...docSnap.data() };
        return currentLead.value;
      }
      return null;
    } catch (err) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Create lead
  const createLead = async (leadData) => {
    try {
      loading.value = true;
      error.value = null;

      const newLead = {
        ...leadData,
        status: leadData.status || 'new',
        source: leadData.source || 'website',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'leads'), newLead);

      // Add to local state
      leads.value.unshift({ id: docRef.id, ...newLead, createdAt: new Date() });

      return { success: true, id: docRef.id };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  // Update lead
  const updateLead = async (id, updates) => {
    try {
      loading.value = true;
      error.value = null;

      const docRef = doc(db, 'leads', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      // Update local state
      const index = leads.value.findIndex(l => l.id === id);
      if (index !== -1) {
        leads.value[index] = { ...leads.value[index], ...updates };
      }

      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  // Delete lead
  const deleteLead = async (id) => {
    try {
      loading.value = true;
      error.value = null;

      await deleteDoc(doc(db, 'leads', id));

      // Remove from local state
      leads.value = leads.value.filter(l => l.id !== id);

      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  // Convert lead to customer
  const convertToCustomer = async (id) => {
    try {
      loading.value = true;
      const lead = leads.value.find(l => l.id === id);
      if (!lead) throw new Error('Lead not found');

      // Create customer from lead
      const customerData = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        source: 'converted_lead',
        leadId: id,
        status: 'active',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'customers'), customerData);

      // Update lead status
      await updateLead(id, { status: 'won', convertedAt: new Date().toISOString() });

      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  return {
    leads,
    currentLead,
    loading,
    error,
    stats,
    fetchLeads,
    fetchLead,
    createLead,
    updateLead,
    deleteLead,
    convertToCustomer
  };
});
