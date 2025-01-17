<template>
    <Card>
        <CardHeader>
            <CardTitle class="flex justify-between items-center">
                <div>
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar>
                                <AvatarImage :src="task.task_created_by_user.avatar_url" :alt="`${task.task_created_by_user.user_first_name} ${task.task_created_by_user.user_last_name}`" />
                                <AvatarFallback>{{ task.task_created_by_user.user_first_name[0]}}{{ task.task_created_by_user.user_last_name[0] }}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ task.task_created_by_user.user_first_name }} {{ task.task_created_by_user.user_last_name }}
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                    <span class="text-gray-500 ml-1">TRIP{{ task.task_id }}</span>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-col gap-2 mb-4">
                <SelectDate v-bind:value="date"/>
                <SelectUser :availableUsers="users" v-bind:selectedUsers="selectedUsers"/>
                <div class="flex flex-col gap-2 justify-start">
                    <div v-for="(user, index) in selectedUsers" :key="index" class="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold flex justify-between items-center">
                        {{ user.user_first_name }} {{ user.user_last_name }}
                        <button @click="removeSelectedUser(index)" class="ml-2 text-sm text-gray-700 hover:text-red-500"><Icon name="lucide:x" class="w-4 h-4 flex items-center justify-center" /></button>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <Input v-model="task.task_name" placeholder="Title" />
                <Textarea v-model="task.task_description" placeholder="Description" class="min-h-[100px]" />
            </div>
            <div class="flex flex-col gap-1 mt-4">
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
        </CardContent>
        <CardFooter>
            <Button @click="updateTask">Save</Button>
        </CardFooter>
    </Card>
</template>
<script>
const toast = useToast();
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            date: {
                start: this.task.task_start_date,
                end: this.task.task_end_date
            },
            users: [],
            searchSelectedUsers: [],
            selectedUsers: this.task.assignedUsers,
            isDiscussed: ref(this.task.task_is_discussed),
            isComplete: ref(this.task.task_is_complete)
        }
    },
    mounted(){
        this.getUsers();
        console.log(this.task.assignedUsers);
    },
    methods: {
        async getUsers(){
            try{
                const response = await useApi().get('/user/get-all', {
                    page: 1,
                    limit: 1000
                });
                this.users = response.users;
                //console.log(this.users);
            }catch(error){
                console.error(error);
            }
        },
        removeSelectedUser(index){
            this.selectedUsers.splice(index, 1);
        },
        async updateTask(){
            console.log(this.task);
            try{
                const update = {
                    task_name: this.task.task_name,
                    task_description: this.task.task_description,
                    task_start_date: this.date.start ? new Date(this.date.start).toISOString().split('T')[0] : null,
                    task_end_date: this.date.end ? new Date(this.date.end).toISOString().split('T')[0] : null,
                    task_assigned_to: this.selectedUsers.map(user => user.user_id),
                    task_is_complete: this.task.task_is_complete,
                    task_is_discussed: this.task.task_is_discussed
                }
                console.log(update);
                const response = await useApi().put(`/task/update/${this.task.task_uuid}`, update);
                console.log(response);
                this.$emit('task-updated', response);
                toast.success('Task updated');
            }catch(error){
                console.error(error);
                toast.error('Error updating task');
            }
        }
    },
}
</script>