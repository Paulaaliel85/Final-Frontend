<script setup>
import { useRoute } from 'vue-router'
import Navbar from './components/navbar.vue'

const route = useRoute()
</script>

<template>
  <Navbar v-if="route.name !== 'login'" />

  <RouterView />
</template>
