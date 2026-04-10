<template>
  <div class="base-container">
    <header v-if="$slots.header" class="header-slot">
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.base-container { padding: 20px; max-width: 1000px; margin: 0 auto; font-family: sans-serif; }
.header-slot { margin-bottom: 20px; }
</style>