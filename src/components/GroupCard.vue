<script setup lang="ts">
import { onMounted } from 'vue';
import { db } from './../firebase.ts'
import { collection, getDocs } from "firebase/firestore";

defineProps<{ name: string, description: string, members: string }>()

onMounted(async() => {
  const querySnapshot = await getDocs(collection(db, "users"));
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  const data = doc.data()
  console.log(data)
});
})
</script>

<template>
    <router-link :to="{ name: 'group', params: { group: name}}">
      <div class="bg-base-100 rounded-lg text-primary-content p-5 hover:bg-base-300 cursor-pointer hover:scale-[1.02] active:scale-[.98] duration-300 shadow-lg ">
         <h1 class="text-3xl font-bold">{{name}}</h1>
          <p class="">{{description}}</p>
      </div>
    </router-link>
</template>