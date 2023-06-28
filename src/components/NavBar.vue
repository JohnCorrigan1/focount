<script setup lang="ts">
import { auth } from '../firebase';
import router from '../router/index';

const logout = async () => {

    console.log(auth.currentUser);
    router.push({ name: "login" });
    await auth.signOut();
    console.log("logging out")
    console.log(auth.currentUser);
}

</script>

<template>
   <div class="navbar bg-base-100">
  <div class="flex-1">
    <router-link to="/" class="btn btn-ghost normal-case text-xl">FoCount</router-link>
  </div>
  <div class="flex-none">
   <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="../assets/vue.svg" />
        </div>
      </label>
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <router-link to="/profile" class="justify-between">
            Profile
          </router-link>
        </li>
        <li><a>Settings</a></li>
        <li @click="logout"><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div> 
</template>