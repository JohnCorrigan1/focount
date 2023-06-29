<script setup lang="ts">
import { ref } from 'vue';
import { updateDoc, doc, arrayUnion, setDoc } from 'firebase/firestore';
import { db, auth } from './../firebase'

const name = ref("");
const description = ref("");

const createGroup = async () => {
    if(auth.currentUser)
    {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            groups: arrayUnion(name.value) 
        });
    }

    if(auth.currentUser)
    {
        await setDoc(doc(db, "groups", name.value), {
            name: name.value,
            description: description.value,
            members: [{name: auth.currentUser.displayName, balance: 0}]
        });
    }
}



</script>
<template>
        <div class="flex flex-col items-center gap-10 ">
            <h1 class="text-2xl font-semibold">Create a group</h1>

            <div class="flex flex-col w-1/2">
                <label>Group Name</label>
                <input v-model="name" placeholder="cool epic guys" class="input input-primary" />
            </div>

            <div class="flex flex-col w-1/2">
                <label for="">Group description</label>
                <textarea v-model="description" placeholder="House of super rich handsome epic cool people that do cool stuff..." type="text" class="textarea textarea-primary"/>
            </div>
            <button @click="createGroup" class="btn btn-primary w-1/4">Create</button>
        </div>
</template>