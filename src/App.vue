<script setup lang="ts">
import CardAnime from './components/CardAnime.vue'
import { ref, useTemplateRef } from 'vue'
import { saveAsImage } from './utils/saveAsImage'

const userId = import.meta.env.VITE_USER_ID
const cardRef = useTemplateRef('cardRef')

</script>

<template>
  <header>
    <div class="header-up">
      <h1>Bangumi Flash Card</h1>
    </div>
    <div class="header-down">
    </div>
  </header>

  <main>
    <div ref="cardRef" class="card-container">
      <CardAnime :idSubject="10440" :idUser="userId" />
    </div>
      <button @click="() => saveAsImage(cardRef)" class="save-button">Save as Image</button>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  padding: 2rem;
  background-color: var(--uchu-blue-6);
  border-right: 4px solid var(--uchu-blue-4);
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

h1 {
  color: var(--uchu-yang);
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 0 2px 4px oklch(0 0 0 / 0.15);
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(
    to right,
    var(--uchu-blue-1) 0%,
    var(--uchu-yang) 100%
  );
  min-height: 100vh;
}

.card-container {
  width: 100%;
  max-width: 800px;
  background-color: var(--uchu-yang);
  border-radius: 12px;
  box-shadow: 0 4px 20px oklch(0 0 0 / 0.08);
  border: 1px solid var(--uchu-blue-2);
}

.save-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--uchu-green-6);
  color: var(--uchu-yang);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px oklch(0 0 0 / 0.1);
}

.save-button:hover {
  background-color: var(--uchu-green-5);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px oklch(0 0 0 / 0.15);
}

.save-button:active {
  background-color: var(--uchu-green-7);
  transform: translateY(0);
  box-shadow: 0 2px 4px oklch(0 0 0 / 0.1);
}

.header-up {
  text-align: center;
}

.header-down {
  text-align: center;
}

@media (max-width: 768px) {
  header {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 4px solid var(--uchu-blue-4);
    padding: 1rem;
    flex-direction: row;
    gap: 1rem;
  }

  main {
    min-height: calc(100vh - 6.5rem);
  }
}
</style>
