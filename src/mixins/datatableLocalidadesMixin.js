export default {

    data () {
        return {
            emptyFieldsMessages: [],
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            localidade: {
                id: '',
                nome: '',
                rua: '',
                numero: '',
                bairro: '',
                complemento: '',
                cidade: '',
                estado: '',
                telefone: ''
            },


            dialog: false,
            search: '',
            headers: [
                { text: "Nome", value: "nome" },
                { text: "Rua", value: "rua" },
                { text: "Número", value: "numero" },
                { text: "Bairro", value: "bairro" },
                { text: "Cidade", value: "cidade" },
                { text: "Estado", value: "estado" },
                { text: "Complemento", value: "complemento" },
                { text: "Telefone", value: "telefone" },
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

            this.$http.get('/v1/localidade/' + id)
                .then(res => {
                    this.localidade = res.data
                    this.id = this.localidade.id
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

            if (this.localidade.nome &&
                this.localidade.rua &&
                this.localidade.numero &&
                this.localidade.bairro &&
                this.localidade.cidade &&
                this.localidade.estado &&
                this.localidade.complemento &&
                this.localidade.telefone
            ) {
                return true
            }


            if (!this.localidade.nome) {
                this.emptyFieldsMessages.push('Preencha o campo Nome');
            }

            if (!this.localidade.rua) {
                this.emptyFieldsMessages.push('Preencha o campo Rua');
            }

            if (!this.localidade.numero) {
                this.emptyFieldsMessages.push('Preencha o campo Número');
            }

            if (!this.localidade.bairro) {
                this.emptyFieldsMessages.push('Preencha o campo Bairro');
            }

            if (!this.localidade.cidade) {
                this.emptyFieldsMessages.push('Preencha o campo Cidade');
            }

            if (!this.localidade.estado) {
                this.emptyFieldsMessages.push('Preencha o campo Estado');
            }

            if (!this.localidade.complemento) {
                this.emptyFieldsMessages.push('Preencha o campo Complemento');
            }

            if (!this.localidade.telefone) {
                this.emptyFieldsMessages.push('Preencha o campo Telefone');
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
            const finalUrl = this.id ? '/v1/localidade' : '/v1/localidade'

            this.$http[method]('' + finalUrl, this.localidade)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.$emit('updateData')

                        if(method === 'put') {
                            this.newMessage(this.messages, 'Localidade editada com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Localidade registrada com sucesso!', 'success')
                        }


                    }

                    this.clearFields(this.localidade)

                }).catch( error => {
                    var errorCode = error.response.data.code
                    var message = error.response.data.description

                    this.newMessage(this.messages, "Código do Erro:" + errorCode + ' |  Descrição: ' + message, 'danger')
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
            this.$http.delete('/v1/localidade/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.localidade)
                    this.newMessage(this.messages, 'Localidade excluída com sucesso', 'danger')
                }).catch( error => {
                var errorCode = error.response.data.code
                var message = error.response.data.description

                this.newMessage(this.messages, "Código do Erro:" + errorCode + ' |  Descrição: ' + message, 'danger')

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