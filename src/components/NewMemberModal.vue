<script setup lang="ts">
import { ref } from "vue";
import { getDocs, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./../firebase.ts";
import { useRoute } from "vue-router";

const email = ref("");
// const users = ref<any>([]);
const route = useRoute();

const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(data.email == email.value){
            inviteMember(doc.id)
            return;
        }
    });
}

const inviteMember = async (uid: string) => {
    console.log(email.value);
    console.log(uid)
//    const userRef = doc(db, "users", uid.value);

// Set the "capital" field of the city 'DC'
await updateDoc(doc(db, "users", uid), {
    invites: arrayUnion(route.params.group.toString().replace(/_/g,' '))
});   
}

// const sendInvite = () => {
//    const docRef =  
// }
</script>

<template>
<div class="w-full p-10 flex flex-col items-center gap-10">
    <div class="flex flex-col">
        <label>Username</label>
        <input class="input input-primary" v-model="email" type="text" />
    </div>
    <button @click="getUsers"  class="btn btn-primary">Invite</button>
</div>
</template>
