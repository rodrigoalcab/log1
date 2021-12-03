export default {

    data () {
        return {
            emptyFieldsMessages: [],
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            motorista: {
                id: '',
                nome: '',
                cnh: '',
                cpf: '',
                cnpj: '',
                categoriaCnh: '',
                vencimentoCnh: '',
                telefone: ''
            },


            dialog: false,
            search: '',
            headers: [
                { text: "Nome", value: "nome" },
                { text: "CNH", value: "cnh" },
                { text: "CPF", value: "cpf" },
                { text: "CNPJ", value: "cnpj" },
                { text: "Categoria CNH", value: "categoriaCnh" },
                { text: "Vencimento CNH", value: "vencimentoCnh" },
                { text: "Telefone", value: "Telefone" },
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

            this.$http.get('/v1/motorista/' + id)
                .then(res => {
                    this.motorista = res.data
                    this.id = this.motorista.id
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

            if (this.motorista.nome &&
                this.motorista.cnh &&
                this.motorista.cpf &&
                this.motorista.cnpj &&
                this.motorista.categoriaCnh &&
                this.motorista.vencimentoCnh &&
                this.motorista.telefone
            ) {
                return true
            }


            if (!this.motorista.nome) {
                this.emptyFieldsMessages.push('Preencha o campo Nome');
            }

            if (!this.motorista.cnh) {
                this.emptyFieldsMessages.push('Preencha o campo CNH');
            }

            if (!this.motorista.cpf) {
                this.emptyFieldsMessages.push('Preencha o campo CPF');
            }

            if (!this.motorista.cnpj) {
                this.emptyFieldsMessages.push('Preencha o campo CNPJ');
            }

            if (!this.motorista.categoriaCnh) {
                this.emptyFieldsMessages.push('Preencha o campo Categoria CNH');
            }

            if (!this.motorista.vencimentoCnh) {
                this.emptyFieldsMessages.push('Preencha o campo Vencimento CNG');
            }

            if (!this.motorista.telefone) {
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
            const finalUrl = this.id ? '/v1/motorista' : '/v1/motorista'

            this.$http[method]('' + finalUrl, this.motorista)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.$emit('updateData')

                        if(method === 'put') {
                            this.newMessage(this.messages, 'Motorista editado com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Motorista registrado com sucesso!', 'success')
                        }


                    }

                    this.clearFields(this.motorista)

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
            this.$http.delete('/v1/motorista/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.motorista)
                    this.newMessage(this.messages, 'Motorista excluído com sucesso', 'danger')
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