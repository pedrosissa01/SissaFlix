<template>
  <div class="px-4 py-8 sm:px-6 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 min-h-screen">
    <div class="bg-white shadow-sm rounded-2xl p-6 space-y-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-zinc-800">Finalizar Pedido</h2>

      <div class="grid grid-cols-2 gap-3 py-4">
        <div
          class="flex items-center justify-center gap-2 rounded-xl p-3 cursor-pointer border transition text-sm sm:text-base"
          :class="tipo === 'comprar' ? 'bg-red-100 border-red-500 text-red-600 font-semibold' : 'bg-zinc-100 text-zinc-500'"
          @click="tipo = 'comprar'"
        >
          <Icon icon="tdesign:cd-filled" />
          Comprar
        </div>
        <div
          class="flex items-center justify-center gap-2 rounded-xl p-3 cursor-pointer border transition text-sm sm:text-base"
          :class="tipo === 'alugar' ? 'bg-red-100 border-red-500 text-red-600 font-semibold' : 'bg-zinc-100 text-zinc-500'"
          @click="tipo = 'alugar'"
        >
          <Icon icon="ic:outline-payments" />
          Alugar
        </div>
      </div>

      <section class="grid space-y-4 pb-5 gap-4">
        <h3 class="text-lg sm:text-xl font-semibold text-zinc-700">Informações Pessoais</h3>

        <div class="grid gap-1">
          <label class="text-xs sm:text-sm font-medium">Nome Completo <span class="text-red-500">*</span></label>
          <input
            type="text"
            v-model="form.nome"
            class="border border-zinc-300 rounded-lg px-3 py-2 text-xs sm:text-sm w-full focus:outline-none focus:ring-2"
            :class="formErros.nome ? 'focus:ring-red-500' : 'focus:ring-red-400'"
          />
          <p v-if="formErros.nome" class="text-xs text-red-500">{{ formErros.nome }}</p>
        </div>

        <div class="grid gap-1">
          <label class="text-xs sm:text-sm font-medium">Email <span class="text-red-500">*</span></label>
          <input
            type="email"
            v-model="form.email"
            class="border border-zinc-300 rounded-lg px-3 py-2 text-xs sm:text-sm w-full focus:outline-none focus:ring-2"
            :class="formErros.email ? 'focus:ring-red-500' : 'focus:ring-red-400'"
          />
          <p v-if="formErros.email" class="text-xs text-red-500">{{ formErros.email }}</p>
        </div>

        <div class="grid gap-1">
          <label class="text-xs sm:text-sm font-medium">Telefone <span class="text-red-500">*</span></label>
          <input
            type="tel"
            v-model="form.telefone"
            v-mask="'(##) #####-####'"
            class="border border-zinc-300 rounded-lg px-3 py-2 text-xs sm:text-sm w-full focus:outline-none focus:ring-2"
            :class="formErros.telefone ? 'focus:ring-red-500' : 'focus:ring-red-400'"
          />
          <p v-if="formErros.telefone" class="text-xs text-red-500">{{ formErros.telefone }}</p>
        </div>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg sm:text-xl font-semibold text-zinc-700">Método de Pagamento</h3>
        <div class="grid grid-cols-2 gap-4 py-5">
          <div
            class="flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer border transition text-sm sm:text-base"
            :class="metodoPagamento === 'pix' ? 'bg-red-100 border-red-500 text-red-600 font-semibold' : 'bg-zinc-100 text-zinc-500'"
            @click="metodoPagamento = 'pix'"
          >
            <Icon icon="ic:outline-pix" />
            PIX
          </div>
          <div
            class="flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer border transition text-sm sm:text-base"
            :class="metodoPagamento === 'cartao' ? 'bg-red-100 border-red-500 text-red-600 font-semibold' : 'bg-zinc-100 text-zinc-500'"
            @click="metodoPagamento = 'cartao'"
          >
            <Icon icon="ic:baseline-credit-card" />
            Cartão
          </div>
        </div>

        <div v-if="metodoPagamento === 'pix'" class="mt-4 grid gap-2">
          <h4 class="text-base sm:text-lg font-semibold text-center text-zinc-700">Pagamento via PIX</h4>
          <p class="text-center text-xs sm:text-sm text-zinc-500">
            Escaneie ou copie o código abaixo <br />
            <span class="text-red-500 font-semibold">{{ tempoRestante }}s restantes</span>
          </p>
          <div class="flex justify-center">
            <div class="p-4 bg-zinc-100 rounded-xl shadow">
              <img :src="qrCodeUrl" alt="QR Code Pix" class="w-32 h-32 sm:w-40 sm:h-40 rounded-xl" />
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div class="bg-gray-100 w-auto rounded-lg flex overflow-hidden">
              <code class="text-xs bg-gray-100 px-3 py-1 rounded-l-lg text-zinc-700 font-mono break-all truncate">{{ codigoPix }}</code>
              <button class="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-r-lg shadow">
                Copiar
              </button>
            </div>
          </div>
        </div>

        <div v-if="metodoPagamento === 'cartao'" class="mt-4 space-y-3">
          <div class="grid gap-2">
            <label class="text-xs sm:text-sm font-medium">Número do Cartão</label>
            <input
              class="border border-zinc-300 rounded-lg px-3 py-2 text-xs sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              v-model="pagamento.cartao"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <label class="text-xs sm:text-sm font-medium">Validade</label>
              <input
                class="border border-zinc-300 rounded-lg px-3 py-2 text-xs sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                v-model="pagamento.validade"
              />
            </div>
            <div class="grid gap-2">
              <label class="text-xs sm:text-sm font-medium">CVV</label>
              <input
                class="border border-zinc-300 rounded-lg px-3 py-2 text-xs sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                v-model="pagamento.cvv"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl sm:text-3xl font-bold text-zinc-800 pb-4">Resumo do Carrinho ({{ cart.length }})</h2>
      <ul class="grid gap-3 max-h-[60vh] sm:max-h-[70vh] overflow-auto mb-4">
        <li
          v-for="f in cart"
          :key="f.id"
          class="bg-white shadow rounded-xl p-3 flex gap-3 sm:gap-4 items-start"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${f.poster_path}`"
            :alt="f.title"
            class="w-16 h-24 sm:w-20 sm:h-28 rounded-lg object-cover flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs sm:text-sm font-semibold truncate">{{ f.title }}</h4>
            <p class="text-xs text-zinc-500">ID: {{ f.id }}</p>
            <p class="text-xs mt-1 text-zinc-600">{{ f.quantity }}x - R$ {{ f.price.toFixed(2) }}</p>
            <p class="text-xs font-bold text-green-600 mt-1">Total: R$ {{ (f.price * f.quantity).toFixed(2) }}</p>
          </div>
          <div class="flex-shrink-0">
            <button @click.stop="removeFromCart(f.id)" class="cursor-pointer">
              <Icon icon="mdi:alpha-x-circle" class="w-5 h-5 text-zinc-700" />
            </button>
          </div>
        </li>
      </ul>

      <div class="pt-4 grid gap-4">
        <div class="flex items-center bg-white p-3 rounded-xl shadow mt-4">
          <Icon icon="mdi:ticket-confirmation" class="w-5 h-5 mr-2 text-red-500" />
          <input
            type="text"
            placeholder="Adicionar cupom de desconto"
            class="w-full bg-transparent focus:outline-none text-xs sm:text-sm text-zinc-700 pl-2"
          />
        </div>

        <button
          class="bg-green-500 px-2 py-3 font-semibold rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer mt-4 text-white text-sm sm:text-base"
          @click="confirmarCompra"
        >
          <Icon icon="material-symbols:shopping-cart-rounded" class="h-5 w-5" />
          Confirmar compra
        </button>
      </div>
    </div>

    <div
      v-if="mostrarModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50 px-4"
    >
      <div class="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center space-y-4 grid gap-3">
        <h2 class="text-xl font-semibold text-green-600">Pagamento Confirmado!</h2>
        <p class="text-sm text-zinc-600">Sua compra foi finalizada com sucesso.</p>
        <button
          @click="irParaHome"
          class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition"
        >
          Voltar para Início
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { mask } from 'vue-the-mask'

const router = useRouter()
const { cart, removeFromCart } = useCart()

const metodoPagamento = ref('pix')
const qrCodeUrl = ref('https://media.hovercode.com/media/images/qrcode.width-500.png')
const codigoPix = ref('00020126580014br.gov.bcb.pix...')
const tempoRestante = ref(300)
const tipo = ref('comprar')
const pagamento = ref({ cartao: '', validade: '', cvv: '' })

const form = ref({ nome: '', email: '', telefone: '' })
const formErros = ref({ nome: '', email: '', telefone: '' })

const mostrarModal = ref(false) // novo

let intervalId = null
onMounted(() => {
  intervalId = setInterval(() => {
    if (tempoRestante.value > 0) tempoRestante.value--
    else clearInterval(intervalId)
  }, 1000)
})
onUnmounted(() => clearInterval(intervalId))

function copiarCodigoPix() {
  navigator.clipboard.writeText(codigoPix.value).then(() => alert('Código Pix copiado com sucesso!'))
}

function goToDetails(id) {
  console.log('Ver detalhes do filme ID:', id)
}

function validarFormulario() {
  let valido = true
  formErros.value = { nome: '', email: '', telefone: '' }

  if (!form.value.nome.trim()) {
    formErros.value.nome = 'Nome é obrigatório.'
    valido = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    formErros.value.email = 'Email é obrigatório.'
    valido = false
  } else if (!emailRegex.test(form.value.email)) {
    formErros.value.email = 'Email inválido.'
    valido = false
  }

  const telefoneLimpo = form.value.telefone.replace(/\D/g, '')
  if (!telefoneLimpo) {
    formErros.value.telefone = 'Telefone é obrigatório.'
    valido = false
  } else if (telefoneLimpo.length < 11) {
    formErros.value.telefone = 'Telefone incompleto.'
    valido = false
  }

  return valido
}

function confirmarCompra() {
  if (validarFormulario()) {
    mostrarModal.value = true
  }
}

function irParaHome() {
  mostrarModal.value = false
  router.push('/')
}

</script>

<style scoped>
</style>
