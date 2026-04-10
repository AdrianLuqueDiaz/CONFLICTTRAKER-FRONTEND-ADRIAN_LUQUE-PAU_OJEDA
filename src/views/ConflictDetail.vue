<template>
  <BaseContainer>
    <button @click="router.back()" class="back-btn">{{ t('back') }}</button>
    
    <div v-if="store.loading" class="loading">{{ t('loading') }} ⏳</div>
    <div v-else-if="store.error" class="error">{{ t('errorConn') }}</div>
    
    <div v-else-if="conflict" class="detail-view">
      <h1>{{ conflict.nombre }}</h1>
      <span class="badge" :class="conflict.estado.toLowerCase()">{{ t('status') }}: 
        <span v-if="conflict.estado === 'ACTIVO'">{{ t('state') }}</span>
        <span v-else>{{ t('statefalse') }}</span>
      </span>
      
      <div class="info-section">
        <h3>{{ t('generalInfo') }}</h3>
        <p><strong>{{ t('start') }}:</strong> {{ formatDate(conflict.fechaInicio) }}</p>
        <p class="desc">{{ conflict.descripcion }}</p>
      </div>

      <div class="info-section">
        <h3>{{ t('countriesInvolved') }}</h3>
        <ul v-if="conflict.paises && conflict.paises.length" class="country-list">
          <li v-for="(pais, index) in conflict.paises" :key="index" class="country-item">
            <img :src="getFlagUrl(pais)" :alt="'Bandera de ' + pais" class="flag-icon" />
            <span>{{ pais }}</span>
          </li>
        </ul>
        <p v-else>{{ t('noCountries') }}</p>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConflictStore } from '../store/conflictStore'
import { t } from '../composables/useI18n'
import { getFlagUrl } from '../composables/useFlags'
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
  if (!dateString) return t('unknown')
  return new Date(dateString).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.back-btn { margin-bottom: 20px; padding: 10px 15px; background: #ecf0f1; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.back-btn:hover { background: #bdc3c7; }
.badge { display: inline-block; padding: 6px 12px; border-radius: 12px; color: white; font-weight: bold; margin-bottom: 20px;}
.activo { background-color: #e74c3c; }
.finalizado { background-color: #2ecc71; }
.congelado { background-color: #3498db; }
.info-section { margin-top: 20px; padding: 20px; background: #fdfdfd; border: 1px solid #eee; border-radius: 8px; }
.desc { line-height: 1.6; color: #444; }

.country-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.country-item { display: flex; align-items: center; gap: 10px; font-size: 1.1rem; }
.flag-icon { width: 30px; border-radius: 3px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
</style>