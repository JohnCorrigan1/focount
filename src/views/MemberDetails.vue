<script setup lang="ts">
import { useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue';
import MemberDetailsTable from '../components/MemberDetailsTable.vue';

const route = useRoute();
</script>

<template>
    <main class="min-h-screen min-w-screen">
        <NavBar />
        <div class="flex flex-col items-center justify-center">
            <h1 class="text-4xl font-bold">Member Details</h1>
            <p class="text-xl font-semibold">Group: {{ route.params.group.toString().replace(/_/g,' ') }}</p>
            <p class="text-xl font-semibold">Member: {{ route.params.member.toString().replace(/_/g,' ') }}</p>
        </div>
        <MemberDetailsTable />
    </main>
</template>