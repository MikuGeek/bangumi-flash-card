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
      <img src="https://avatars.githubusercontent.com/u/7521082" alt="logo" class="logo">
      <h1>Bangumi Flash Card</h1>
    </div>
    <div class="header-down">
      <button @click="() => saveAsImage(cardRef)" class="save-button">Save as Image</button>
    </div>
  </header>

  <main>
    <div ref="cardRef" class="card-container">
      <CardAnime :idSubject="486165" :idUser="userId" />
    </div>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  padding: var(--spacing-lg);
  background-color: var(--color-primary);
  border-right: 4px solid var(--color-primary-light);
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

h1 {
  color: var(--color-background);
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
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
    #F8F9FA 0%,
    #FFFFFF 100%
  );
  min-height: 100vh;
  min-width: 500px;
}

.card-container {
  width: 100%;
  max-width: 800px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #DDDDDD;
}

.save-button {
  background-color: var(--color-success);
  color: var(--color-background);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-button:hover {
  background-color: var(--color-success-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.save-button:active {
  background-color: var(--color-success-dark);
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
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
    border-bottom: 4px solid #7FDBFF;
    padding: 1rem;
    flex-direction: row;
    gap: 1rem;
  }

  main {
    min-height: calc(100vh - 6.5rem);
  }
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 20%;
}
</style>
