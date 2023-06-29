<script setup lang="ts">
import { ref } from 'vue';
const modal = ref<HTMLDialogElement | null>(null)

const addExpense = () => {
    modal.value?.showModal()
}

const closeModal = () => {
    modal.value?.close()
}
</script>



<template>
    <div class="w-full p-10 flex justify-center">
<div class="stats bg-primary text-primary-content">
  
  <div class="stat">
    <div class="stat-title">Account balance</div>
    <div class="stat-value">$89,400</div>
    <div class="stat-actions">
      <button @click="addExpense" class="btn btn-sm btn-success">Add expense</button>
    </div>
  </div>
  
  <div class="stat">
    <div class="stat-title">Current balance</div>
    <div class="stat-value">$89,400</div>
    <div class="stat-actions">
      <button class="btn btn-sm">Withdrawal</button> 
      <button class="btn btn-sm">deposit</button>
    </div>
  </div>
  
</div>
</div>
 <dialog class="w-1/2 h-1/2 bg-base-100 p-10 rounded-lg " ref="modal" >
            <button class="absolute top-5 right-5 btn btn-ghost" @click="closeModal">X</button>
            <NewExpenseModal />
        </dialog>
</template>

<style>
dialog::backdrop {
    background-color: black;
    opacity: 0.5;
}
</style>