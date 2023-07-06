<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import MemberDetailsRow from './MemberDetailsRow.vue';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Member {
    name: string;
    balance: number;
}

const route = useRoute();
const group = route.params.group.toString().replace(/_/g,' ')
const user = route.params.member.toString().replace(/_/g,' ')
const realMember = ref<Member>({name: '', balance: 0})

const getMembers = async() => {
    const docRef = doc(db, "groups", group);
    const querySnapshot = await getDoc(docRef);
    const members = querySnapshot.data()?.members;
    realMember.value = members.filter((member: Member) => member.name === user)[0]
    //get member from members
    members.forEach((member: Member) => {
        if(member.name === user) {
            realMember.value = member
        }
    })

    console.log(realMember.value)
}

onMounted(() => {
    getMembers()
})

</script>


<template>
    <div class="w-full flex justify-center">
<div class="overflow-x-auto w-full md:w-3/4">
  <table class="table">
    <!-- head -->
    <thead>
      <tr class="grid grid-cols-4">
        <th></th>
       <th class="w-full text-center ">Name</th>
        <th class="w-full text-center">Balance</th>
        <!-- <th>Favorite Color</th> -->
        <th></th>
      </tr>
    </thead>
    <!-- <tbody v-for="member in members"> -->
        <!-- <GroupMember :name="member.name" :balance="member.balance" img="./../assets/google.png"  /> -->
    <!-- </tbody> -->
    <tbody>

        <MemberDetailsRow :name="realMember.name" :balance="realMember.balance" img="./../assets/google.png" />
    </tbody>
  </table>
        </div>
</div>
<!-- <div class="flex w-full justify-center items-center p-10"> -->
  <!-- <button @click="openModal" class="btn btn-primary">Invite member</button> -->
<!-- </div> -->
</template>

