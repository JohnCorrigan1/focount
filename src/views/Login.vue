<script setup lang="ts">
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import router from "../router/index";

const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    checkUser();

    router.push({ name: "home" });
    
};

const checkUser = async () => {
    if(auth.currentUser)
    {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        } else {
            addUser();
        }
    }  
}

const addUser = async () => {
    if(auth.currentUser)
await setDoc(doc(db, "users", auth.currentUser.uid), {
  displayName: auth.currentUser.displayName,
  groups: [],
  balance: 0,
});
}


</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <button
          class="bg-zinc-200 max-w-[300px] rounded-md p-2 flex gap-8 items-center shadow-sm border w-full text-black justify-center active:scale-95 duration-300"
          @click="signInWithGoogle"
        >
          <img
          class="w-8 h-8"
            src="../assets/google.png"
            alt="Google sign in"
          />{{" "}}
          Sign in with Google
        </button>
    </div>
</template>