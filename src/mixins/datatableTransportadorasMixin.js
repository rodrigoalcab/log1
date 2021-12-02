export default {

    data () {
        return {
            emptyFieldsMessages: [],
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            transportadora: {
                id: '',
                nome: '',
                cnpj: '',
                telefone: '',
                bairro: '',
                numero: '',
                cep: '',
                cidade: '',
                estado: '',
            },


            dialog: false,
            search: '',
            headers: [
                { text: "Nome", value: "nome" },
                { text: "CNPJ", value: "cnpj" },
                { text: "Telefone", value: "telefone" },
                { text: "Bairro", value: "bairro" },
                { text: "Número", value: "numero" },
                { text: "CEP", value: "cep" },
                { text: "Cidade", value: "cidade" },
                { text: "Estado", value: "estado" },
                { text: "Ações", value: "actions", sortable: false },
            ],
            editedIndex: 0,
        }


    },
    methods: {
        close () {
            this.dialog = false
            this.editedIndex = 1
        },

        openDialogEditItem (id) {
            this.editedIndex = 1

            this.$http.get('/v1/transportadora/' + id)
                .then(res => {
                    this.transportadora = res.data
                    this.id = this.transportadora.id
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

            if (this.transportadora.nome &&
                this.transportadora.cnpj &&
                this.transportadora.telefone &&
                this.transportadora.bairro &&
                this.transportadora.cep &&
                this.transportadora.numero &&
                this.transportadora.cidade &&
                this.transportadora.estado
            ) {
                return true
            }

            if (!this.transportadora.nome) {
                this.emptyFieldsMessages.push('Preencha o campo Nome');
            }

            if (!this.transportadora.cnpj) {
                this.emptyFieldsMessages.push('Preencha o campo CNPJ');
            }

            if (!this.transportadora.telefone) {
                this.emptyFieldsMessages.push('Preencha o campo Telefone');
            }

            if (!this.transportadora.bairro) {
                this.emptyFieldsMessages.push('Preencha o campo Bairro');
            }

            if (!this.transportadora.cep) {
                this.emptyFieldsMessages.push('Preencha o campo CEP');
            }

            if (!this.transportadora.numero) {
                this.emptyFieldsMessages.push('Preencha o campo Número');
            }

            if (!this.transportadora.cidade) {
                this.emptyFieldsMessages.push('Preencha o campo Cidade');
            }

            if (!this.transportadora.estado) {
                this.emptyFieldsMessages.push('Preencha o campo Estado');
            }

        },

        save() {
            if(!this.checkForm()) {
                return
            }
            this.disableButton()
            const method = this.id ? 'put' : 'post'
            const finalUrl = this.id ? '/v1/transportadora/' : '/v1/transportadora'

            this.$http[method]('' + finalUrl, this.transportadora)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.$emit('updateData')

                        if(method === 'put') {
                            this.newMessage(this.messages, 'Transportadora editada com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Transportadora registrada com sucesso!', 'success')
                        }


                    }

                    this.clearFields(this.transportadora)

                }).catch( error => {
                var errorCode = error.response.data.code
                var message = error.response.data.description

                this.newMessage(this.messages, "Código do Erro: " + errorCode + ' |  Descrição: ' + message, 'danger')
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
            this.$http.delete('/v1/transportadora/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.transportadora)
                    this.newMessage(this.messages, 'Transportadora excluída com sucesso', 'danger')
                }).catch( error => {
                this.newMessage(this.messages, 'Erro ao tentar excluir', 'danger')
                console.log(error)
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
}