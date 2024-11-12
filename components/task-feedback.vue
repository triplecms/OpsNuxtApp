<template>
    <div class="flex flex-col h-[140%] w-full px-6 hide-scrollbar overflow-y-auto gap-4" >
        <div v-for="feedback in feedbacks" :key="feedback.task_feedback_id" class="flex flex-row w-full gap-2 justify-between">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Avatar>
                            <AvatarImage src=""/>
                            <AvatarFallback>{{ feedback.user_first_name[0]}}{{ feedback.user_last_name[0] }}</AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                        {{ feedback.user_first_name }} {{ feedback.user_last_name }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Card class="p-0 border-none shadow-none">
                <CardHeader class="p-0">
                    <div class="flex flex-row justify-between text-sm font-semibold items-center">
                        <p>{{ formatDate(feedback.task_feedback_date) }}</p>
                    </div>
                </CardHeader>
                <div class="flex flex-col justify-between">
                <p class="text-sm">{{ feedback.task_feedback_feedback }}</p>
                </div>
            </Card> 
            <Button variant="ghost" size="icon" class="p-0" @click="deleteFeedback(feedback)">
                <Icon name="lucide:trash" class="w-4 h-4" />
            </Button>
        </div>

    </div>
</template>
<script>
export default {
    props: {
        feedbacks: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            steps: [
            {
                    step: 1,
                    title: 'Task',
                    description:
                        'Task details',
                },
                {
                    step: 2,
                    title: 'Feedback',
                    description: 'Feedback about the task',
                },
                {
                    step: 3,
                    title: 'Invite your team',
                    description:
                        'Start collaborating with your team by inviting them to join your account. You can skip this step and invite them later',
                },
            ]
        }
    },
    methods: {
        formatDate(date) {
            if (!date) return ''
            
            return new Date(date).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })
        },
        deleteFeedback(feedback) {
            console.log(feedback)
            this.$emit('deleteFeedback', feedback)
        }
    }   
}
</script>
<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-y-auto::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.overflow-y-auto {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>