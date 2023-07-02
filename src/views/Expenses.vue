<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import Expense from "../components/Expense.vue";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from "firebase/firestore";
import { db } from './../firebase.ts'

interface Expense {
   name: string;
   amount: number;
   category: string;
   paidBy: string;
   for: string[];
   date: Date
}

const route = useRoute();
const expenses = ref<Expense[]>([]);

const groupName = route.params.group.toString().replace(/_/g,' ');

const getExpenses = async () => {
   const docRef = doc(db, "groups", groupName);
   const querySnapshot = await getDoc(docRef);
   const expensesData = querySnapshot.data()?.expenses;
    expenses.value = expensesData
}

onMounted(() => {
    getExpenses()
})

</script>

<template>
    <main class="min-h-screen min-w-screen">
    <NavBar />

            <h1>Expenses</h1>
       <div class="flex flex-col gap-5 items-center w-full justify-center">
        <Expense v-for="expense in expenses" :key="expense.name" :expense="expense" /> 
       </div> 
    </main>
</template>