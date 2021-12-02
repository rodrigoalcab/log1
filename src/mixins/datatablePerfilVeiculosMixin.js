export default {

    data () {
        return {
            emptyFieldsMessages: [],
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            perfil: {
                id: '',
                modelo: '',
                quantidadeEixos: ''
            },


            dialog: false,
            search: '',
            headers: [
                { text: "Modelo", value: "modelo" },
                { text: "Quantidade de Eixos", value: "quantidadeEixos" },
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

            this.$http.get('/v1/modelo-veiculo/' + id)
                .then(res => {
                    this.perfil = res.data
                    this.id = this.perfil.id
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

            if (this.perfil.modelo && this.perfil.quantidadeEixos) {
                return true
            }


            if (!this.perfil.modelo) {
                this.emptyFieldsMessages.push('Preencha o campo modelo');
            }

            if (!this.perfil.quantidadeEixos) {
                this.emptyFieldsMessages.push('Preencha o campo quantidade de eixos');
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
            const finalUrl = this.id ? '/v1/modelo-veiculo' : '/v1/modelo-veiculo'

            this.$http[method]('' + finalUrl, this.perfil)
                .then(response => {
                    console.log('tentando salvar')

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.$emit('updateData')

                        if(method === 'put') {
                            this.newMessage(this.messages, 'Perfil editado com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Perfil registrado com sucesso!', 'success')
                        }

                    }

                    this.clearFields(this.perfil)

                }).catch( error => {
                var message = error.response.data.description
                var errorCode = error.response.data.code

                this.newMessage(this.messages, "Código do Erro:" + errorCode + ' -> Descrição: ' + message, 'danger')
                // this.newMessage(this.messages, 'Código do Erro:' + errorCode, 'danger')
                // this.newMessage(this.messages, 'Descrição: ' + message, 'danger')
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
            this.$http.delete('/v1/modelo-veiculo/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.perfil)
                    this.newMessage(this.messages, 'Perfil excluído com sucesso', 'danger')
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