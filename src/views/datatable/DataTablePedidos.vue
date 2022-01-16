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
                        :items="pedidos"
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

                        </div>
                    </template>

                </v-data-table>

                <!--                Begin Dialog-->
                <template>
                    <div class="text-center">
                        <v-dialog
                                v-model="dialog"
                                max-width="800px"
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

                                            <v-col cols="12" sm="6" md="4">
                                                    <label for="modelo">Selecione um cliente:</label>

                                                        <select v-if="!edicao" v-model="pedido.idCliente" class="form-select">
                                                            <option v-for="cliente in listaDeClientes" :key="cliente.id" :value="cliente.id">
                                                                {{ cliente.nome }}
                                                            </option>
                                                        </select>

                                                        <select v-else v-model="idClienteSelecionado" class="form-select">
                                                            <option v-for="cliente in listaDeClientes" :key="cliente.id" :value="cliente.id" selected="cliente.id === 'idClienteSelecionado ? true : false'">
                                                                {{ cliente.nome }}
                                                            </option>
                                                        </select>
                                            </v-col>


                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-model="pedido.instrucao"
                                                        label="Instrucao"
                                                ></v-text-field>
                                            </v-col>



                                            <v-col cols="12" sm="6" md="4">
                                                <label for="modelo">Selecione um produto:</label>

                                                <select v-if="!edicao" v-model="pedido.idProduto" class="form-select" >
                                                        <option v-for="produto in listaDeProdutos" :key="produto.id" :value="produto.id">{{ produto.nome }}</option>
                                                    </select>

                                                <select v-else v-model="idProdutoSelecionado" class="form-select" >
                                                    <option v-for="produto in listaDeProdutos" :key="produto.id" :value="produto.id" selected="produto.id === 'idProdutoSelecionado ? true : false'">
                                                        {{ produto.nome }}
                                                    </option>
                                                </select>

                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <label for="modelo">Selecione a origem:</label>

                                                <select v-if="!edicao" v-model="pedido.idOrigem" class="form-select" >
                                                    <option v-for="origem in listaDeOrigens" :key="origem.id" :value="origem.id">
                                                        {{ origem.nome }}
                                                    </option>
                                                </select>

                                                <select v-else v-model="idOrigemSelecionado" class="form-select" >
                                                    <option v-for="origem in listaDeOrigens" :key="origem.id" :value="origem.id" selected="origem.id === 'idOrigemSelecionado ? true : false'">
                                                        {{ origem.nome }}
                                                    </option>
                                                </select>

                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <label for="modelo">Selecione o destino:</label>

                                                <select v-if="!edicao" v-model="pedido.idDestino" class="form-select" >
                                                    <option v-for="destino in listaDeDestinos" :key="destino.id" :value="destino.id">
                                                        {{ destino.nome }}
                                                    </option>
                                                </select>

                                                <select v-else v-model="idDestinoSelecionado" class="form-select" >
                                                    <option v-for="destino in listaDeDestinos" :key="destino.id" :value="destino.id" selected="destino.id === 'idDestinoSelecionado ? true : false'">
                                                        {{ destino.nome }}
                                                    </option>
                                                </select>

                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-model.number="pedido.quantidade"
                                                        label="Quantidade"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <label for="modelo">Unidade de medida:</label>
                                                <select v-model="pedido.unidadeMedida" class="form-select" >
                                                    <option v-for="unidadeMedida in listaDeUnidadeDeMedida" :key="unidadeMedida" :value="unidadeMedida">
                                                        {{ unidadeMedida }}
                                                    </option>
                                                </select>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-model="pedido.inicio"
                                                        label="Data Início"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-model="pedido.fim"
                                                        label="Data Fim"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-model.number="pedido.cadencia"
                                                        label="Cadência"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <label for="modelo">Tempo da Cadência:</label>
                                                <select v-model="pedido.unidadeTempoCadencia" class="form-select" >
                                                    <option v-for="unidadeTempoCadencia in listaDeUnidadeTempoCadencia" :key="unidadeTempoCadencia" :value="unidadeTempoCadencia">
                                                        {{ unidadeTempoCadencia }}
                                                    </option>
                                                </select>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-model="pedido.observacao"
                                                        label="Observações"
                                                ></v-text-field>
                                            </v-col>

<!--                                            <v-col-->
<!--                                                    cols="12"-->
<!--                                                    sm="6"-->
<!--                                                    md="4"-->
<!--                                            >-->
<!--                                                <v-text-field-->
<!--                                                        v-model="pedido.placaCarreta"-->
<!--                                                        label="Placa Carreta"-->
<!--                                                ></v-text-field>-->
<!--                                            </v-col>-->
<!--                                            <v-col-->
<!--                                                    cols="12"-->
<!--                                                    sm="6"-->
<!--                                                    md="4"-->
<!--                                            >-->
<!--                                                <v-text-field-->
<!--                                                        v-model="veiculo.placaCarreta2"-->
<!--                                                        label="Placa Carreta 2"-->
<!--                                                ></v-text-field>-->
<!--                                            </v-col>-->

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
    import datatablePedidosMixin from '../../mixins/datatablePedidosMixin';
    export default {
        props: ["pedidos"],
        mixins: [datatablePedidosMixin],


    }
</script>

<style scoped>

    .md-dark {
        color: rgba(0, 0, 0, 0.54) !important;
        font-size: 20px !important;
    }


</style>