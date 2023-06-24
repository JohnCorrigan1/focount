<script setup lang="ts">
import { db } from './firebase'
import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  const data = doc.data()
  console.log(data)
});

// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
 <main class="min-h-screen min-w-screen flex justify-center items-center"> 
  <h1 class="text-blue-500 font-bold text-6xl">mr poopy</h1>
</main>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>