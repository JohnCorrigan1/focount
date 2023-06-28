<script setup lang="ts">

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
//import { useAuthState } from "react-firebase-hooks/auth";


const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    console.log(auth.currentUser);
};


</script>

<template>
    <button @click="signInWithGoogle" class="btn btn-primary">Sign in with Google</button>
</template>