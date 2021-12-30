export default {

    data () {
        return {
            emptyFieldsMessages: [],
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            cliente: {
                id: '',
                nome: '',
                cnpj: '',
                cidade: '',
                estado: '',
                telefone: ''
            },


            dialog: false,
            search: '',
            headers: [
                { text: "Nome", value: "nome" },
                { text: "CNPJ", value: "cnpj" },
                { text: "Cidade", value: "cidade" },
                { text: "Estado", value: "estado" },
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

            this.$http.get('/v1/cliente/' + id)
                .then(res => {
                    this.cliente = res.data
                    this.id = this.cliente.id
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

            if (this.cliente.nome &&
                this.cliente.cnpj &&
                this.cliente.cidade &&
                this.cliente.estado &&
                this.cliente.telefone
            ) {
                return true
            }


            if (!this.cliente.nome) {
                this.emptyFieldsMessages.push('Preencha o campo Nome');
            }

            if (!this.cliente.cnpj) {
                this.emptyFieldsMessages.push('Preencha o campo CNPJ');
            }

            if (!this.cliente.cidade) {
                this.emptyFieldsMessages.push('Preencha o campo Cidade');
            }

            if (!this.cliente.estado) {
                this.emptyFieldsMessages.push('Preencha o campo Estado');
            }

            if (!this.cliente.telefone) {
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
            const finalUrl = this.id ? '/v1/cliente' : '/v1/cliente'

            this.$http[method]('' + finalUrl, this.cliente)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.$emit('updateData')

                        if(method === 'put') {
                            this.newMessage(this.messages, 'Cliente editado com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Cliente registrado com sucesso!', 'success')
                        }


                    }

                    this.clearFields(this.cliente)

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
            this.$http.delete('/v1/cliente/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.cliente)
                    this.newMessage(this.messages, 'Cliente excluído com sucesso', 'danger')
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