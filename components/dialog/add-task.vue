<template>
    <Dialog v-bind:open="isOpen">
        <DialogContent class="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogDescription>Add a new task to the calendar</DialogDescription>
                <DialogTitle class="flex gap-2 items-center">
                    <SelectDate v-bind:value="date" />
                    <!-- Select User -->
                    <SelectUser v-bind:selectedUsers="selectedUsers" v-bind:users="users" />
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <div class="flex gap-2 items-center flex-wrap">
                    <div v-for="(user, index) in selectedUsers" :key="index" class="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold flex items-center">
                        {{ user.user_first_name }} {{ user.user_last_name }}
                        <button @click="() => { selectedUsers.splice(index, 1); users.push(user) }" class="ml-2 text-sm text-gray-700 hover:text-red-500"><Icon name="lucide:x" class="w-4 h-4 flex items-center justify-center" /></button>
                    </div>
                </div>
            </DialogDescription>
            <Input v-model="title" placeholder="Title" />
            <Textarea v-model="description" placeholder="Description" class="min-h-[100px]" />
            <DialogFooter>
                <Button @click="save">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            title: '',
            description: '',
            selectedUsers: [],
            date: {
                start: null,
                end: null
            },
            users: [],
            open: false
        }
    },
    methods: {
        save,
        getUsers
    },
    mounted(){
        this.getUsers()
    }
}

async function save() {
    console.log(this.title, this.description, this.selectedUsers, this.date)
    const api = useApi();
    const response = await api.post('/task/create', {
        task_name: this.title,
        task_description: this.description,
        task_start_date: new Date(this.date.start).toISOString().split('T')[0],
        task_end_date: new Date(this.date.end).toISOString().split('T')[0],
        task_assigned_to: this.selectedUsers.map(user => user.user_id)
    })
    console.log(response)
}

async function getUsers() {
    const api = useApi();
    const response = await api.get('/user/get-all')
    console.log(response)
    this.users = response.users
}
</script>