import { required, integer } from "vuelidate/lib/validators";

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
                { text: "Código", value: "codigo" },
                { text: "Nome", value: "nome" },
                { text: "Ações", value: "actions", sortable: false },
            ],
            editedIndex: 0,
        }
    },
    validations: {
        produto: {
            codigo: {
                required,
                integer
            },
            nome: {
                required
            },
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

            if (!this.produto.codigo || this.$v.produto.codigo.$invalid) {
                this.emptyFieldsMessages.push('Preencha o campo código com um número inteiro');
            }

            if (!this.produto.nome || this.$v.produto.nome.$invalid ) {
                this.emptyFieldsMessages.push('Preencha o campo nome');

            }

            if(this.$v.$invalid) {
                return
            } else {
                this.$v.$reset();
                return true
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
            this.$http.delete('/v1/produto/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.produto)
                    this.newMessage(this.messages, 'Produto excluído com sucesso', 'danger')
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