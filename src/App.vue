<script setup lang="ts">
import CardAnime from './components/CardAnime.vue'
import { ref, useTemplateRef } from 'vue'
import { saveAsImage } from './utils/saveAsImage'

const cardRef = useTemplateRef('cardRef')
</script>

<template>
  <header>
    <h1>Bangumi Flash Card</h1>
  </header>

  <main>
    <div ref="cardRef" class="card-container">
      <CardAnime :idAnime="246429" />
    </div>
    <button @click="() => saveAsImage(cardRef)" class="save-button">Save as Image</button>
  </main>
</template>

<style scoped>
</style>
