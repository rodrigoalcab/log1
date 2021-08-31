<template>
    <v-app>
        <v-main>
            <v-container>
                <v-card-title>
                    <v-btn
                            color="success"
                            dark
                            class="mb-2"
                            @click="$emit('xlsParaExportar')"
                    ><i class="fas fa-file-excel mr-2 fa-lg"></i>
                        Exportar XLS
                    </v-btn>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                    <v-spacer></v-spacer>

                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Pesquisar"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="posts"
                        :items-per-page="5"
                        :search="search"
                        :footer-props="{
                        itemsPerPageText: 'Itens por página',
                        'items-per-page-options': [5, 10, 20, 50, -1],
                        'items-per-page-all-text': 'Tudo',
                        pageText: '{0} - {1} de {2}'

                        }"

                        class="elevation-2"
                >
                    <template v-slot:item.actions="{item}">
                        <div style="display: flex;">
                            <v-icon
                                    small
                                    class="mr-3 md-dark"
                                    @click="$emit('itemParaEditar', item.id)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                    small
                                    class="md-dark"
                                    @click="$emit('itemParaExcluir', item.id)"
                            >
                                mdi-delete
                            </v-icon>
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
                    { text: "Ações", value: "actions", sortable: false },
                ],
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

    .md-dark {
        color: rgba(0, 0, 0, 0.54) !important;
        font-size: 20px !important;
    }


</style>