<template>
    <div class="flex flex-col h-[140%] w-full px-6 hide-scrollbar overflow-y-auto" >
        <Stepper orientation="vertical" class="mx-auto flex w-full max-w-md flex-col justify-start gap-10 hide-scrollbar">
            <StepperItem
                v-for="(step, index) in feedbacks"
                :key="step.task_feedback_id"
                v-slot="{ state }"
                class="relative flex w-full items-start gap-6"
                :step="step.task_feedback_id">
                <StepperSeparator
                    v-if="index !== feedbacks.length - 1"
                    class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                />

                <StepperTrigger as-child>
                    <Button
                        :variant="active"
                        size="icon"
                        class="z-10 rounded-full shrink-0">
                        <Icon name="lucide:check" class="size-5" 
                        :class="'ring-ring ring-offset-2 ring-offset-background'"
                        :disabled="true"/>
                    </Button>
                </StepperTrigger>

                <div class="flex flex-col gap-1">
                    <StepperTitle
                        :class="[state === 'active' && 'text-primary']"
                        class="text-sm font-semibold transition lg:text-base">
                        {{ formatDate(step.task_feedback_date) }}
                    </StepperTitle>
                    <StepperDescription
                        :class="[state === 'active' && 'text-primary']"
                        class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                        {{ step.task_feedback_feedback }}
                    </StepperDescription>
                </div>
            </StepperItem>
        </Stepper>
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