<template>
    <v-app>
        <v-main>
            <v-container>
                <v-data-table
                        :headers="headers"
                        :items="posts"
                        :items-per-page="2"
                        :search="search"
                        class="elevation-1"
                >
<!--                    <template v-slot:item.actions="{ item }">-->
<!--                        <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>-->
<!--                    </template>-->
                </v-data-table>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        props: ["posts"],
        data () {
            return {
                search: '',
                headers: [
                    { text: "User Id", value: "userId" },
                    { text: "Id", value: "id" },
                    { text: "Title", value: "title" },
                    { text: "Body", value: "body" }
                ],
            }
        },
    }
</script>

<style scoped>

</style>