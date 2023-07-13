<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NewExpenseModal from './NewExpenseModal.vue'
import { useRoute } from 'vue-router';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from './../firebase.ts'

interface Member {
    name: string;
    balance: number;
}

interface Expense {
   name: string;
   amount: number;
   category: string;
   paidBy: string;
   for: string[];
   date: any 
}

const monthlySpending = ref(0);
const userBalance = ref(0);

const route = useRoute();

const getMonthlySpending = async () => {
    const docRef = doc(db, "groups", route.params.group.toString().replace(/_/g,' '));
    const querySnapshot = await getDoc(docRef);
    const members = querySnapshot.data()?.members;
    members.forEach((member: Member) => {
        if(member.name === auth.currentUser?.displayName) {
            userBalance.value = member.balance
        }
    })
    const expenses = querySnapshot.data()?.expenses;
    expenses.forEach((expense: Expense) => {
        // if(expense.date.toString().includes(new Date().getMonth().toString()) && expense.date.toString().includes(new Date().getFullYear().toString()) {
// if(expense.date.toString().includes(new Date().getMonth().toString())) {
    if(new Date(expense.date.seconds * 1000).getMonth().toString() === new Date().getMonth().toString() && new Date(expense.date.seconds * 1000).getFullYear().toString() === new Date().getFullYear().toString()){
            monthlySpending.value += expense.amount
        }
    })
}

defineProps<{groupName: string, members: Member[]}>()

const expenseModal = ref<HTMLDialogElement | null>(null)

const addExpense = () => {
    expenseModal.value?.showModal()
}

const closeModal = () => {
    expenseModal.value?.close()
}

onMounted(() => {
    getMonthlySpending()
})  
</script>



<template>
    <div class="w-full p-5 lg:p-10 flex justify-center items-center">
<div class="stats bg-primary text-primary-content">
  
  <div class="stat">
    <div class="stat-title text-primary-content">Your balance</div>
    <div class="stat-value">${{userBalance.toFixed(2)}}</div>
    <div class="stat-actions">
      <button @click="addExpense" class="btn btn-sm btn-success">Add expense</button>
    </div>
  </div>
  
  <div class="stat">
    <div class="stat-title text-primary-content">Group (June)</div>
    <div class="stat-value">${{monthlySpending}}</div>
    <div class="stat-actions">
      <!-- <button class="btn btn-sm">Withdrawal</button>  -->
      <router-link :to="{ name: 'expenses', params: { group: route.params.group.toString().replace(/ /g,'_')}}">
      <button class="btn btn-sm">Expenses</button>
      </router-link>
    </div>
  </div>
</div>
</div>
<dialog class="fixed top-[33.39%] lg:top-[16.67%] 2xl:top-[25%] lg:left-[25%] m-0 h-2/3 2xl:h-1/2 min-w-[100%] lg:min-w-[50%] lg:w-1/2 bg-base-100 md:p-10 md:rounded-lg rounded-t-2xl " ref="expenseModal" >
    <button @click="closeModal" class="absolute top-1 right-1 md:top-5 md:right-5 btn btn-square btn-outline">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button> 
    <NewExpenseModal :members="members" :modal="expenseModal" />
</dialog>
</template>

<style>
dialog::backdrop {
    background-color: black;
    opacity: 0.5;
}
</style>
