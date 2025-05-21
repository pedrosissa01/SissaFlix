import { ref } from 'vue'

const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

function saveToLocalStorage() {
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

function addFavorite(movie) {
  if (!favorites.value.some(f => f.id === movie.id)) {
    favorites.value.push(movie)
    saveToLocalStorage()
  }
}

function removeFavorite(movieId) {
  favorites.value = favorites.value.filter(f => f.id !== movieId)
  saveToLocalStorage()
}

function toggleFavorite(movie) {
  const exists = favorites.value.some(f => f.id === movie.id)
  if (exists) {
    removeFavorite(movie.id)
  } else {
    addFavorite(movie)
  }
}

function isFavorite(movieId) {
  return favorites.value.some(f => f.id === movieId)
}

export function useFavorites() {
  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  }
}
