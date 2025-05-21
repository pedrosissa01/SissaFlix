<script setup>
import { useCart } from '@/composables/useCart'

defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const { toggleCart, isInCart } = useCart()

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <section
    class="relative flex flex-col items-start justify-end text-left rounded-xl overflow-hidden w-full min-h-[350px] sm:min-h-[450px] md:min-h-[550px] px-6 py-10 md:py-16 text-white"
  >

    <img
      :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`"
      :alt="movie.title"
      class="absolute inset-0 w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-500"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

    <div class="relative z-10 max-w-2xl">
      <h1 class="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
        {{ movie.title }}
      </h1>
      <p class="mt-3 text-sm sm:text-base text-zinc-200 line-clamp-3">
        {{ movie.overview }}
      </p>
      <div class="pt-4 flex items-center gap-4 text-sm sm:text-base">
        <span class="bg-zinc-800/60 px-3 py-1 rounded-full">
          Lançamento: 
          {{ formatDate(movie.release_date) }}
        </span>
        <span class="bg-yellow-500/30 text-black px-3 py-1 rounded-full font-semibold flex items-center">
          <Icon icon="material-symbols:kid-star-sharp" class="w-4 h-4 text-yellow-400" /> <span class="pl-1">{{ movie.vote_average.toFixed(1) }}</span>
        </span>
      </div>
      <div class="pt-6">
        <button
          class="px-6 py-3 flex font-semibold rounded-xl transition gap-2 items-center cursor-pointer"
          :class="isInCart(movie.id) ? 'bg-green-500 text-white' : 'bg-white text-zinc-900 hover:bg-zinc-200'"
          @click.stop="toggleCart(movie)"
        >
          <Icon :icon="isInCart(movie.id) ? 'mdi:cart-check' : 'material-symbols:shopping-cart-rounded'" class="h-6 w-6"/>
          {{ isInCart(movie.id) ? 'No carrinho' : 'Comprar agora' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
