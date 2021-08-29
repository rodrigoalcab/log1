<template>
    <v-app>
        <v-main>
            <v-container>
                <v-card-title>
                    Nutrition
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="posts"
                        :items-per-page="5"
                        :search="search"
                        class="elevation-1"
                >
                    <template v-slot:item.actions="{item}">
                        <div style="display: flex;">
                            <b-button variant="warning"><i class="fas fa-edit"></i></b-button>
                            <b-button variant="danger" class="ml-2"><i class="fas fa-trash"></i></b-button>
                        </div>
                    </template>

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
                    { text: "Body", value: "body" },
                    { text: "", value: "actions", sortable: false },
                ],
            }
        },
        methods: {
            deleteItem() {
                alert('deleting item...')
            }
        }
    }
</script>

<style scoped>

</style>