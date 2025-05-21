<template>
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex justify-end"
    >
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/40" @click="close"></div>

      <!-- Slideover Panel -->
      <div class="relative w-full max-w-md bg-white dark:bg-zinc-900 shadow-xl p-4 overflow-y-auto">
        <div class="flex items-center justify-between pb-4">
          <h2 class="text-lg font-semibold">Meus Favoritos ({{ favorites.length }})</h2>
          <button @click="close" class="text-zinc-500 cursor-pointer hover:text-[#F6585E]">
            <Icon icon="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <div v-if="favorites.length === 0" class="text-sm text-zinc-500 text-center mt-8">
          Nenhum filme adicionado aos favoritos.
        </div>

        <ul v-else class="space-y-4">
          <li
            v-for="movie in favorites"
            :key="movie.id"
            class="flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded transition cursor-pointer"
            @click="goToDetails(movie.id)"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="w-12 h-16 object-cover rounded"
            />
            <div class="flex-1">
              <p class="text-sm font-medium truncate">{{ movie.title }}</p>
              <p class="text-xs text-zinc-500">ID: {{ movie.id }}</p>
            </div>
            <button @click.stop="removeFavorite(movie.id)">
              <Icon icon="material-symbols:favorite" class="w-5 h-5 text-red-500" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useFavorites } from '@/composables/useFavorites'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { defineProps, defineEmits } from 'vue'

const { favorites, removeFavorite } = useFavorites()
const router = useRouter()

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

function goToDetails(id) {
  close()
  router.push(`/detalhe/${id}`)
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
