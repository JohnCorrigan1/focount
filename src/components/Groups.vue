<script setup lang="ts">
import { ref } from "vue";
import GroupCard from "./GroupCard.vue";
import NewGroupModal from "./NewGroupModal.vue";

const modal = ref<HTMLDialogElement | null>(null)

const createGroup = () => {
    modal.value?.showModal()
}

const closeModal = () => {
    modal.value?.close()
}

</script>

<template>
    <div class="bg-secondary-focus flex flex-col p-10 gap-5 w-1/2 rounded-xl shadow-xl">
        <GroupCard name="Hacker" description="house of gamers doing stuff" members="5" />
        <button @click="createGroup" class="btn btn-primary shadow-lg">Create Group</button>
        <dialog class="w-1/2 h-1/2 bg-base-100 p-10 rounded-lg " ref="modal" >
            <button class="absolute top-5 right-5 btn btn-ghost" @click="closeModal">X</button>
            <NewGroupModal />
        </dialog>
    </div>
</template>

<style>
dialog::backdrop {
    background-color: black;
    opacity: 0.5;
}
</style>