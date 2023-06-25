<script setup lang="ts">
import { onMounted } from 'vue';
import { db } from './../firebase.ts'
import { collection, getDocs } from "firebase/firestore";

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
  <div class="bg-secondary-focus flex flex-col p-10 gap-5 w-1/2 rounded-xl shadow-xl">
    <router-link :to="{ name: 'group', params: { group: 'hackerHouse'}}">
      <div class="bg-base-100 rounded-lg text-primary-content p-5 hover:bg-base-300 cursor-pointer hover:scale-[1.02] active:scale-[.98] duration-300 shadow-lg ">
         <h1 class="text-3xl font-bold">Hacker House</h1>
          <p class="">Description of the group</p>
      </div>
    </router-link>
      <div class="bg-base-100 rounded-lg text-primary-content p-5 ">
          <h1 class="text-3xl font-bold">Hacker House</h1>
          <p class="">Description of the group</p>
      </div>
  </div>
</template>