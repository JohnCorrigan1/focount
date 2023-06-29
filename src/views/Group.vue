<script setup lang="ts">
import GroupExpenseChart from "../components/GroupExpenseChart.vue";
import GroupMember from "../components/GroupMember.vue";
import GroupStats from "../components/GroupStats.vue";
import NavBar from "../components/NavBar.vue";
// import { getDoc, doc } from "firebase/firestore";

// const getMemebers = () => {

// }

</script>

<template>
    <main class="h-screen w-screen">
        <NavBar />
        <GroupStats />
        <GroupExpenseChart />

<div class="w-full flex justify-center">
<div class="overflow-x-auto w-3/4">
  <table class="table">
    <!-- head -->
    <thead>
      <tr class="grid grid-cols-4">
        <th></th>
       <th class="w-full text-center ">Name</th>
        <th class="w-full text-center">Balance</th>
        <!-- <th>Favorite Color</th> -->
        <th></th>
      </tr>
    </thead>
    <tbody>
        <GroupMember name="John" img="./../assets/google.png"  />
    </tbody>
  </table>
        </div>
</div>
    </main>
</template>