<template>
    <div class="w-full h-full border rounded-lg">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead v-for="header in headers" :key="header.id" class="text-weight-bold">
                        <FlexRow v-if="header.icon">
                            <span><Icon :name="header.icon" :class="header.iconClass" /></span>
                        </FlexRow>
                        <FlexRow v-else>
                            <span>{{ header.name }}</span>
                        </FlexRow>
                    </TableHead>
                    <TableHead v-if="rowActions">
                        <span></span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="row in rows" :key="row.id">
                    <TableCell v-for="header in headers" :key="header.id">
                        <FlexRow v-if="header.render">
                            {{ header.render(row) }}
                        </FlexRow>
                        <FlexRow v-else-if="!header.type">
                            {{ row[header.id] }}
                        </FlexRow>
                        <FlexRow v-else-if="header.type === 'checkbox'" class="flex items-center justify-center">
                            <Icon name="lucide:check" v-if="row[header.id]"/>
                        </FlexRow>
                        <FlexRow v-else>
                            <div v-if="header.type === 'avatar_list'" class="flex items-center space-x-1 overflow-x-auto w-full">
                                <TooltipProvider  v-for="user in row[header.id]" :key="user.id">
                                    <Tooltip>
                                    <TooltipTrigger>
                                        <Avatar>
                                            <AvatarImage :src="user.avatar_url" :alt="`${user.user_first_name} ${user.user_last_name}`" />
                                            <AvatarFallback>{{ user.user_first_name[0] }}{{ user.user_last_name[0] }}</AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                        <TooltipContent>
                                            {{ user.user_first_name }} {{ user.user_last_name }}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </FlexRow>
                    </TableCell>
                    <TableCell v-if="rowActions">
                        <FlexRow class="flex justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button variant="ghost"><Icon name="lucide:ellipsis-vertical" class="w-4 h-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem v-for="action in rowActions" :key="action.id" @click="action.action(row)"> <Icon :name="action.icon" class="w-4 h-4" /> {{ action.name }}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </FlexRow>
                    </TableCell>
                </TableRow>
            </TableBody>
            <TableFooter v-if="meta">
                <TableRow>
                    <TableCell colspan="100%">
                        <div class="flex items-center justify-between px-2">
                            <div class="text-sm text-gray-500">
                                Showing {{ ((Number(meta.page) - 1) * Number(meta.limit)) + 1 }} to 
                                {{ Math.min(Number(meta.page) * Number(meta.limit), Number(meta.total)) }} of 
                                {{ meta.total }} entries
                            </div>
                            <div class="flex items-center space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    :disabled="Number(meta.page) <= 1"
                                    @click="$emit('pageChange', Number(meta.page) - 1)"
                                >
                                    Previous
                                </Button>
                                <div class="flex items-center space-x-1">
                                    <span v-for="page in Number(meta.pages)" :key="page">
                                        <Button 
                                            :variant="page === Number(meta.page) ? 'default' : 'outline'"
                                            size="sm"
                                            @click="$emit('pageChange', page)"
                                        >
                                            {{ page }}
                                        </Button>
                                    </span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    :disabled="Number(meta.page) >= Number(meta.pages)"
                                    @click="$emit('pageChange', Number(meta.page) + 1)"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
</template>
<script>
export default {
    props: {
        headers: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        },
        rowActions: {
            type: Array,
            required: false
        },
        meta: {
            type: Object,
            required: false
        }
    },
    emits: ['pageChange']
}
</script>