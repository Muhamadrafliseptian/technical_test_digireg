<template>
  <Header/>
  <RouterView />
  <Footer/>
</template>

<script setup>
import Header from './components/layouts/header.vue';
import Footer from './components/layouts/footer.vue';
</script>