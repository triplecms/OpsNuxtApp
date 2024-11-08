<template>
    <header class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
            <h1>Tasks</h1>
        </div>
        <div class="flex gap-2 items-center">
            <!--<Button><Icon name="lucide:list" /></Button>
            <Button><Icon name="lucide:calendar-days" /></Button>-->
            <Button @click="addTask"><Icon name="lucide:plus" size="24" /> Task</Button>
            <DialogAddTask v-model:open="isDialogOpen" @success="onSuccess" :task="task"/>
        </div>
    </header>
    <div class="flex gap-2 items-center my-2">
        <SelectDate v-bind:value="date" />
        <SelectUser v-bind:selectedUsers="selectedUsers" v-bind:users="users" />
        <div class="flex items-center gap-0.5">
            <Input v-model="search" placeholder="Search" />
            <Button variant="outline" class="flex items-center gap-1" @click="onPageChange(1)"><Icon name="lucide:search"/>Search</Button>
        </div>
    </div>
    <div class="flex gap-2 items-center my-2">
        <div v-for="(user, index) in selectedUsers" :key="index" class="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold flex items-center">
            {{ user.user_first_name }} {{ user.user_last_name }}
            <button @click="() => { selectedUsers.splice(index, 1); users.push(user) }" class="ml-2 text-sm text-gray-700 hover:text-red-500"><Icon name="lucide:x" class="w-4 h-4 flex items-center justify-center" /></button>
        </div>
    </div>
    <main class="flex flex-col gap-4">
        <DataTable :headers="headers" :rows="rows" :rowActions="rowActions" :meta="meta" @pageChange="onPageChange" />
    </main>
</template>
<script>

definePageMeta({
    layout: 'loggedin',
    middleware: ['auth']
})
const toast = useToast()
export default {
    name: 'TasksPage',
    data() {
        return {
            date: {
                start: null,
                end: null
            },
            task: {
                task_id: null,
                task_name: '',
                task_description: '',
                task_assigned_to: [],
                task_is_complete: false,
                task_is_discussed: false,
                task_start_date: null,
                task_end_date: null,
                task_date: {
                    start: null,
                    end: null
                }
            },
            tasks: [],
            search: '',
            isDialogOpen: false,
            open: false,
            selectedUsers: [],
            users: [],
            meta: null,
            headers: [
                {
                    id: 'task_name',
                    name: 'Task'
                },
                {
                    id: 'task_end_date',
                    name: 'Due',
                    render: (row) => {
                        const date = new Date(row.task_end_date).toLocaleDateString()
                        if (date === '01/01/1970') {
                            return ''
                        }
                        return date
                    }
                },
                {
                    id: 'assignedUsers',
                    name: 'Assignment',
                    type: 'avatar_list',
                },
                {
                    id: 'task_is_discussed',
                    name: 'Discussed',
                    icon: 'lucide:message-circle',
                    type: 'checkbox',
                    iconClass: 'flex items-center justify-center w-full h-4'
                },
                {
                    id: 'task_is_complete',
                    name: 'Complete',
                    icon: 'lucide:check',
                    type: 'checkbox',
                    iconClass: 'flex items-center justify-center w-full h-4'
                }
            ],
            rows: [],
            rowActions: [
                {
                    id: 1,
                    name: 'Edit',
                    action: (row) => {
                        console.log('Edit')
                        this.editTask(row)
                    },
                    icon: 'lucide:pencil'
                },
                {
                    id: 2,
                    name: 'Delete',
                    action: (row) => {
                        console.log('Delete')
                        this.deleteTask(row.task_uuid)
                    },
                    icon: 'lucide:trash'
                },
                
            ]
        }
    },
    methods: {
        toggleDialog,
        getUsers,
        getTasks,
        deleteTask,
        onSuccess,
        onPageChange,
        addTask,
        editTask
    },
    mounted(){
        this.getUsers()
        this.getTasks()
    }
}

function addTask() {
    this.task = {
        task_id: null,
        task_name: '',
        task_description: '',
        task_assigned_to: [],
        task_is_complete: false,
        task_is_discussed: false,
        task_start_date: null,
        task_end_date: null,
        task_date: null,
        date: {
            start: null,
            end: null
        }
    }
    this.toggleDialog()
}

function editTask(row) {
    console.log(row)
    this.task = {
        task_id: row.task_id,
        task_uuid: row.task_uuid,
        task_name: row.task_name,
        task_description: row.task_description,
        task_assigned_to: row.task_assigned_to,
        task_is_complete: row.task_is_complete == '1' ? true : false,
        task_is_discussed: row.task_is_discussed == '1' ? true : false,
        task_date: row.task_date,
        task_start_date: row.task_start_date,
        task_end_date: row.task_end_date,
        date: {
            start: row.task_start_date,
            end: row.task_end_date
        }
    }
    this.toggleDialog()
}

function toggleDialog() {
    this.isDialogOpen = !this.isDialogOpen
}

function onPageChange(page = 1) {
    const filter = {
        page: page,
        start_date: this.date.start ? new Date(this.date.start).toISOString() : null,
        end_date: this.date.end ? new Date(this.date.end).toISOString() : null,
        users: this.selectedUsers,
        search: this.search
    }
    console.log(filter)
    this.getTasks(filter)
}

async function getUsers(params = {}) {
    const api = useApi();
    const response = await api.get('/user/get-all', params)
    console.log(response)
    this.users = response.users
    this.meta = response.meta
}

function onSuccess() {
    this.getTasks()
    this.toggleDialog()
}

async function getTasks(filter = null) {
    const api = useApi();
    const response = await api.get('/task/get-all', filter)
    console.log(response)
    this.rows = response.tasks
    this.meta = response.meta
}

async function deleteTask(task) {
    try{
        console.log(task)
        const api = useApi();
        const response = await api._delete(`/task/delete/${task}`)
        console.log(response)
        toast.success('Task deleted successfully')
        this.getTasks()
    } catch (error) {
        toast.error('Error deleting task')
    }
}
</script>
<style>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>