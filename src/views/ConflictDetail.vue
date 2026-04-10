<template>
  <BaseContainer>
    <button @click="router.back()" class="back-btn">← Tornar a la llista</button>
    
    <div v-if="store.loading" class="loading">Carregant detalls... ⏳</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    
    <div v-else-if="conflict" class="detail-view">
      <h1>{{ conflict.nombre }}</h1>
      <span class="badge" :class="conflict.estado.toLowerCase()">Estat: {{ conflict.estado }}</span>
      
      <div class="info-section">
        <h3>📄 Informació General</h3>
        <p><strong>Data d'inici:</strong> {{ formatDate(conflict.fechaInicio) }}</p>
        <p class="desc">{{ conflict.descripcion }}</p>
      </div>

      <div class="info-section">
        <h3>🏳️ Països Implicats</h3>
        <ul v-if="conflict.paises && conflict.paises.length">
          <li v-for="(pais, index) in conflict.paises" :key="index">
            {{ pais }}
          </li>
        </ul>
        <p v-else>No hi ha dades de països registrades per aquest conflicte.</p>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConflictStore } from '../store/conflictStore'
import BaseContainer from '../components/BaseContainer.vue'

const route = useRoute()
const router = useRouter()
const store = useConflictStore()
const conflictId = route.params.id

onMounted(() => {
  store.fetchConflictById(conflictId)
})

const conflict = computed(() => store.currentConflict)

const formatDate = (dateString) => {
  if (!dateString) return 'Desconeguda'
  return new Date(dateString).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.back-btn { margin-bottom: 20px; padding: 10px 15px; background: #ecf0f1; border: none; border-radius: 4px; cursor: pointer; }
.back-btn:hover { background: #bdc3c7; }
.badge { display: inline-block; padding: 6px 12px; border-radius: 12px; color: white; font-weight: bold; margin-bottom: 20px;}
.activo { background-color: #e74c3c; }
.finalizado { background-color: #2ecc71; }
.congelado { background-color: #3498db; }
.info-section { margin-top: 20px; padding: 20px; background: #fdfdfd; border: 1px solid #eee; border-radius: 8px; }
.desc { line-height: 1.6; color: #444; }
</style>