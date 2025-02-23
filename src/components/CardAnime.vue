<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define props and expose the card ref
const props = defineProps<{
  idAnime: number
}>();

const cardRef = ref<HTMLElement | null>(null);
defineExpose({ cardRef });

interface AnimeData {
    name: string;
    name_cn: string;
    air_start_date?: string;
    produce_company?: string;
    images: {
        common: string;
    };
    tags?: Array<{
        name: string;
        count: number;
    }>;
}

const anime = ref<AnimeData>({
    name: 'Anime Name',
    name_cn: 'Anime Name CN',
    air_start_date: 'Air Start Date',
    produce_company: 'Produce Company',
    images: {
        common: 'https://placehold.co/180x240'
    },
    tags: []
});

async function fetchInfoAnime(id: number) {
    try {
        const response = await fetch(`https://api.bgm.tv/v0/subjects/${id}`);
        const data = await response.json();

        // Find production company from infobox if available
        const productionCompany = data.infobox?.find(
            (item: { key: string; value: string }) =>
            item.key === "动画制作"
        )?.value || '';

        // Get top 5 tags
        const top5Tags = data.tags?.slice(0, 6) || [];

        // Update anime ref with fetched data
        anime.value = {
            name: data.name,
            name_cn: data.name_cn,
            air_start_date: data.date,
            produce_company: productionCompany,
            images: data.images,
            tags: top5Tags
        };
    } catch (error) {
        console.error('Error fetching anime info:', error);
    }
}

// Use onMounted to fetch data when component is mounted
onMounted(() => {
    fetchInfoAnime(props.idAnime);
});

</script>

<template>
    <div class="anime-card" ref="cardRef">
        <div class="card-header">
            <div class="card-header-text">
                <h2 class="anime-title">{{ anime.name }}</h2>
                <h3 class="anime-title-cn">{{ anime.name_cn }}</h3>
                <p class="anime-info"><span>放送日期:</span> {{ anime.air_start_date }}</p>
                <p class="anime-info"><span>制作公司:</span> {{ anime.produce_company }}</p>
                <div class="tags-container">
                    <span class="tag" v-for="tag in anime.tags" :key="tag.name">
                        {{ tag.name }} ({{ tag.count }})
                    </span>
                </div>
            </div>
            <div class="card-header-img">
                <img :src="anime.images.common" alt="Anime Logo">
            </div>
        </div>
    </div>
</template>

<style scoped>
.anime-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin: 16px;
    width: 600px;
    max-width: 100%;
}

.card-header {
    display: flex;
    gap: 20px;
}

.card-header-text {
    flex: 1;
}

.anime-title {
    font-size: 1.4rem;
    margin: 0 0 4px;
    color: #2c3e50;
}

.anime-title-cn {
    font-size: 1.1rem;
    margin: 0 0 12px;
    color: #486581;
}

.anime-info {
    margin: 8px 0;
    color: #64748b;
}

.anime-info span {
    color: #334155;
}

.card-header-img img {
    width: 180px;
    height: 240px;
    object-fit: cover;
    border-radius: 6px;
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
}

.tag {
    background-color: #e2e8f0;
    color: #475569;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.85rem;
}

@media (max-width: 640px) {
    .card-header {
        flex-direction: column-reverse;
    }

    .card-header-img img {
        width: 100%;
        height: auto;
        max-height: 300px;
    }
}
</style>