<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const router = useRouter()
const movie = ref(null)
const isLoading = ref(true)
const activeTab = ref('details')

const API_KEY = import.meta.env.VITE_API_KEY

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

function goBack() {
  router.push(`/`)
}

async function loadMovie(id) {
  isLoading.value = true
  movie.value = null

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`)
    const data = await res.json()
    movie.value = data
  } catch (err) {
    console.error('Erro ao carregar filme:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadMovie(route.params.id)
})


watch(() => route.params.id, (newId) => {
  loadMovie(newId)
})

const { toggleFavorite, isFavorite } = useFavorites()
const { toggleCart, isInCart } = useCart()
</script>
<template>
  <div v-if="isLoading" class="text-center text-zinc-500 py-10">Carregando...</div>

  <div
    v-else-if="movie"
    class="relative bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-xl"
  >

    <div
      class="absolute top-0 left-0 w-full h-[calc(100vh-130px)] bg-cover bg-center opacity-5 dark:opacity-10 blur-sm"
      :style="`background-image: url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`"
    />

    <div class="relative z-10 px-4 py-6 sm:py-10">

      <button
        class="absolute top-4 right-16 bg-zinc-50 hover:bg-white text-zinc-800 hover:text-[#F6585E] rounded-xl p-3 transition cursor-pointer"
        title="Salvar"
        @click.stop="toggleFavorite(movie)"
      >
        <Icon
          icon="material-symbols:favorite"
          class="w-5 h-5"
          :class="isFavorite(movie.id) ? 'text-red-500' : 'text-zinc-800 dark:text-white'"
        />
      </button>

      <button
        @click="goBack"
        class="absolute top-4 right-4 bg-zinc-50 hover:bg-white text-zinc-800 hover:text-[#F6585E] rounded-xl p-3 transition cursor-pointer"
        title="Voltar"
      >
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>

      <div class="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-10 items-start">

        <div class="w-full flex flex-col items-center md:items-start">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="rounded-lg shadow-xl w-full max-w-xs md:max-w-none h-auto"
          />
          <div class="pt-4 w-full">
            <button
              class="w-full px-4 py-3 flex justify-center font-semibold rounded-xl transition gap-2 items-center"
              :class="isInCart(movie.id)
                ? 'bg-green-500 text-white'
                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'"
              @click.stop="toggleCart(movie)"
            >
              <Icon
                :icon="isInCart(movie.id) ? 'mdi:cart-check' : 'material-symbols:shopping-cart-rounded'"
                class="h-5 w-5"
              />
              {{ isInCart(movie.id) ? 'No carrinho' : 'Comprar agora' }}
            </button>
          </div>
        </div>


        <div class="w-full col-span-2">
          <h1 class="text-2xl sm:text-3xl font-bold mb-2">{{ movie.title }}</h1>
          <p class="text-xs sm:text-sm text-zinc-500 mb-4">
            {{ formatDate(movie.release_date) }} • {{ movie.runtime }} min • ⭐ {{ movie.vote_average.toFixed(1) }}
          </p>

          <!-- Tabs -->
          <div class="flex gap-4 overflow-auto border-b border-zinc-200 dark:border-zinc-700 mb-4">
            <button
              @click="activeTab = 'details'"
              :class="[
                'pb-2 text-sm border-b-2 whitespace-nowrap',
                activeTab === 'details'
                  ? 'border-[#F6585E] text-[#F6585E] font-semibold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              ]"
            >
              Detalhes
            </button>
            <button
              @click="activeTab = 'trailer'"
              :class="[
                'pb-2 text-sm border-b-2 whitespace-nowrap',
                activeTab === 'trailer'
                  ? 'border-[#F6585E] text-[#F6585E] font-semibold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              ]"
            >
              Trailer
            </button>
          </div>


          <div v-if="activeTab === 'details'" class="space-y-4 text-sm leading-relaxed">
            <div class="flex flex-wrap gap-2 py-2">
              <span
                v-for="genre in movie.genres"
                :key="genre.id"
                class="bg-zinc-200 dark:bg-zinc-700 text-xs px-3 py-1 rounded-full"
              >
                {{ genre.name }}
              </span>
            </div>

            <p class="text-justify">{{ movie.overview }}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-zinc-600 dark:text-zinc-300">
              <div><strong>Status:</strong> {{ movie.status }}</div>
              <div><strong>Idioma original:</strong> {{ movie.original_language.toUpperCase() }}</div>
              <div><strong>Orçamento:</strong> {{ formatCurrency(movie.budget) }}</div>
              <div><strong>Receita:</strong> {{ formatCurrency(movie.revenue) }}</div>
            </div>
          </div>

          <div v-else-if="activeTab === 'trailer'" class="pt-4">
            <div v-if="movie.videos?.results?.length && movie.videos.results[0].site === 'YouTube'">
              <div class="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  class="w-full h-full"
                  :src="`https://www.youtube.com/embed/${movie.videos.results[0].key}`"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <p v-else class="text-zinc-500 text-sm">Trailer indisponível.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-red-500 py-10">Filme não encontrado.</div>
</template>
