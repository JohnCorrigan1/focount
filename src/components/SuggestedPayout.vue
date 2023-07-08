<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'

interface Member {
    name: string;
    balance: number;
}

interface Payout {
    from: string;
    to: string;
    amount: string;
}

const route = useRoute()
const members = ref<Member[]>([])
const payouts = ref<Payout[]>([])

const calculatePayouts = async () => {
    await getMembers()
    console.log(members.value)
    //sort membersby balance descending
    members.value.sort((a: Member, b: Member) => {
        return b.balance - a.balance
    })
    const membersOwed: Member[] = [];
    const membersOwing: Member[] = [];

    members.value.forEach((member: Member) => {
        if(member.balance > 0) {
            membersOwed.push(member)
        } else if(member.balance < 0) {
            membersOwing.push(member)
        }
    })
    //sort membersOwing in ascending order
    membersOwing.sort((a: Member, b: Member) => {
        return a.balance - b.balance
    })

    console.log("Members owed:", membersOwed)
    console.log("Members owing:", membersOwing)

    let balance = 0;
    membersOwed.forEach((member) => {
        membersOwing.forEach((member2) => {
            if(member.balance > 0 && member2.balance < 0) {
                console.log("test")
                if(member.balance + member2.balance > 0) {
                    balance = member2.balance
                    member.balance += member2.balance
                    member2.balance = 0
                } else {
                    balance = member.balance
                    member2.balance += member.balance
                    member.balance = 0
                }
                payouts.value.push({
                    from: member2.name,
                    to: member.name,
                    amount: balance.toFixed(2)
                })
            }
        })
        console.log("payouts:", payouts.value)
   })
}

const getMembers = async () => {
    const docRef = doc(db, "groups", route.params.group.toString().replace(/_/g,' '));
    const querySnapshot = await getDoc(docRef);
    members.value = querySnapshot.data()?.members;
}

onMounted(() => {
    calculatePayouts()
})

</script>

<template>

    <div v-for="payout in payouts">
        <div>{{payout.from}} owes {{payout.to}} {{payout.amount}}</div>
    </div>
</template>