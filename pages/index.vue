<template>
    <div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'loggedin',
    middleware: ['auth']
})
onMounted(() => {
    //console.log('mounted')
    navigateTo('/tasks')
})
</script>
