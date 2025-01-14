<template>
    <Card>
        <CardHeader>
            <CardTitle>
                Attachments
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-col gap-2 mb-4">
                <Input v-model="attachment" placeholder="Attachment" type="file"/>
            </div>
        </CardContent>
        <CardFooter>
            <Button>Add Attachment</Button>
        </CardFooter>
    </Card>
</template>
<script>
export default {
    data(){
        return {
            attachment: ''
        }
    }
}
</script>