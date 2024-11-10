<template>
    <Sheet v-bind:open="open" @update:open="handleSheetUpdate">
      <SheetContent>
        <slot></slot>
      </SheetContent>
    </Sheet>
  </template>
  <script>
    export default {
        props: {
            open: {
                type: Boolean,
                required: true
            }
        },
        methods:{
            handleSheetUpdate
        }
    }
   function handleSheetUpdate(open){
    console.log('handleSheetUpdate')
    this.$emit('update:open', open);
   }
  </script>