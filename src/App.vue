<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />
  <div class='p-5'>
    <RouterView />
  </div>
  <Footer />
</template>
