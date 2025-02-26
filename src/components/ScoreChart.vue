<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
}>()

const circumference = 2 * Math.PI * 45
const dashOffset = computed(() => {
  const percentage = props.score / 10
  return circumference * (1 - percentage)
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
        stroke="var(--color-surface-400)"
        stroke-width="8"
      />
      <!-- Score progress circle -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="var(--color-primary-400)"
        stroke-width="8"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 50 50)"
        class="progress-circle"
      />
      <!-- Score text -->
      <text
        x="50"
        y="50"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="24"
        fill="var(--color-text-900)"
      >
        {{ score }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.score-chart {
  display: inline-block;
  padding: 0.5rem;
  background-color: var(--uchu-yang);
  border-radius: 50%;
  box-shadow: 0 2px 8px oklch(0 0 0 / 0.08);
}

circle {
  transition: stroke-dashoffset 0.8s ease-in-out;
}

circle:first-child {
  stroke: var(--uchu-blue-2);
}

circle:nth-child(2) {
  stroke: var(--uchu-blue-6);
}

.progress-circle {
  stroke-linecap: round;
}

text {
  font-weight: 600;
  fill: var(--uchu-blue-8);
}
</style>
