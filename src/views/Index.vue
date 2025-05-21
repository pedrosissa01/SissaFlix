<script setup>

import CardMovies from '@/components/CardMovies.vue'
import BannerMovies from '@/components/BannerMovies.vue'

import { ref, onMounted } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
const movies = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
    const data = await response.json()
    movies.value = data.results
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="p-4">
    <div v-if="movies.length" class="pb-6 text-2xl font-bold text-center">
      <BannerMovies :movie="movies[0]"/>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
      <CardMovies
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>
