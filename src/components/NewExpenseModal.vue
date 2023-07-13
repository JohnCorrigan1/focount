<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from './../firebase.ts'
import { useRoute } from 'vue-router';

interface Expense {
   name: string;
   amount: number;
   category: string;
   paidBy: string;
   for: string[];
   date: Date
}

interface Member {
   name: string;
   balance: number;
}

const route = useRoute();

const props = defineProps<{members: Member[], modal: any}>()

let forWhoArray: string[] = [];
const categories = ref<string[]>([])
const name = ref("");
const amount = ref(0);
const paidBy = ref("");
const forWho = ref([]);
const category = ref("");

const createExpense = async () => {
   const expense: Expense = {
      name: name.value,
      amount: amount.value,
      category: category.value,
      paidBy: paidBy.value,
      for: forWhoArray, 
      date: new Date()
   }
   console.log(expense)

   const docRef = doc(db, "groups", route.params.group.toString().replace(/_/g,' '));
   await updateDoc(docRef, {
      expenses: arrayUnion(expense)
   })

   updateBalances();
    props.modal.close();
}

const updateBalances = async () => {
   const docRef = doc(db, "groups", route.params.group.toString().replace(/_/g,' '));
   const querySnapshot = await getDoc(docRef);
   const members = querySnapshot.data()?.members;
   console.log(members)
   members.forEach((member: Member) => {
      if(member.name === paidBy.value) {
         member.balance += parseInt(amount.value.toFixed(2))
      }
      if(forWhoArray.includes(member.name)) {
         member.balance -= parseInt((amount.value / forWhoArray.length).toFixed(2))
      }
   })
   console.log(members)
   await updateDoc(docRef, {
      members: members
   })
}

watch(forWho, (newVal)  => {
   forWhoArray = [];
   forWho.value.forEach((member: string) => {
      forWhoArray.push(member)
   })
   console.log(newVal);
});

const getCategories = async () => {
   const docRef = doc(db, "groups", route.params.group.toString().replace(/_/g,' '));
   const querySnapshot = await getDoc(docRef);
   querySnapshot.data()?.categories.forEach((category: string) => {
      categories.value.push(category)
   })
}

onMounted(() => {
   getCategories()
})

</script>

<template>
   <div class="flex flex-col gap-2 md:gap-5">
      <h1 class="text-center">New Expense</h1>
      <div class="flex gap-2 md:gap-5 lg:gap-10">
            <div class="flex flex-col w-1/2">
              <label>Name</label>
              <input v-model="name" placeholder="cool epic guys" class="input input-primary" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="">Amount</label>
              <input v-model="amount" placeholder="100" type="number" class="input input-primary"/>
            </div>
         </div>
         <div class="flex gap-2 md:gap-5 lg:gap-10">
            <div class="flex flex-col w-1/2">
               <label>Category</label>
               <select v-model="category" class="select select-primary">
                  <option v-for="categoryName in categories" v-bind:value="categoryName">{{categoryName}}</option>
               </select> 
            </div>
            <div class="flex flex-col w-1/2">
               <label for="">Paid by</label>
               <select v-model="paidBy" class="select select-primary">
                  <option v-for="member in props.members" v-bind:value="member.name">{{member.name}}</option>
               </select>
            </div>
         </div>

               <label class="">For</label>
            <div class="grid grid-cols-2 md:gap-10 w-full">
               <div   v-for="member in members" v-bind:value="member.name" class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">{{member.name}}</span> 
    <input v-model="forWho" :value="member.name"  type="checkbox" class="checkbox checkbox-primary" />
  </label>
</div>   
            </div>
         <button @click="createExpense" class="btn btn-primary">Create</button>
   </div> 
</template>
