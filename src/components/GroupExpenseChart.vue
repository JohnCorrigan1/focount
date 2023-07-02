<script setup lang="ts">
import {
  Chart,
  initTE,
} from "tw-elements";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

  initTE({ Chart });
interface Expense {
   name: string;
   amount: number;
   category: string;
   paidBy: string;
   for: string[];
   date: Date
}

const route = useRoute();

const groceries = ref(0)
const restaurants = ref(0)
const entertainment = ref(0)
const rent = ref(0)
const gas = ref(0)
const utilities = ref(0)
const other = ref(0)


const getExpenses = async () => {
  const docRef = doc(db, "groups", route.params.group.toString().replace(/_/g,' '));
  const querySnapshot = await getDoc(docRef);
  const expenses = querySnapshot.data()?.expenses;
  expenses.forEach((expense: Expense) => {
    if(expense.category === "Groceries") {
      groceries.value += expense.amount
    } else if(expense.category === "Restaurants") {
      restaurants.value += expense.amount
    } else if(expense.category === "Entertainment") {
      entertainment.value += expense.amount
    } else if(expense.category === "Rent") {
      rent.value += expense.amount
    } else if(expense.category === "Gas") {
      gas.value += expense.amount
    } else if(expense.category === "Utilities") {
      utilities.value += expense.amount 
    } else if(expense.category === "other") {
      other.value += expense.amount
    }
  })
  initChart()
}

const initChart = () => {
const dataDoughnut = {
  type: 'doughnut',
  data: {
    labels: ['Groceries', 'Restaurants', 'Entertainment', 'Rent', 'Gas', 'Utilities', 'other'],
    datasets: [
      {
        label: 'Expenses',
        data: [groceries.value, restaurants.value, entertainment.value, rent.value, gas.value, utilities.value, other.value],
        backgroundColor: [
          'rgba(63, 81, 181, 0.5)',
          'rgba(77, 182, 172, 0.5)',
          'rgba(66, 133, 244, 0.5)',
          'rgba(156, 39, 176, 0.5)',
          'rgba(233, 30, 99, 0.5)',
          'rgba(66, 73, 244, 0.4)',
          'rgba(66, 133, 244, 0.2)',
        ],
      },
    ],
  },
};
  new Chart(document.getElementById('doughnut-chart'), dataDoughnut);
}

onMounted(() => {
  
  getExpenses() 
})

</script>


<template>
<div class="mx-auto p-5 w-full md:w-3/4 overflow-hidden text-white ">
  <canvas class="text-white" id="doughnut-chart"></canvas>
</div>
</template>