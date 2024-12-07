<template>
    <Dialog v-bind:open="isOpen">
        <DialogContent class="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogDescription v-if="!task.task_id">Add a new task to the calendar</DialogDescription>
                <DialogTitle class="flex gap-2 items-center">
                    <SelectDate v-bind:value="task.date" />
                    <!-- Select User -->
                    <SelectUser v-bind:selectedUsers="task.selectedUsers" :availableUsers="task.users" id="user-search-task"/>
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <div class="flex gap-2 items-center flex-wrap">
                    <div v-for="(user, index) in task.selectedUsers" :key="index" class="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold flex items-center">
                        {{ user.user_first_name }} {{ user.user_last_name }}
                        <button @click="() => { task.selectedUsers.splice(index, 1);}" class="ml-2 text-sm text-gray-700 hover:text-red-500"><Icon name="lucide:x" class="w-4 h-4 flex items-center justify-center" /></button>
                    </div>
                </div>
            </DialogDescription>
            <Input v-model="task.task_name" placeholder="Title" />
            <Textarea v-model="task.task_description" placeholder="Description" class="min-h-[100px]" />
            <div>
                <div class="flex items-center space-x-2">
                    <Checkbox id="isDiscussed" v-model:checked="task.task_is_discussed" />
                    <label for="isDiscussed" class="text-sm cursor-pointer">
                        Task has been discussed
                    </label>
                </div>
                <div class="flex items-center space-x-2">
                    <Checkbox id="isComplete" v-model:checked="task.task_is_complete" />
                    <label for="isComplete" class="text-sm cursor-pointer">
                        Task is complete
                    </label>
                </div>
            </div>
            <div>
                {{ task.use }}
            </div>
            <DialogFooter>
                <Button @click="save" v-if="!task.task_id">Save</Button>
                <Button @click="update" v-else>Update</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script>
const toast = useToast()
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: true
        },
        task: {
            type: Object,
            default: {
                task_id: null,
                task_name: '',
                task_description: '',
                task_assigned_to: [],
                task_is_complete: false,
                task_is_discussed: false,
                task_date: {
                    start: null,
                    end: null
                }
            }
        },
    },
    data() {
        return {
            date: {
                start: null,
                end: null
            },
            users: [],
            open: false,
        }
    },
    methods: {
        save,
        update,
        getUsers
    },
    mounted(){
        //this.getUsers()
    }
}

async function save() {
   try{
        const api = useApi();
        const response = await api.post('/task/create', {
            task_name: this.task.task_name,
            task_description: this.task.task_description,
            task_start_date: this.task.date.start ? new Date(this.task.date.start).toISOString().split('T')[0] : null,
            task_end_date: this.task.date.end ? new Date(this.task.date.end).toISOString().split('T')[0] : null,
            task_assigned_to: this.task.selectedUsers.map(user => user.user_id),
            task_is_complete: this.task.task_is_complete,
            task_is_discussed: this.task.task_is_discussed
        })
        console.log(response)
        this.$emit('success');
        toast.success('Task created successfully')
    } catch (error) {
        console.log(error)
        toast.error('Error creating task')
   }
}

async function update() {
    console.log('Update', this.task)
    try{
        const api = useApi();
        const response = await api.put(`/task/update/${this.task.task_uuid}`, {
            task_name: this.task.task_name,
            task_description: this.task.task_description,
            task_start_date: this.task.date.start ? new Date(this.task.date.start).toISOString().split('T')[0] : null,
            task_end_date: this.task.date.end ? new Date(this.task.date.end).toISOString().split('T')[0] : null,
            task_assigned_to: this.task.selectedUsers.map(user => user.user_id),
            task_is_complete: this.task.task_is_complete,
            task_is_discussed: this.task.task_is_discussed,
        })
        console.log(response)
        this.$emit('success');
        toast.success('Task updated successfully')
    } catch (error) {
        console.log(error)
        toast.error('Error updating task')
    }
}

async function getUsers() {
    console.log('getUsers in task dialog')
    const api = useApi();
    const response = await api.get('/user/get-all')
    console.log(response)
    this.users = response.users
}
</script>