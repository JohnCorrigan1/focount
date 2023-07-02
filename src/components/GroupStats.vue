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
   date: Date
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
    console.log(expenses)
    expenses.forEach((expense: Expense) => {
        // if(expense.date.toString().includes(new Date().getMonth().toString()) && expense.date.toString().includes(new Date().getFullYear().toString()) {
if(expense.date.toString().includes(new Date().getMonth().toString())) {
            monthlySpending.value += expense.amount
            console.log(expense.amount)
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
    <div class="stat-value">${{userBalance}}</div>
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
 <!-- <dialog class="w-1/2 h-1/2 bg-base-100 p-10 rounded-lg " ref="expenseModal" > -->
<dialog class="fixed top-[33.39%] md:top-[25%] md:left-[25%] m-0 h-2/3 md:h-1/2 min-w-[100%] md:min-w-[50%] md:w-1/2 bg-base-100 md:p-10 md:rounded-lg rounded-t-2xl " ref="expenseModal" >

            <button class="absolute top-1 right-1 md:top-5 md:right-5 btn btn-ghost" @click="closeModal">X</button>
            <NewExpenseModal :members="members" />
        </dialog>
</template>

<style>
dialog::backdrop {
    background-color: black;
    opacity: 0.5;
}
</style>