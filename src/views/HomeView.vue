<template>
  <BaseContainer>
    <template #header>
      <h1>{{ t('title') }}</h1>
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('searchPlaceholder')"
        class="search-bar"
      />
    </template>

    <div v-if="store.loading" class="loading">{{ t('loading') }} ⏳</div>
    <div v-else-if="store.error" class="error">{{ t('errorConn') }}</div>
    
    <div v-else class="grid">
      <p v-if="filteredConflicts.length === 0">{{ t('noResults') }}</p>
      <ConflictCard
        v-for="conflict in filteredConflicts"
        :key="conflict.id"
        :conflict="conflict"
        @veure-detall="goToDetail"
      />
    </div>
  </BaseContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConflictStore } from '../store/conflictStore'
import { t } from '../composables/useI18n'
import BaseContainer from '../components/BaseContainer.vue'
import ConflictCard from '../components/ConflictCard.vue'

const store = useConflictStore()
const router = useRouter()
const searchQuery = ref('')

onMounted(() => {
  store.fetchConflicts()
})

const filteredConflicts = computed(() => {
  if (!searchQuery.value) return store.conflicts
  const lowerQuery = searchQuery.value.toLowerCase()
  return store.conflicts.filter(c => 
    c.nombre.toLowerCase().includes(lowerQuery) ||
    (c.paises && c.paises.some(p => p.toLowerCase().includes(lowerQuery)))
  )
})

const goToDetail = (id) => {
  router.push(`/conflicts/${id}`)
}
</script>

<style scoped>
.search-bar { width: 100%; padding: 12px; font-size: 16px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box;}
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
.loading { font-size: 1.2rem; color: #555; }
.error { background: #ffeaa7; padding: 15px; border-radius: 8px; color: #d63031; }
</style>