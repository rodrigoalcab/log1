<template>
    <v-app>
        <v-main>
            <v-container>
                <v-card-title>
                    <v-row justify="center">

                        <b-alert show dismissible v-for="(message, index) in messages"
                                 :key="index"
                                 :variant="message.type">{{ message.text }}</b-alert>

                        <v-col cols="4" left>
                            <v-btn
                                    color="success"
                                    dark
                                    class="mb-2"
                                    @click="exportXLS"
                            >
                                <i class="fas fa-file-excel mr-2 fa-lg"></i>
                                Exportar XLS
                            </v-btn>
                        </v-col>

                        <v-col cols="4">

                        </v-col>

                        <v-col cols="4"  style="text-align: right">
                                <v-btn
                                        color="primary"
                                        dark
                                        class="mb-2"
                                        @click="openDialogNewItem"
                                ><i class="fas fa-plus" style="margin-right: 10px;"></i>
                                    NOVO REGISTRO
                                </v-btn>

                            <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Pesquisar"
                                    single-line
                                    hide-details
                            ></v-text-field>
                        </v-col>


                    </v-row>
                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="perfis"
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
                                    @click="openDialogEditItem(item.id)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                    small
                                    class="md-dark"
                                    @click="deleteItem(item.id)"
                            >
                                mdi-delete
                            </v-icon>
                        </div>
                    </template>

                </v-data-table>

                <!--                Begin Dialog-->
                <template>
                    <div class="text-center">
                        <v-dialog
                                v-model="dialog"
                                max-width="500px"
                        >

                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>

                                        <v-row style="margin-top: 0px;">
                                            <ul v-for="(emptyFieldsMessage, index) in emptyFieldsMessages"
                                                :key="index">
                                                <li style="color: #FF6347; line-height: 0.575rem;">{{ emptyFieldsMessage }}</li>
                                            </ul>
                                        </v-row>

                                        <v-row>


                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="perfil.modelo"
                                                        label="Modelo"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="perfil.quantidadeEixos"
                                                        label="Quantidade de Eixos"
                                                ></v-text-field>
                                            </v-col>

                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"

                                    >
                                        Cancelar
                                    </v-btn>
                                    <v-btn
                                            :disabled="saveButtonDisabled"
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                    >
                                        Salvar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </template>
                <!--                End Dialog-->

<!--                Begin dialogDelete-->
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Deseja remover este registro?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Remover</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
<!--                End dialogDelete-->

            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import datatablePerfilVeiculosMixin from '../../mixins/datatablePerfilVeiculosMixin';
    export default {
        props: ["perfis"],
        mixins: [datatablePerfilVeiculosMixin],


    }
</script>

<style scoped>

    .md-dark {
        color: rgba(0, 0, 0, 0.54) !important;
        font-size: 20px !important;
    }


</style>