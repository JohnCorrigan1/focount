<script setup lang="ts">
import { ref, onMounted } from "vue";
import GroupCard from "./GroupCard.vue";
import NewGroupModal from "./NewGroupModal.vue";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface Group {
    name: string;
    description: string;
    members: Array<{name: string, balance: number}>;
}

const addGroupModal = ref<HTMLDialogElement | null>(null)
const groups = ref<Array<Group>>([])

const createGroup = () => {
    addGroupModal.value?.showModal()
}

const closeModal = () => {
    addGroupModal.value?.close()
}

onMounted(() => {
    getUserGroups()
})


const getUserGroups = async () => {
    if(!auth.currentUser) return

    const docRef = doc(db, "users", auth.currentUser.uid);
    const querySnapshot = await getDoc(docRef);
    querySnapshot.data()?.groups.forEach(async (group: string) => {
        const docRef = doc(db, "groups", group);
        const docSnap = await getDoc(docRef);
        groups.value.push(docSnap.data() as Group)
    })
}

</script>

<template>
    <div class="bg-secondary-focus flex flex-col p-3 w-4/5 lg:p-10 gap-3 lg:gap-5 lg:w-1/2 rounded-xl shadow-xl">
        <GroupCard v-for="group in groups" :key="group.name" :name="group.name" :description="group.description" :members="group.members.length.toString()" />
        
        <button @click="createGroup" class="btn btn-primary shadow-lg">Create Group</button>
        
    </div>
<dialog class="fixed top-[50%] md:top-[25%] md:left-[25%] m-0 h-1/2 min-w-[100%] md:min-w-[50%] md:w-1/2 bg-base-100 md:p-10 md:rounded-lg rounded-t-2xl " ref="addGroupModal" >
            <button class="absolute top-5 right-5 btn btn-ghost" @click="closeModal">X</button>
            <NewGroupModal />
        </dialog>
</template>

<style>
dialog::backdrop {
    background-color: black;
    opacity: 0.5;
}

.dialog {
    position: fixed;
    z-index: 100;
    top: 100%;
    left: 50%;
    
    transform: translate(-50%, -50%);
}
</style>