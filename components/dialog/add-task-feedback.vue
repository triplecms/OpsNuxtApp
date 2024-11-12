<template>
    <Dialog v-bind:open="isOpen" :open="modelValue" >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>TRIP{{ task.task_id }} Feedback</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Add feedback to the task
            </DialogDescription>
            <div class="flex flex-col gap-4">
                <Textarea type="text" v-model="feedback.feedback" placeholder="Feedback Description" />
            </div>
            <DialogFooter>
                <Button @click="saveFeedback">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script>
const toast = useToast()
export default {
    name: 'AddTaskFeedback',
    props: {
        task: {
            type: Object,
            required: true
        },
        isOpen: {
            type: Boolean,
            required: false,
            default: false
        },
        feedback: {
            type: Object,
            required: false,
        }
    },
    methods: {
        saveFeedback
    },
}
async function saveFeedback() {
    try{
        const api = useApi()
        const response = await api.post(`/task/create-feedback`, {
            task_feedback_task_id: this.task.task_id,
            task_feedback_feedback: this.feedback.feedback
        })
        console.log('response', response)
        this.$emit('success')
        toast.success('Feedback saved')
    } catch (error) {
        console.error('Error saving feedback', error)
        toast.error('Error saving feedback')
    }

}
</script>
