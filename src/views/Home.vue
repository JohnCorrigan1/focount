<script setup lang="ts">
import { ref } from "vue";
import Poopy from "../components/Poopy.vue";
import Balance from "../components/Balance.vue";
import NavBar from "../components/NavBar.vue";

const isSignedIn = ref(true);
</script>

<template>
<main class="min-h-screen min-w-screen" > 
    <NavBar />
  <div class="min-h-[90vh] w-full flex flex-col items-center justify-center gap-10" v-if="isSignedIn">
    <Balance />
  <Poopy  />
  </div>
</main>
</template>