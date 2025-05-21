import { ref, watch } from 'vue'

const cart = ref([])

// Carregar do localStorage (opcional)
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('movie-cart')
  if (stored) {
    cart.value = JSON.parse(stored)
  }

  watch(
    cart,
    (newCart) => {
      localStorage.setItem('movie-cart', JSON.stringify(newCart))
    },
    { deep: true }
  )
}

export function useCart() {
  function addToCart(movie) {
    const existing = cart.value.find(item => item.id === movie.id)

    if (!existing) {
      cart.value.push({
        ...movie,
        quantity: 1,
        price: 10.00
      })
    }
  }

  function removeFromCart(movieId) {
    cart.value = cart.value.filter(item => item.id !== movieId)
  }

  function isInCart(movieId) {
    return cart.value.some(item => item.id === movieId)
  }

  function toggleCart(movie) {
    if (isInCart(movie.id)) {
      removeFromCart(movie.id)
    } else {
      addToCart(movie)
    }
  }

  function increaseQuantity(movieId) {
    const item = cart.value.find(item => item.id === movieId)
    if (item) item.quantity++
  }

  function decreaseQuantity(movieId) {
    const item = cart.value.find(item => item.id === movieId)
    if (item && item.quantity > 1) {
      item.quantity--
    }
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
    toggleCart,
    increaseQuantity,
    decreaseQuantity
  }
}
