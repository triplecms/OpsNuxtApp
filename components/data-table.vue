<template>
    <div class="w-full h-full border rounded-lg">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead v-for="header in headers" :key="header.id">
                        <FlexRow>
                            <span>{{ header.name }}</span>
                        </FlexRow>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="row in rows" :key="row.id">
                    <TableCell v-for="header in headers" :key="header.id">
                        <FlexRow>
                            <span>{{ row[header.id] }}</span>
                        </FlexRow>
                    </TableCell>
                    <TableCell v-if="rowActions">
                        <FlexRow class="flex justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button variant="outline"><Icon name="lucide:ellipsis-vertical" class="w-4 h-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem v-for="action in rowActions" :key="action.id" @click="action.action(row)"> <Icon :name="action.icon" class="w-4 h-4" /> {{ action.name }}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </FlexRow>
                    </TableCell>
                </TableRow>
            </TableBody>
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
        }
    }
}
</script>