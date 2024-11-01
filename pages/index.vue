<template>
    <div class="flex justify-center items-center h-screen">
    <Card class="w-full max-w-md">
        <CardHeader>
            <img src="../public/triplec-logo.svg" alt="Logo" class="h-[90px]" />
        </CardHeader>
        <CardContent>
            <Input type="tel" placeholder="Phone Number" />
        </CardContent>
        <CardFooter>
            <Button @click="login" class="w-full">Login</Button>
        </CardFooter>
    </Card>
  </div>
</template>
<script>
export default {
    name: 'IndexPage',
    data() {
        return {
            phoneNumber: ''
        }
    },
    methods: {
        login
    }
}
function login() {
    console.log('Login clicked');
    navigateTo('/tasks');
}
</script>
