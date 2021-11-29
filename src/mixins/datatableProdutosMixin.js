export default {

    data () {
        return {
            emptyFieldsMessages: [],
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            produto: {
                id: '',
                codigo: '',
                nome: ''
            },


            dialog: false,
            search: '',
            headers: [
                { text: "Id", value: "id" },
                { text: "Código", value: "codigo" },
                { text: "Nome", value: "nome" },
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

            this.$http.get('/v1/produto/' + id)
                .then(res => {
                    this.produto = res.data
                    this.id = this.produto.id
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

            if (this.produto.codigo && this.produto.nome) {
                return true
            }


            if (!this.produto.codigo) {
                this.emptyFieldsMessages.push('Preencha o campo código');
            }

            if (!this.produto.nome) {
                this.emptyFieldsMessages.push('Preencha o campo nome');
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
            const finalUrl = this.id ? '/v1/produto' : '/v1/produto'

            this.$http[method]('' + finalUrl, this.produto)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.$emit('updateData')

                        if(method === 'put') {
                            this.newMessage(this.messages, 'Produto editado com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Produto registrado com sucesso!', 'success')
                        }


                    }

                    this.clearFields(this.produto)

                }).catch( error => {
                this.newMessage(this.messages, 'Problema para excluir!', 'danger')
                console.log(error)
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
            this.$http.delete('/v1/produto/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.produto)
                    this.newMessage(this.messages, 'Produto excluído com sucesso', 'danger')
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