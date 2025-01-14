<template>
    <Card>
        <CardHeader>
            <CardTitle>
                Feedback
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div>
                <ul class="flex flex-col gap-2">
                    <li v-for="feedback in feedbackArray" :key="feedback.task_feedback_id" class="flex items-start gap-2">
                        <div class="flex items-center space-x-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Avatar>
                                <AvatarFallback>{{ feedback.user_first_name[0]}}{{ feedback.user_last_name[0] }}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ task.task_created_by_user.user_first_name }} {{ task.task_created_by_user.user_last_name }}
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                    </div>
                    <div>
                        <span class="text-gray-500 text-sm">{{ formatDate(feedback.task_feedback_date) }}</span>
                        <p class="text-sm">{{ feedback.task_feedback_feedback }}</p>
                    </div>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col gap-2 my-4">
                <Textarea v-model="feedback" placeholder="Description" class="min-h-[100px]" />
            </div>
        </CardContent>
        <CardFooter>
            <Button @click="addFeedback">Add Feedback</Button>
        </CardFooter>
    </Card>
</template>
<script>
const toast = useToast()
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            feedback: '',
            feedbackArray: []
        }
    },
    mounted(){
        this.getFeedback()
    },
    methods: {
        formatDate(date){
            return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        },
        async addFeedback(){
            try{
                if(!this.feedback){
                    toast.error('Feedback is required');
                    return;
                }
                const response = await useApi().post('/task/create-feedback', {
                    task_feedback_task_id: this.task.task_id,
                    task_feedback_feedback: this.feedback
                });
                this.$emit('feedback-added', response);
                toast.success('Feedback added');
                this.feedback = ''
                this.getFeedback()
            }catch(error){
                console.error(error);
                toast.error('Error adding feedback');
            }
           
        },
        async getFeedback(){
            const response = await useApi().get(`/task/get-feedback/${this.task.task_id}`);
            console.log(response)
            this.feedbackArray = response.taskFeedback
        }
    }
}
</script>