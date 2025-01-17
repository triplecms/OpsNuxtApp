<template>
    <Card>
        <CardHeader>
            <CardTitle>
                Attachments
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-col gap-2 mb-4">
                <Input type="file" @change="handleFileChange" ref="fileInput"/>
                <Button @click="addAttachment">Add Attachment</Button>
            </div>
            <div v-for="document in taskDocuments" :key="document.id" class="flex gap-2 items-center mb-2 cursor-pointer" :title="document.task_document_file_name">
                <p class="text-sm text-gray-500 truncate">{{ document.task_document_file_name }}</p>
                <Button variant="destructive" @click="deleteAttachment(document.task_document_uuid)"><Icon name="lucide:trash" /></Button>
                <Button variant="outline" @click="downloadAttachment(document.task_document_uuid)"><Icon name="lucide:download" /></Button>
            </div>
        </CardContent>
        <CardFooter>
            
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
            attachment: null,
            taskDocuments: []
        }
    },
    methods: {
        handleFileChange(event) {
            this.attachment = event.target.files[0];
        },
        async addAttachment() {
            try{
                if(!this.attachment) return;
                const formData = new FormData();
                formData.append('file', this.attachment);
                console.log(formData);
                const response = await useApi().post(`/task/document-upload/${this.task.task_uuid}`, formData);
                console.log(response);
                this.$emit('attachment-added');
                toast.success('Attachment added');
                // clear input field
                this.$refs.fileInput.value = null;
                this.attachment = null;
                this.getAttachments();
            }catch(error){
                console.error(error);
                toast.error('Error adding attachment');
            }
        },
        async getAttachments(){
            const response = await useApi().get(`/task/get-documents/${this.task.task_uuid}`);
            console.log(response);
            this.taskDocuments = response.taskDocuments;
        },
        async deleteAttachment(taskDocumentId){
            const response = await useApi()._delete(`/task/delete-document/${taskDocumentId}`);
            console.log(response);
            this.getAttachments();
            toast.success('Attachment deleted');
        },
        async downloadAttachment(taskDocumentId){
            const response = await useApi().get(`/task/download-document/${taskDocumentId}`);
            window.open(response.fileUrl, '_blank');
        }
    },
    mounted(){
        this.getAttachments();
    }

}
</script>