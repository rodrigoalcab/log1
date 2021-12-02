export default {

    data () {
        return {
            emptyFieldsMessages: [],
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            veiculo: {
                id: '',
                placaCavalo: '',
                placaCarreta: '',
                placaCarreta2: '',
                modelo: '',
                idModeloVeiculo: '',

            },
            modeloSelecionado: null,
            modelosDeVeiculos: [],


            dialog: false,
            search: '',
            headers: [
                { text: "Modelo do Veículo", value: "modelo" },
                { text: "Placa Cavalo", value: "placaCavalo" },
                { text: "Placa Carreta", value: "placaCarreta" },
                { text: "Placa Carreta 2", value: "placaCarreta2" },

                { text: "Ações", value: "actions", sortable: false },
            ],
            editedIndex: 0,
        }


    },
    methods: {
        getModelosDeVeiculos () {
            this.$http.get('/v1/modelo-veiculo/')
                .then(res => {
                    this.modelosDeVeiculos = res.data

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

            this.$http.get('/v1/veiculo/' + id)
                .then(res => {

                    this.veiculo = res.data
                    this.id = this.veiculo.id
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

            if (this.veiculo.idModeloVeiculo && this.veiculo.placaCavalo && this.veiculo.placaCarreta && this.veiculo.placaCarreta2) {
                return true
            }


            if (!this.veiculo.idModeloVeiculo) {
                this.emptyFieldsMessages.push('Preencha o campo Modelo do Veículo');
            }

            if (!this.veiculo.placaCavalo) {
                this.emptyFieldsMessages.push('Preencha o campo Placa Cavalo');
            }

            if (!this.veiculo.placaCarreta) {
                this.emptyFieldsMessages.push('Preencha o campo Placa Carreta');
            }

            if (!this.veiculo.placaCarreta2) {
                this.emptyFieldsMessages.push('Preencha o campo Placa Carreta 2');
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
            const finalUrl = this.id ? '/v1/veiculo' : '/v1/veiculo'

            this.$http[method]('' + finalUrl, this.veiculo)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.$emit('updateData')

                        if(method === 'put') {
                            this.newMessage(this.messages, 'Veículo editado com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Veículo registrado com sucesso!', 'success')
                        }

                    }

                    this.clearFields(this.veiculo)

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
            this.$http.delete('/v1/veiculo/' + this.id)
                .then(() => {
                    this.$emit('updateData')
                    this.clearFields(this.veiculo)
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
        this.getModelosDeVeiculos()
    }
}