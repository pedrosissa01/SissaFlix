<template>
  <Transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/40" @click="close"></div>

      <!-- Slideover Panel -->
      <div class="relative w-full max-w-md bg-white dark:bg-zinc-900 shadow-xl p-4 overflow-y-auto">
        <div class="flex items-center justify-between pb-4">
          <h2 class="text-lg font-semibold">Meu Carrinho ({{ cart.length }})</h2>
          <button @click="close" class="text-zinc-500 cursor-pointer hover:text-[#F6585E]">
            <Icon icon="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <div v-if="cart.length === 0" class="text-sm text-zinc-500 text-center mt-8">
          Nenhum filme adicionado ao carrinho.
        </div>

        <ul v-else class="space-y-4 h-[calc(100vh-200px)] overflow-hidden hover:overflow-y-visible">
          <li
            v-for="f in cart"
            :key="f.id"
            class="flex items-start gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded transition"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${f.poster_path}`"
              :alt="f.title"
              class="h-24 object-cover rounded"
              @click="goToDetails(f.id)"
            />

            <div class="flex-1">
              <p class="text-sm font-medium truncate">{{ f.title }}</p>
              <p class="text-xs text-zinc-500">ID: {{ f.id }}</p>
              <div class="flex items-center gap-2 mt-1">
                <button
                  @click.stop="decreaseQuantity(f.id)"
                  class="bg-zinc-200 dark:bg-zinc-700 px-2 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600"
                >
                  -
                </button>
                <span class="text-sm">{{ f.quantity }}</span>
                <button
                  @click.stop="increaseQuantity(f.id)"
                  class="bg-zinc-200 dark:bg-zinc-700 px-2 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600"
                >
                  +
                </button>
              </div>
              <p class="text-xs text-zinc-500 mt-1">Preço: R$ {{ f?.price.toFixed(2) }}</p>
              <p class="text-xs text-green-600 font-semibold">
                Total: R$ {{ (f.price * f.quantity).toFixed(2) }}
              </p>
            </div>

            <button @click.stop="removeFromCart(f.id)">
              <Icon icon="mdi:alpha-x-circle" class="w-5 h-5 text-red-500" />
            </button>
          </li>
        </ul>
        <div v-if="cart.length" class="mt-4 border-t border-zinc-100 py-2 text-right">
          <p class="text-sm text-zinc-500">Subtotal</p>
          <p class="text-xl font-semibold text-green-600">R$ {{ total.toFixed(2) }}</p>
        </div>
        <button :disabled="cart.length === 0" @click="goToCheckout()" class="disabled:bg-zinc-100 bg-green-500 disabled:text-zinc-500 text-white px-2 w-full py-3 font-bold rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer mt-4">
          <Icon icon="material-symbols:shopping-cart-rounded" class="h-5 w-5" />
          Fechar Compra
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useCart } from '@/composables/useCart'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { defineProps, defineEmits, computed } from 'vue'

const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
const router = useRouter()

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function goToDetails(id) {
  close()
  router.push(`/detalhe/${id}`)
}

function goToCheckout(){
  close()
  router.push(`/checkout`)
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
