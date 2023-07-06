<script setup lang="ts">
  import { useRoute } from 'vue-router'

  defineProps<{ name: string, balance: number, img: string }>()
  const route = useRoute()

</script>

<template>
   <tr class="grid grid-cols-4 w-full">
       <td class="w-full flex justify-center items-center">
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="../assets/vue.svg" :alt="name" />
              </div>
            </div>
        </div>
        </td>
        <td class="w-full flex justify-center items-center">
            <div>
              <div class="font-bold">{{name}}</div>
              <!-- <div class="text-sm opacity-50">United States</div> -->
          </div>
        </td>
        <td :class="`${balance < 0 ? 'text-red-500' : 'text-emerald-500'} w-full flex justify-center items-center`">
            Balance: ${{ balance.toFixed(2) }}
          <br/>
          <!-- <span class="badge badge-ghost badge-sm">Desktop Support Technician</span> -->
        </td>
        <!-- <td>Purple</td> -->
        <th class="w-full flex justify-center items-center">
          <router-link :to="{ name: 'memberDetails', params: { group: route.params.group.toString().replace(/ /g,'_'), member: name.replace(/ /g,'_')}}">
            <button class="btn btn-ghost ">details</button>
          </router-link>
        </th>
      </tr>
    
</template>