<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
}>()

const circumference = 2 * Math.PI * 45
const dashOffset = computed(() => {
  const percentage = (10 - props.score) / 10
  return circumference * percentage
})
</script>

<template>
  <div class="score-chart">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <!-- Background circle -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#e0e0e0"
        stroke-width="8"
      />
      <!-- Score progress circle -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#4CAF50"
        stroke-width="8"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 50 50)"
      />
      <!-- Score text -->
      <text
        x="50"
        y="50"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="24"
        fill="#333"
      >
        {{ score }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.score-chart {
  display: inline-block;
}

circle {
  transition: stroke-dashoffset 0.3s ease;
}
</style>
