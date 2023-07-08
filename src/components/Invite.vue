<script setup lang="ts">
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const props = defineProps<{ name: string }>()

interface Member {
    name: string;
    balance: number;
    // balances: {name: string, balance: number}[];
}

// const name = "super epic guys"


const acceptInvite = async () => {
    if(!auth.currentUser) return

    
    const groupRef = doc(db, "groups", props.name);
    const querySnapshot = await getDoc(groupRef);
    const members: Member[] = querySnapshot.data()?.members;
    // members.forEach((member: Member) => {
        // member.balances.push({name: auth.currentUser?.displayName!, balance: 0})
    // })
    
    const newMember = {
        name: auth.currentUser?.displayName!,
        balance: 0,
        // balances: members.map((member: Member) => {
            // return {name: member.name, balance: 0}
        // })
    }
    
    members.push(newMember)

    await updateDoc(groupRef, {
        members: members
    }) 
    // const members: Member[] = await getDoc(groupRef).data()?.members
    const userRef = doc(db, "users", auth.currentUser?.uid);

    // await updateDoc(groupRef, {
        // members: arrayUnion({name: auth.currentUser?.displayName, balance: 0})
    // });

    await updateDoc(userRef, {
        groups: arrayUnion(props.name)
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