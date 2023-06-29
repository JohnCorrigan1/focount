<script setup lang="ts">
import { ref } from 'vue';

const name = ref("");
const amount = ref(0);

const createExpense = () => {
    console.log(name.value, amount.value)
}

</script>

<template>
   <form class="">
         <div class="flex flex-col w-1/2">
              <label>Expense Name</label>
              <input v-model="name" placeholder="cool epic guys" class="input input-primary" />
         </div>
         <div class="flex flex-col w-1/2">
              <label for="">Expense amount</label>
              <input v-model="amount" placeholder="100" type="number" class="input input-primary"/>
         </div>
         <div>
            <label>Expense category</label>
         </div>
         <div>
                <label for="">Paid by</label>
         </div>
            <div>
                <label for="">For</label>
                <div></div>
            </div>
         <button @click="createExpense" class="btn btn-primary w-1/4">Create</button>
   </form> 
</template>