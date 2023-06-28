<script setup lang="ts"></script>
<template>
        <div class="flex flex-col items-center gap-10 ">
            <h1 class="text-2xl font-semibold">Create a group</h1>

            <div class="flex flex-col w-1/2">
                <label>Group Name</label>
                <input placeholder="cool epic guys" class="input input-primary" />
            </div>

            <div class="flex flex-col w-1/2">
                <label for="">Group description</label>
                <textarea placeholder="House of super rich handsome epic cool people that do cool stuff..." type="text" class="textarea textarea-primary"/>
            </div>

            <button class="btn btn-primary w-1/4">Create</button>
            

        </div>
</template>