<script setup lang="ts">
import { ref } from "vue";
import { auth, db } from "../firebase";
import { onMounted } from "vue";
import { getDoc, doc } from "firebase/firestore";

interface Member {
    name: string;
    balance: number;
}

const balance = ref(0)
// const groups = ref<string[]>([])

const getGroups = async () => {
    if(!auth.currentUser) return

    const docRef = doc(db, "users", auth.currentUser?.uid);
    const querySnapshot = await getDoc(docRef);
    const groups = querySnapshot.data()!.groups
    groups.forEach((group: any) => {
        const groupRef = doc(db, "groups", group);
        getBalance(groupRef)   
    })
}

const getBalance = async (groupRef: any) => {
    if(!auth.currentUser) return

    const querySnapshot: any = await getDoc(groupRef);
    querySnapshot.data()?.members.forEach((member: Member) => {
        if(member.name === auth.currentUser?.displayName) {
            balance.value = member.balance
        }
    })
}

onMounted(() => {
    getGroups()
})

</script>

<template>
    <div>
        <h1>Balance</h1>
        <div>
            <p :class="`${balance < 0 ? 'text-red-500' : 'text-emerald-500'}`" >${{balance.toFixed(2)}}</p>
        </div>
    </div>
</template>