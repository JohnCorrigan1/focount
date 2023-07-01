<script setup lang="ts">
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase";

defineProps<{ name: string }>()

const name = "super epic guys"
const acceptInvite = async () => {
    if(!auth.currentUser) return

    const groupRef = doc(db, "groups", name);
    const userRef = doc(db, "users", auth.currentUser?.uid);

    await updateDoc(groupRef, {
        members: arrayUnion(auth.currentUser?.displayName)
    });

    await updateDoc(userRef, {
        groups: arrayUnion(name)
    });

    await removeInvite()
}

const declineInvite = async () => {
    await removeInvite()
}

const removeInvite = async () => {
    if(!auth.currentUser) return

    const docRef = doc(db, "users", auth.currentUser?.uid);
    await updateDoc(docRef, {
        invites: arrayRemove(name)
    });
}

</script>

<template>
        <div class=" flex flex-col justify-center items-center gap-5 bg-base-content text-lg font-semibold text-primary-content rounded-lg  p-10" >
            <h2>{{ name }}</h2>
            <div class="flex gap-5">
                <button @click="acceptInvite" class="btn btn-primary">Accept</button>
                <button @click="declineInvite" class="btn btn-secondary">Decline</button>
            </div>
        </div>
</template>