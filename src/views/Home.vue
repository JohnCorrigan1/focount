<script setup lang="ts">
import { ref } from "vue";
import Balance from "../components/Balance.vue";
import NavBar from "../components/NavBar.vue";
import Groups from "../components/Groups.vue";

const isSignedIn = ref(true);
</script>

<template>
<main class="min-h-screen min-w-screen" > 
    <NavBar />
  <div class="min-h-[90vh] w-full flex flex-col items-center justify-center gap-10" v-if="isSignedIn">
    <Balance />
    <Groups />
  </div>
</main>
</template>