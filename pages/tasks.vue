<template>
    <header class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
        </div>
        <div class="flex gap-2 items-center">
            <!--<Button><Icon name="lucide:list" /></Button>
            <Button><Icon name="lucide:calendar-days" /></Button>-->
            <AppSheet v-model:open="isSheetOpen" @update="toggleSheet" class="flex flex-col h-full w-full overflow-y-auto">
                <SheetHeader class="flex flex-col w-full mb-4">
                    <SheetTitle class="flex flex-col items-center gap-2">
                        <div class="flex items-center gap-2">
                            <Button variant="outline" @click="taskFeedback(selectedTask)">
                                <Icon name="lucide:messages-square" class="w-4 h-4 flex items-center justify-center" />
                            </Button>
                            <Button variant="outline" @click="taskAttachment(selectedTask)">
                                <Icon name="lucide:paperclip" class="w-4 h-4 flex items-center justify-center" />
                            </Button>
                            <Button variant="outline" @click="editTask(selectedTask)">
                                <Icon name="lucide:pencil" class="w-4 h-4 flex items-center justify-center" />
                            </Button>   
                            <Button variant="destructive" @click="deleteTask(selectedTask)">
                                <Icon name="lucide:trash" class="w-4 h-4 flex items-center justify-center" />
                            </Button>
                        </div>
                        <div class="flex flex-col items-start w-full gap-2">
                            <span class="text-sm text-gray-500 ml-1">TRIP{{ selectedTask.task_id }}</span>
                            <h2 class="text-sm"> 
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Avatar>
                                            <AvatarImage :src="selectedTask.task_created_by_user.avatar_url" :alt="`${selectedTask.task_created_by_user.user_first_name} ${selectedTask.task_created_by_user.user_last_name}`" />
                                            <AvatarFallback>{{ selectedTask.task_created_by_user.user_first_name[0]}}{{ selectedTask.task_created_by_user.user_last_name[0] }}</AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {{ selectedTask.task_created_by_user.user_first_name }} {{ selectedTask.task_created_by_user.user_last_name }}
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                                {{ selectedTask.task_name }}
                            </h2>
                        </div>
                    </SheetTitle>
                    <SheetDescription>
                        {{ selectedTask.task_description }}
                    </SheetDescription>
                </SheetHeader>
                <div class="flex-1 overflow-y-auto hide-scrollbar">
                    <TaskFeedback :feedbacks="feedbacks" @deleteFeedback="deleteFeedback" />
                </div>
                <SheetFooter>
                </SheetFooter>
            </AppSheet>
            <DialogAddTask v-model:open="isDialogOpen" @success="onSuccess" :task="task"/>
            <DialogAddTaskFeedback v-model:open="isFeedbackDialogOpen" @success="onFeedbackSuccess" :feedback="feedback" :task="selectedTask"/>
        </div>
    </header>
    <div>
        
        <div class="flex gap-2 items-center my-2 justify-between">
        <Button variant="" @click="addTask"><Icon name="lucide:plus" size="24" /> Task</Button>
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-0.5">
                <Input v-model="search" placeholder="Search" />
                <Button variant="outline" class="flex items-center gap-1" @click="onPageChange(1)"><Icon name="lucide:search"/>Search</Button>
            </div>
            <SelectDate v-bind:value="date" />
            <SelectUser :availableUsers="users" v-bind:selectedUsers="searchSelectedUsers" id="user-search" />
            <Button variant="outline" @click="clearFilter"><Icon name="lucide:x" size="24" /></Button>
        </div>
        </div>
        <div class="flex gap-2 items-center my-2">
            <div v-for="(user, index) in searchSelectedUsers" :key="index" class="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold flex items-center">
                {{ user.user_first_name }} {{ user.user_last_name }}
                <button @click="() => { searchSelectedUsers.splice(index, 1)}" class="ml-2 text-sm text-gray-700 hover:text-red-500"><Icon name="lucide:x" class="w-4 h-4 flex items-center justify-center" /></button>
            </div>
        </div>
    </div>
    <main class="flex flex-col gap-4">
        <DataTable :headers="headers" :rows="rows" :meta="meta" @pageChange="onPageChange" @rowClick="rowClick"/>
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
            isSheetOpen: false,
            isDialogOpen: false,
            isFeedbackDialogOpen: false,
            searchUsers: [],
            searchSelectedUsers: [],
            date: {
                start: null,
                end: null
            },
            task: {
                task_id: null,
                task_name: '',
                task_description: '',
                users: [],
                selectedUsers: [],
                task_is_complete: false,
                task_is_discussed: false,
                task_start_date: null,
                task_end_date: null,
                task_date: {
                    start: null,
                    end: null
                },
                feedback: []
            },
            tasks: [],
            search: '',
            open: false,
            meta: null,
            headers: [
                {
                    id: 'task_id',
                    name: 'ID'
                },
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
                    id: 'task_status',
                    name: 'Status',
                    type: 'badge',
                    render: (row) => {
                        if(row.task_is_complete) {
                            return 'complete'
                        }
                        const today = new Date()
                        //console.log(row.task_end_date, today)
                        if(row.task_end_date && new Date(row.task_end_date) < today) {
                            return 'overdue'
                        }
                        if(row.task_is_discussed) {
                            return 'communicated'
                        }
                        return ''
                    }
                }
            ],
            rows: [],
            feedback: {
                feedback: ''
            },
            feedbacks: []
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
        editTask,
        rowClick,
        toggleSheet,
        clearFilter,
        taskFeedback,
        taskAttachment,
        toggleDialog,
        toggleFeedbackDialog,
        getTaskFeedback,
        onFeedbackSuccess,
        deleteFeedback
    },
    mounted(){
        this.getUsers({
            limit : 9999
        })
        this.getTasks()
    }
}

