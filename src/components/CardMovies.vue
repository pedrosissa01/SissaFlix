<script setup>
import { useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'

const router = useRouter()
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

function goToDetails(val) {
  router.push(`/detalhe/${val.id}`)
}

const { toggleFavorite, isFavorite } = useFavorites()
const { addToCart, isInCart, toggleCart } = useCart()

function addToCartWithPrice() {
  const movieWithPrice = {
    ...props.movie,
    price: 10,
  }
  addToCart(movieWithPrice)
}
</script>

<template>
  <div
    class="relative cursor-pointer group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.015] border border-zinc-100 dark:border-zinc-700"
    @click="goToDetails(movie)"
  >

    <div class="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white dark:hover:bg-zinc-800 cursor-pointer"
        title="Salvar"
        @click.stop="toggleFavorite(movie)"
      >
        <Icon
          :icon="isFavorite(movie.id) ? 'mdi:heart-broken' : 'material-symbols:favorite'"
          class="w-5 h-5"
          :class="isFavorite(movie.id) ? 'text-red-500' : 'text-zinc-800 dark:text-white'"
        />
      </button>
    </div>

    <img
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      :alt="movie.title"
      class="w-full h-64 sm:h-72 object-cover rounded-t-2xl"
    />

    <div class="p-3 sm:p-4 text-zinc-900 dark:text-zinc-100 flex flex-col gap-2">
      <h2 class="text-sm sm:text-base font-semibold leading-snug line-clamp-2">
        {{ movie.title }}
      </h2>

      <div class="flex flex-wrap items-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 gap-2">
        <span class="flex items-center gap-1">
          <Icon icon="material-symbols:kid-star-sharp" class="w-4 h-4 text-yellow-400" />
          {{ movie.vote_average.toFixed(1) }}
        </span>
        <span class="text-[10px] sm:text-xs">• {{ formatDate(movie.release_date) }}</span>
      </div>

      <div class="flex flex-wrap gap-1 mt-1">
        <span
          v-for="genre in movie.genres || movie.genre_ids"
          :key="genre.id || genre"
          class="text-[10px] sm:text-[11px] bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 px-2 py-[2px] rounded-full"
        >
          {{ genre.name || getGenreName(genre) }}
        </span>
      </div>

      <div class="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span class="text-sm font-semibold text-green-600 dark:text-green-400">
          R$ 10,00
        </span>

        <button
          class="text-xs sm:text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 gap-1 items-center cursor-pointer flex justify-center"
          :class="isInCart(movie.id)
            ? 'bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-300'
            : 'bg-green-600 hover:bg-green-700 text-white'"
          @click.stop="toggleCart(movie)"
        >
          <Icon :icon="isInCart(movie.id) ? 'mdi:cart-check' : 'material-symbols:shopping-cart-rounded'" class="h-4 w-4"/>
          <span>{{ isInCart(movie.id) ? 'No carrinho' : 'Adicionar ao carrinho' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
const genreMap = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Crime',
  99: 'Documentário',
  18: 'Drama',
  10751: 'Família',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10402: 'Música',
  9648: 'Mistério',
  10749: 'Romance',
  878: 'Ficção Científica',
  10770: 'Cinema TV',
  53: 'Thriller',
  10752: 'Guerra',
  37: 'Faroeste'
}

function getGenreName(id) {
  return genreMap[id] || 'Desconhecido'
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
