<template>
  <div>
    <header class="flex items-center justify-between px-4 md:px-10 py-4 bg-white dark:bg-zinc-900 relative flex-wrap gap-3">

      <span class="text-xl font-bold cursor-pointer" @click="goBack">
        <img src="../assets/logo.svg" class="h-10 w-10" />
      </span>


      <div class="relative w-full md:w-auto md:max-w-md mt-4 md:mt-0 md:mx-4 flex-1">
        <div
          class="flex items-center px-3 py-2 rounded-2xl transition-all duration-200 w-full"
          :class="{
            'bg-zinc-100 dark:bg-zinc-800': true,
            'ring-1 ring-[#F6585E]': isFocused
          }"
        >
          <Icon
            icon="mdi:magnify"
            class="w-5 h-5 mr-2"
            :class="isFocused ? 'text-[#F6585E]' : 'text-zinc-400 dark:text-zinc-500'"
          />
          <input
            v-model="query"
            type="text"
            placeholder="Pesquisar..."
            class="bg-transparent outline-none w-full text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            @focus="isFocused = true"
            @blur="() => setTimeout(() => isFocused = false, 200)"
            ref="searchInput"
          />
        </div>

        <ul
          v-if="isFocused && suggestions.length > 0"
          class="absolute top-full mt-2 w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg z-50 overflow-hidden"
        >
          <li
            v-for="movie in suggestions"
            :key="movie.id"
            class="px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer flex items-center gap-3 transition"
            @click="goToMovie(movie.id)"
          >
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
              :alt="movie.title"
              class="w-8 h-12 object-cover rounded"
            />
            <span class="truncate">{{ movie.title }}</span>
          </li>
        </ul>
      </div>

      <button class="md:hidden ml-auto" @click="showMobileMenu = !showMobileMenu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <nav class="hidden md:flex gap-4 text-sm ml-4">
        <div @click="showFavoritos = true" class="relative p-2 hover:bg-[#F6585E] transition-colors duration-200 rounded-full cursor-pointer hover:text-zinc-100 hover:dark:text-zinc-100">
          <Icon icon="material-symbols:favorite" class="w-5 h-5" />
          <span
            v-if="favorites.length > 0"
            class="absolute -top-0.5 -right-0.5 bg-[#F6585E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold"
          >
            {{ favorites.length }}
          </span>
        </div>
        <div @click="showCart = true" class="relative p-2 hover:bg-[#F6585E] transition-colors duration-200 rounded-full cursor-pointer hover:text-zinc-100 hover:dark:text-zinc-100">
          <Icon icon="material-symbols:shopping-cart-rounded" class="w-5 h-5" />
          <span
            v-if="cart.length > 0"
            class="absolute -top-0.5 -right-0.5 bg-[#F6585E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold"
          >
            {{ cart.length }}
          </span>
        </div>
      </nav>

      <div
        v-if="showMobileMenu"
        class="w-full mt-4 flex flex-col gap-2 bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg md:hidden"
      >
        <button @click="showFavoritos = true" class="flex items-center gap-2 hover:text-[#F6585E]">
          <Icon icon="material-symbols:favorite" class="w-5 h-5" />
          Favoritos
          <span v-if="favorites.length" class="ml-auto text-xs bg-[#F6585E] text-white rounded-full w-5 h-5 flex items-center justify-center">{{ favorites.length }}</span>
        </button>
        <button @click="showCart = true" class="flex items-center gap-2 hover:text-[#F6585E]">
          <Icon icon="material-symbols:shopping-cart-rounded" class="w-5 h-5" />
          Carrinho
          <span v-if="cart.length" class="ml-auto text-xs bg-[#F6585E] text-white rounded-full w-5 h-5 flex items-center justify-center">{{ cart.length }}</span>
        </button>
      </div>
    </header>
  </div>

  <SlideoverFavoritos :isOpen="showFavoritos" @close="showFavoritos = false" />
  <SlideoverCart :isOpen="showCart" @close="showCart = false" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'
import SlideoverFavoritos from '@/components/SlideoverFavoritos.vue'
import SlideoverCart from '@/components/SlideoverCart.vue'

const isFocused = ref(false)
const query = ref('')
const suggestions = ref([])
const searchInput = ref(null)
const showFavoritos = ref(false)
const showCart = ref(false)
const showMobileMenu = ref(false)

const router = useRouter()
const API_KEY = import.meta.env.VITE_API_KEY
const { favorites } = useFavorites()
const { cart } = useCart()

function goBack() {
  router.push(`/`)
}
function goToMovie(id) {
  suggestions.value = []
  query.value = ''
  router.push(`/detalhe/${id}`)
}

let debounceTimeout = null
watch(query, (newQuery) => {
  clearTimeout(debounceTimeout)
  if (newQuery.trim().length === 0) {
    suggestions.value = []
    return
  }
  debounceTimeout = setTimeout(async () => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(newQuery)}`)
    const data = await res.json()
    suggestions.value = data.results?.slice(0, 5) || []
  }, 300)
})
</script>

<!-- Componente auxiliar para os ícones com badge -->
<script>
import { Icon } from '@iconify/vue'
export default {
  props: {
    icon: String,
    badge: Number
  },
  emits: ['click'],
  template: `
    <div @click="$emit('click')" class="relative p-2 hover:bg-[#F6585E] rounded-full cursor-pointer transition text-zinc-800 dark:text-white hover:text-white">
      <Icon :icon="icon" class="w-5 h-5" />
      <span v-if="badge > 0" class="absolute -top-0.5 -right-0.5 bg-[#F6585E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
        {{ badge }}
      </span>
    </div>
  `
}
</script>
