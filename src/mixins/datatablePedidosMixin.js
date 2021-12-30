export default {

    data () {
        return {
            emptyFieldsMessages: [],
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            edicao: false,
            pedido: {
                idCliente: '',
                idTransportadora: 7,
                idOrigem: '',
                idDestino: '',
                idProduto: '',
                quantidade: '',
                unidadeMedida: '',
                inicio: '',
                fim: '',
                cadencia: '',
                unidadeTempoCadencia: '',
                observacao: '',

            },
            clienteSelecionado: null,
            listaDeClientes: [],

            origemSelecionado: null,
            listaDeOrigens: [],

            destinoSelecionado: null,
            listaDeDestinos: [],

            produtoSelecionado: null,
            listaDeProdutos: [],

            unidadeDeMedidaSelecionado: null,
            listaDeUnidadeDeMedida: [ 'CAIXA', 'KG', 'TONELADA', 'LITRO', 'UNIDADE' ],

            unidadeTempoCadenciaSelecionado: null,
            listaDeUnidadeTempoCadencia: [ 'HORA', 'DIA', 'SEMANA', 'QUINZENA', 'MES', 'TRIMESTRE', 'QUADRIMESTRE', 'SEMESTRE', 'ANO' ],

            dialog: false,
            search: '',
            headers: [
                { text: "Status", value: "statusPedido" },
                { text: "Cliente", value: "cliente" },
                { text: "Produto", value: "produto" },
                { text: "Origem", value: "origem" },
                { text: "Destino", value: "destino" },
                { text: "Início", value: "inicio"},
                { text: "Fim", value: "fim" },
                { text: "Ações", value: "actions", sortable: false },
            ],
            editedIndex: 0,
        }

    },
    methods: {
        getModelosDeVeiculos () {
            this.$http.get('/v1/modelo-pedido/')
                .then(res => {
                    this.modelosDeVeiculos = res.data

                }).catch( error => {
                console.log(error)
            })
        },

        getClientes () {
            this.$http.get('/v1/cliente')
                .then(res => {
                    this.listaDeClientes = res.data

                }).catch( error => {
                console.log(error)
            })
        },
        getProdutos () {
            this.$http.get('/v1/produto')
                .then(res => {
                    this.listaDeProdutos = res.data

                }).catch( error => {
                console.log(error)
            })
        },
        getOrigens () {
            this.$http.get('/v1/localidade')
                .then(res => {
                    this.listaDeOrigens = res.data

                }).catch( error => {
                console.log(error)
            })
        },
        getDestinos () {
            this.$http.get('/v1/localidade')
                .then(res => {
                    this.listaDeDestinos = res.data

                }).catch( error => {
                console.log(error)
            })
        },

        close () {
            this.dialog = false
            this.editedIndex = 1
        },

        openDialogEditItem (id) {
            this.editedIndex = 1

            this.$http.get('/v1/pedido/' + id)
                .then(res => {

                    this.pedido = res.data
                    this.id = this.pedido.id
                    this.edicao = true
                    this.clienteSelecionado = this.pedido.cliente.nome
                    console.log('clicou em editar, carregou pedido por id' + this.pedido.id)
                    console.log(this.edicao)

                }).catch( error => {
                console.log(error)
            })

            this.dialog = true

        },

        openDialogNewItem() {
            this.editedIndex = 0
            this.dialog = true

        },

        checkForm() {

            this.emptyFieldsMessages = []

            if (this.pedido.idCliente &&
                this.pedido.idProduto &&
                this.pedido.idOrigem &&
                this.pedido.idDestino &&
                this.pedido.quantidade &&
                this.pedido.unidadeMedida &&
                this.pedido.inicio &&
                this.pedido.fim &&
                this.pedido.cadencia &&
                this.pedido.unidadeTempoCadencia) {
                return true
            }

            if (!this.pedido.idCliente) {
                this.emptyFieldsMessages.push('Preencha o campo Cliente');
            }

            if (!this.pedido.idProduto) {
                this.emptyFieldsMessages.push('Preencha o campo Produto');
            }

            if (!this.pedido.idOrigem) {
                this.emptyFieldsMessages.push('Preencha o campo Origem');
            }

            if (!this.pedido.idDestino) {
                this.emptyFieldsMessages.push('Preencha o campo Destino');
            }

            if (!this.pedido.quantidade) {
                this.emptyFieldsMessages.push('Preencha o campo Quantidade');
            }

            if (!this.pedido.unidadeMedida) {
                this.emptyFieldsMessages.push('Preencha o campo Unidade de Medida');
            }

            if (!this.pedido.inicio) {
                this.emptyFieldsMessages.push('Preencha o campo Data Início');
            }

            if (!this.pedido.fim) {
                this.emptyFieldsMessages.push('Preencha o campo Data Fim');
            }

            if (!this.pedido.cadencia) {
                this.emptyFieldsMessages.push('Preencha o campo Cadência');
            }

            if (!this.pedido.unidadeTempoCadencia) {
                this.emptyFieldsMessages.push('Preencha o campo Tempo de Cadência');
            }




        },

        enterClicked(){
            alert('clicou no enter')
        },

        save() {
            if(!this.checkForm()) {
                return
            }

            this.disableButton()
            const method = this.id ? 'put' : 'post'
            const finalUrl = this.id ? '/v1/pedido' : '/v1/pedido'

            this.$http[method]('' + finalUrl, this.pedido)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.$emit('updateData')

                        if(method === 'put') {
                            this.newMessage(this.messages, 'Pedido editado com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Pedido registrado com sucesso!', 'success')
                        }

                    }

                    this.clearFields(this.pedido)

                }).catch( error => {
                var message = error.response.data.description
                var errorCode = error.response.data.code

                this.newMessage(this.messages, "Código do Erro:" + errorCode + ' -> Descrição: ' + message, 'danger')
                this.enableButton()
            })



            this.close()

        },

        enableButton() {
            this.saveButtonDisabled = false;
        },

        disableButton() {
            this.saveButtonDisabled = true;
        },

        deleteItem (id) {
            this.dialogDelete = true
            this.id = id
        },

        deleteItemConfirm () {
            this.$http.delete('/v1/pedido/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.pedido)
                    this.newMessage(this.messages, 'Produto excluído com sucesso', 'danger')
                }).catch( error => {
                var errorCode = error.response.data.code
                var message = error.response.data.description

                this.newMessage(this.messages, "Código do Erro:" + errorCode + ' |  Descrição: ' + message, 'danger')
                this.enableButton()
            })
            this.closeDelete()
        },

        closeDelete () {
            this.id = null
            this.dialogDelete = false
        },

        exportXLS() {
            alert('Exportando arquivo XLS...')
        },

    },

    computed: {
        formTitle () {
            return this.editedIndex === 0 ? 'Novo Registro' : 'Editar Registro'
        },
    },
    mounted(){
        this.getClientes()
        this.getProdutos()
        this.getOrigens()
        this.getDestinos()
    }
}