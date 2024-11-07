<template>
    <header class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
            <h1>Tasks</h1>
        </div>
        <div class="flex gap-2 items-center">
            <Button><Icon name="lucide:list" /></Button>
            <Button><Icon name="lucide:calendar-days" /></Button>
            <Button @click="toggleDialog"><Icon name="lucide:plus" size="24" /> Task</Button>
            <DialogAddTask v-model:open="isDialogOpen" />
        </div>
    </header>
    <div class="flex gap-2 items-center ">
        <SelectDate v-bind:value="date" />
        <SelectUser v-bind:selectedUsers="selectedUsers" v-bind:users="users" />
    </div>
    <div class="flex gap-2 items-center my-2">
        <div v-for="(user, index) in selectedUsers" :key="index" class="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold flex items-center">
            {{ user.user_first_name }} {{ user.user_last_name }}
            <button @click="() => { selectedUsers.splice(index, 1); users.push(user) }" class="ml-2 text-sm text-gray-700 hover:text-red-500"><Icon name="lucide:x" class="w-4 h-4 flex items-center justify-center" /></button>
        </div>
    </div>
    <main class="flex flex-col gap-4">
        <DataTable :headers="headers" :rows="rows" :rowActions="rowActions" />
    </main>
</template>
<script>
definePageMeta({
    layout: 'loggedin',
    middleware: ['auth']
})
export default {
    name: 'TasksPage',
    data() {
        return {
            date: {
                start: null,
                end: null
            },
            tasks: [],
            isDialogOpen: false,
            open: false,
            selectedUsers: [],
            users: [],
            headers: [
                {
                    id: 'title',
                    name: 'Task'
                }
            ],
            rows: [
                {
                    id: 1,
                    title: 'Task 1'
                }
            ],
            rowActions: [
                {
                    id: 1,
                    name: 'Edit',
                    action: () => {
                        console.log('Edit')
                    },
                    icon: 'lucide:pencil'
                },
                {
                    id: 2,
                    name: 'Delete',
                    action: () => {
                        console.log('Delete')
                    },
                    icon: 'lucide:trash'
                }
            ]
        }
    },
    methods: {
        toggleDialog,
        getUsers
    },
    mounted(){
        this.getUsers()
    }
}

function toggleDialog() {
    this.isDialogOpen = !this.isDialogOpen
}

async function getUsers() {
    const api = useApi();
    const response = await api.get('/user/get-all')
    console.log(response)
    this.users = response.users
}
</script>
<style>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>