function rowClick(row) {
    //console.log('rowClick')
    //console.log(row)
    this.selectedTask = row;
    this.toggleSheet();
}

function toggleSheet() {
    //console.log('toggleSheet')
    this.isSheetOpen = !this.isSheetOpen;
    if(this.isSheetOpen) {
        this.getTaskFeedback(this.selectedTask)
    }
}

function toggleDialog() {
    this.isDialogOpen = !this.isDialogOpen
}

function toggleFeedbackDialog() {
    this.isFeedbackDialogOpen = !this.isFeedbackDialogOpen
}

function addTask() {
    this.task = {
        task_id: null,
        task_name: '',
        task_description: '',
        selectedUsers: [],
        users: this.task.users,
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
    //console.log('addTask', this.task)
    this.toggleDialog()
}

function editTask(row) {
    this.task = {
        task_id: row.task_id,
        task_uuid: row.task_uuid,
        task_name: row.task_name,
        task_description: row.task_description,
        users: this.task.users,
        selectedUsers: row.assignedUsers,
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
    //console.log('editTask', this.task)
    this.toggleDialog()
}

function taskFeedback() {
    //console.log('taskFeedback')
    this.feedback = {
        feedback: ''
    }
    this.toggleFeedbackDialog()
}

async function getTaskFeedback(task) {
    //console.log('getFeedback', task.task_id)
    const api = useApi()
    const response = await api.get(`/task/get-feedback/${task.task_id}`)
    //console.log(response)
    this.feedbacks = response.taskFeedback
}

function taskAttachment(row) {
    //console.log('taskAttachment', row)
}

function onPageChange(page = 1) {
    const filter = {
        page: page,
        start_date: this.date.start ? new Date(this.date.start).toISOString() : null,
        end_date: this.date.end ? new Date(this.date.end).toISOString() : null,
        users: this.searchSelectedUsers,
        search: this.search
    }
    //console.log(filter)
    this.getTasks(filter)
}

async function getUsers(params = {}) {
    const api = useApi();
    const response = await api.get('/user/get-all', params)
    //console.log(response)
    this.users = response.users
    this.meta = response.meta
    this.task.users = response.users
    this.searchUsers = response.users
}

function onSuccess() {
    this.getTasks()
    this.toggleDialog()
    this.toggleSheet()
}

function onFeedbackSuccess() {
    //this.getTasks()
    //console.log('onFeedbackSuccess')
    this.toggleFeedbackDialog()
    this.getTaskFeedback(this.selectedTask)
    //this.toggleSheet()
}

async function getTasks(filter = null) {
    const api = useApi();
    const response = await api.get('/task/get-all', filter)
    //console.log(response)
    this.rows = response.tasks
    this.meta = response.meta
}

async function deleteTask(task) {
    try{
        //console.log(task)
        const api = useApi();
        const response = await api._delete(`/task/delete/${task.task_uuid}`)
        //console.log(response)
        toast.success('Task deleted successfully')
        this.toggleSheet();
        this.getTasks()
    } catch (error) {
        toast.error('Error deleting task')
    }
}

async function deleteFeedback(feedback) {
    const feedback_uuid = feedback.task_feedback_uuid;
    console.log(feedback_uuid)
    try{
        const api = useApi()
        const response = await api._delete(`/task/delete-feedback/${feedback_uuid}`)
        console.log(response)
        toast.success('Feedback deleted successfully')
        this.getTaskFeedback(this.selectedTask)
    } catch (error) {
        toast.error('Error deleting feedback')
    }
}

function clearFilter() {
    this.date = {
        start: null,
        end: null
    }
    this.search = ''
    this.searchSelectedUsers = []
    this.getTasks()
}
</script>
<style>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>