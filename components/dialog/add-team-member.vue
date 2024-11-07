<template>
    <Dialog v-model:open="open">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Team Member</DialogTitle>
            </DialogHeader>
            <Input v-model="name" placeholder="Name" id="name" name="name"/>
            <Input v-model="surname" placeholder="Surname" id="surname" name="surname"/>
            <Input v-model="phone" placeholder="Phone" id="phone" name="phone"/>
            <DialogFooter>
                <Button @click="save">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script>
const toast = useToast()

export default {
    name: 'DialogAddTeamMember',
    data() {
        return {
            open: false,
            name: '',
            surname: '',
            phone: '',
        }
    },
    methods: {
        save
    }
}
async function save() {
    try{
        console.log('Save');
        console.log(this.name, this.surname, this.phone)
        const api = useApi();
        const response = await api.post('/user/create', {
        user_first_name: this.name,
            user_last_name: this.surname,
            user_phone: this.phone
        })
        this.open = false;
        toast.success('Team member created')
        this.$emit('success');
    } catch (error) {
        console.log('Error');
        console.log(error);
    }

}
</script>
