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
    <div class="bg-secondary-focus flex flex-col p-10 gap-5 w-1/2 rounded-xl shadow-xl">
        <GroupCard v-for="group in groups" :key="group.name" :name="group.name" :description="group.description" :members="group.members.length.toString()" />
        
        <button @click="createGroup" class="btn btn-primary shadow-lg">Create Group</button>
        
    </div>
<dialog class="w-1/2 h-1/2 bg-base-100 p-10 rounded-lg " ref="addGroupModal" >
            <button class="absolute top-5 right-5 btn btn-ghost" @click="closeModal">X</button>
            <NewGroupModal />
        </dialog>
</template>

<style>
dialog::backdrop {
    background-color: black;
    opacity: 0.5;
}
</style>