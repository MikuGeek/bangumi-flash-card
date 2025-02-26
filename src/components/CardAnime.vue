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
</style>