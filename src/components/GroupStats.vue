<script setup lang="ts">
import { ref } from 'vue';
import NewExpenseModal from './NewExpenseModal.vue'

interface Member {
    name: string;
    balance: number;
}

defineProps<{groupName: string, members: Member[]}>()

const expenseModal = ref<HTMLDialogElement | null>(null)

const addExpense = () => {
    expenseModal.value?.showModal()
}

const closeModal = () => {
    expenseModal.value?.close()
}
</script>



<template>
    <div class="w-full p-10 flex justify-center items-center">
<div class="stats bg-primary text-primary-content">
  
  <div class="stat">
    <div class="stat-title">Your balance</div>
    <div class="stat-value">$89,400</div>
    <div class="stat-actions">
      <button @click="addExpense" class="btn btn-sm btn-success">Add expense</button>
    </div>
  </div>
  
  <div class="stat">
    <div class="stat-title">Group spending (June)</div>
    <div class="stat-value">$89,400</div>
    <div class="stat-actions">
      <!-- <button class="btn btn-sm">Withdrawal</button>  -->
      <button class="btn btn-sm">Expense History</button>
    </div>
  </div>
</div>
</div>
 <dialog class="w-1/2 h-1/2 bg-base-100 p-10 rounded-lg " ref="expenseModal" >
            <button class="absolute top-5 right-5 btn btn-ghost" @click="closeModal">X</button>
            <NewExpenseModal :members="members" />
        </dialog>
</template>

<style>
dialog::backdrop {
    background-color: black;
    opacity: 0.5;
}
</style>