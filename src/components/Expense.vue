<script setup lang="ts">
import { onMounted } from 'vue'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from './../firebase.ts'
import { useRoute } from 'vue-router';

interface Expense {
   name: string;
   amount: number;
   category: string;
   paidBy: string;
   for: string[];
   date: any 
}

const expense = defineProps<{expense: Expense}>()

const route = useRoute();

const deleteExpense = async () => {
    console.log("deleting")
    const docRef = doc(db, "groups", route.params.group.toString().replace(/_/g,' '));
    const querySnapshot = await getDoc(docRef);
    const expenses = querySnapshot.data()?.expenses;
    const newExpenses = expenses.filter((firebaseExpense: Expense) => {
        return expense.expense.name !== firebaseExpense.name && expense.expense.amount !== firebaseExpense.amount
    })
    await updateDoc(docRef, {
        expenses: newExpenses
    })
}

onMounted(() => {
})


</script>

<template>
<div class="collapse bg-base-200 lg:w-1/2">
  <input type="radio" name="my-accordion-1"  /> 
  <div class="collapse-title text-xl font-medium">
    <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-xl">{{ expense.expense.name }}</h2>
            <p class="text-lg font-semibold">${{ expense.expense.amount }}</p>
        </div>
       
        <div>
            <button @click="deleteExpense" class="btn btn-primary z-50">Delete</button>
        </div>
  </div>
  </div>
  <div class="collapse-content"> 
    <div class="flex justify-between items-center">
 <div class="flex flex-col gap-3">
            <p>Paid By: {{ expense.expense.paidBy }}</p>
            <p>For: {{ expense.expense.for.join(", ") }}</p>
        </div>
        <div class="flex flex-col gap-3">
            <p>Category: {{ expense.expense.category }}</p>
            <p>{{ new Date(expense.expense.date.seconds * 1000).toLocaleDateString("en-us") }}</p>
        </div>
</div>
  </div>
</div>
</template>