<script setup lang="ts">
interface Expense {
   name: string;
   amount: number;
   category: string;
   paidBy: string;
   for: string[];
   date: any 
}

defineProps<{expense: Expense}>()

</script>

<template>
    <div class="flex p-5 gap-5 bg-primary rounded-lg text-primary-content md:w-2/3 hover:bg-primary-focus">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-xl">{{ expense.name }}</h2>
            <p class="text-lg font-semibold">${{ expense.amount }}</p>
        </div>
        <div class="flex flex-col gap-3">
            <p>Paid By: {{ expense.paidBy }}</p>
            <p>Category: {{ expense.category }}</p>
        </div>
        <div class="flex flex-col gap-3">
            <p>For: {{ expense.for.join(", ") }}</p>
            <p>{{ new Date(expense.date.seconds * 1000).toLocaleDateString("en-us") }}</p>
        </div>
        <div>
            <button class="btn btn-secondary">Delete</button>
        </div>
    </div>
</template>