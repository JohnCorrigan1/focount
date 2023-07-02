<script setup lang="ts">
import { ref, onMounted } from "vue";
import GroupExpenseChart from "../components/GroupExpenseChart.vue";
import GroupMember from "../components/GroupMember.vue";
import GroupStats from "../components/GroupStats.vue";
import NavBar from "../components/NavBar.vue";
import NewMemberModal from "../components/NewMemberModal.vue"
import { useRoute } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Member {
    name: string;
    balance: number;
}

// defineProps<{ group: string, groupName: string }>()
const route = useRoute();
const members = ref<Member[]>([])

// const props = defineProps(['group', 'groupName']);

const newMemberModal = ref<HTMLDialogElement | null>(null);


const openModal = () => {
    newMemberModal.value?.showModal();
}

const closeModal = () => {
    newMemberModal.value?.close();
}

const getGroup = async () => {
      //@ts-ignore
    const docRef = doc(db, "groups", route.params.group.replace(/_/g,' '));
    const querySnapshot = await getDoc(docRef);
    querySnapshot.data()?.members.forEach(async (member: Member) => {
        members.value.push(member as {name: string, balance: number})
    })
}

onMounted(() => {
  getGroup()
})

</script>

<template>
    <main class="min-h-screen min-w-screen">
        <NavBar />
        <div class="md:flex lg:p-10">
        <GroupStats :members="members" :groupName="route.params.group.toString().replace(/_/g,' ')" />
        <GroupExpenseChart />
        </div>

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
    <tbody v-for="member in members">
        <GroupMember :name="member.name" :balance="member.balance" img="./../assets/google.png"  />
    </tbody>
  </table>
        </div>
</div>
<div class="flex w-full justify-center items-center p-10">
  <button @click="openModal" class="btn btn-primary">Invite member</button>
</div>
    </main>
<dialog class="fixed top-[50%] md:top-[25%] md:left-[25%] m-0 h-1/2 min-w-[100%] md:min-w-[50%] md:w-1/2 bg-base-100 md:p-10 md:rounded-lg rounded-t-2xl " ref="newMemberModal" >

        <!-- <dialog class="w-1/2 h-1/2 bg-base-100 p-10 rounded-lg " ref="newMemberModal" > -->
            <button class="absolute top-1 right-1 md:top-5 md:right-5 btn btn-ghost" @click="closeModal">X</button>
            <NewMemberModal />
        </dialog>
</template>

<style>
dialog::backdrop {
    background-color: black;
    opacity: 0.5;
}
</style>