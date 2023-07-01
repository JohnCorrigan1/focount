<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import Invite from "../components/Invite.vue"
import { auth, db } from "../firebase";
import { onMounted, ref } from "vue";
import { getDoc, doc } from "firebase/firestore";

const invites = ref<string[]>([])

const getInvites = async () => {
    console.log(auth.currentUser)
    if(!auth.currentUser) return

    const docRef = doc(db, "users", auth.currentUser?.uid);
    const querySnapshot = await getDoc(docRef);
    querySnapshot.data()!.invites.forEach((invite: any) => {
        invites.value.push(invite)
    })
}

onMounted(() => {
    getInvites()
})

</script>

<template>
    <NavBar />
    <div>profile page</div>
    <div class="flex gap-5" >
        <Invite v-for="invite in invites" :name="invite" />
    </div>
</template>