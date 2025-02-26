<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { DataAnime, DataGame, CommentUser } from '../utils/type';
import { fetchInfoSubject } from '../utils/fetchSubject';
import { fetchCommentUser } from '../utils/fetchCommentUser';
import ScoreChart from './ScoreChart.vue';

const props = defineProps<{ idSubject: number, idUser: string }>();

const cardRef = ref<HTMLElement | null>(null);
defineExpose({ cardRef });

const subject = ref<DataAnime | DataGame | null>(null);
const comment = ref<CommentUser | null>(null);

onMounted(() => {
    fetchInfoSubject(props.idSubject).then((data) => {
        subject.value = data;
    });
    if (props.idUser) {
        fetchCommentUser(props.idUser, props.idSubject).then((data) => {
            comment.value = data;
        });
    }
});

const isGame = (subject: DataAnime | DataGame | null): subject is DataGame => {
    return subject !== null && 'game_type' in subject;
};

</script>

<template>
    <div class="card-main" ref="cardRef">
        <div class="card-left">
            <h2 class="subject-title">{{ subject?.name || 'Name' }}</h2>
            <h3 class="subject-title-cn">{{ subject?.name_cn || 'Name in Chinese' }}</h3>

            <p class="subject-metadata" v-if="isGame(subject) && subject.game_type">{{ subject?.game_type }}</p>
            <p class="subject-metadata" v-else-if="!isGame(subject) && subject?.platform">{{ subject?.platform }}</p>

            <p class="subject-metadata" v-if="subject?.date">{{ subject?.date }}</p>
            <p class="subject-metadata" v-if="subject?.company">{{ subject?.company }}</p>

            <div class="tags-container">
                <span class="tag" v-for="tag in subject?.tags" :key="tag.name">
                    {{ tag.name }} ({{ tag.count }})
                </span>
            </div>
        </div>

        <div class="card-right">
            <img :src="subject?.images.common || 'https://placehold.co/180x240'" alt="Anime Logo">

            <ScoreChart :score="subject?.score || 0" />
        </div>

        <div class="card-bottom" v-if="comment">
            <p class="comment-text">{{ comment.comment }}</p>
            <p class="comment-score">Score: {{ comment.score }}</p>
        </div>
    </div>
</template>

<style scoped>
.card-main {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "left right"
    "bottom bottom";
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  min-height: 400px;
  height: fit-content;
  background-color: var(--uchu-yang);
  border-radius: 12px;
  box-shadow: 0 4px 20px oklch(0 0 0 / 0.08);
  border: 1px solid var(--uchu-blue-2);
}

.card-left {
  grid-area: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 480px;
}

.card-right {
  grid-area: right;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 220px;
}

.card-bottom {
  grid-area: bottom;
  border-top: 1px solid var(--uchu-blue-2);
  padding-top: 1.5rem;
}

.subject-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--uchu-blue-8);
  line-height: 1.2;
}

.subject-title-cn {
  font-size: 1.5rem;
  color: var(--uchu-blue-6);
  font-weight: 500;
}

.subject-metadata {
  color: var(--uchu-gray-7);
  font-size: 0.95rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background-color: var(--uchu-blue-1);
  color: var(--uchu-blue-7);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  border: 1px solid var(--uchu-blue-2);
}

.card-right img {
  width: 180px;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px oklch(0 0 0 / 0.08);
  border: 1px solid var(--uchu-blue-2);
}

.comment-text {
  color: var(--uchu-gray-8);
  line-height: 1.6;
  font-size: 1rem;
}

.comment-score {
  margin-top: 1rem;
  font-weight: 600;
  color: var(--uchu-blue-7);
}

@media (max-width: 640px) {
  .card-main {
    grid-template-columns: 1fr;
    grid-template-areas:
      "right"
      "left"
      "bottom";
    max-width: 400px;
    padding: 1.5rem;
  }

  .card-right {
    width: 100%;
    margin-bottom: 1rem;
  }

  .card-right img {
    width: 160px;
    height: 213px;
  }

  .card-left {
    max-width: 100%;
  }

  .subject-title {
    font-size: 1.75rem;
  }

  .subject-title-cn {
    font-size: 1.25rem;
  }
}
</style>