<template>
  <footer class="bg-white py-12">
    <div class="mx-auto px-6 flex flex-col items-center text-center gap-6">
      <form
        class="flex flex-col items-center gap-4 w-full max-w-md"
        aria-label="Formulário de inscrição para novidades"
      >
        <label for="email" class="text-2xl font-bold text-[#F6585E]">
          Receba nossas novidades!
        </label>
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <input
            id="email"
            type="email"
            placeholder="Seu e-mail"
            required
            class="flex-1 px-4 py-2 rounded-full border border-[#F6585E] focus:outline-none focus:ring-2 focus:ring-[#F6585E]"
          />
          <button
            type="submit"
            class="bg-[#F6585E] text-white px-6 py-2 rounded-full hover:bg-[#EB474E] transition-colors"
          >
            Inscrever
          </button>
        </div>
      </form>
      <p class="text-[#686868] text-sm mt-4">
        &copy; 2025 Sissa Software. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>
