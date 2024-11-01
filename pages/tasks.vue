<template>
    <header class="flex justify-between items-center">
        <h1>Tasks</h1>
        <div class="flex gap-2 items-center">
            <Icon name="lucide:search" size="24" />
            <Input type="text" placeholder="Search" />
            <Button @click="toggleDialog"><Icon name="lucide:plus" size="24" /> Add Task</Button>
            <DialogAddTask v-model:open="isDialogOpen" />
        </div>
    </header>
    <main class="flex flex-col gap-4">
        
    </main>
</template>
<script>
definePageMeta({
    layout: 'loggedin'
})
export default {
    name: 'TasksPage',
    data() {
        return {
            tasks: [],
            isDialogOpen: false,
            open: false
        }
    },
    methods: {
        toggleDialog
    }
}

function toggleDialog() {
    this.isDialogOpen = !this.isDialogOpen
}
</script>
