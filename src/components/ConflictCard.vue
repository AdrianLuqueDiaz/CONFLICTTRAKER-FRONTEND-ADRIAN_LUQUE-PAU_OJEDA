<template>
  <div class="card" :class="estadoClass">
    <h3>{{ conflict.nombre }}</h3>
    <p>Inici: {{ formatDate(conflict.fechaInicio) }}</p>
    <p>Estat: <strong>{{ conflict.estado }}</strong></p>
    <button class="btn" @click="$emit('veure-detall', conflict.id)">Veure Detall</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  conflict: {
    type: Object,
    required: true
  }
})

defineEmits(['veure-detall'])

const estadoClass = computed(() => {
  if (props.conflict.estado === 'ACTIVO') return 'status-active'
  if (props.conflict.estado === 'FINALIZADO') return 'status-finished'
  return 'status-frozen'
})

const formatDate = (dateString) => {
  if (!dateString) return 'Desconeguda'
  return new Date(dateString).toLocaleDateString('ca-ES')
}
</script>

<style scoped>
.card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-bottom: 15px; background: #fff;}
.status-active { border-left: 6px solid #e74c3c; }
.status-finished { border-left: 6px solid #2ecc71; }
.status-frozen { border-left: 6px solid #3498db; }
.btn { background: #2c3e50; color: white; padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;}
.btn:hover { background: #1a252f; }
</style>