<template>
    <!-- Select date -->
    <Popover>
    <PopoverTrigger as-child>
        <Button variant="outline">
            <Icon name="lucide:calendar" class="mr-2 h-4 w-4" />
            <div v-if="value.start && value.end"> 
                {{ new Date(value.start).toLocaleDateString() }} - {{ new Date(value.end).toLocaleDateString() }}
            </div>
            <div v-else>
                Select a date
            </div>
        </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <RangeCalendar v-bind="value" initial-focus :number-of-months="1" @update:model-value="onDateChange" />
        </PopoverContent>
    </Popover>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    methods: {
        onDateChange(date) {
            this.value.start = date.start
            this.value.end = date.end
            this.$emit('update', this.value)
        }
    }
}
</script>