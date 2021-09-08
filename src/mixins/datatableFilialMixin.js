export default {

    data () {
        return {
            dialogDelete: false,
            saveButtonDisabled: false,
            messages: [],
            id: null,
            post: {
                userId: '',
                id: '',
                title: '',
                body: ''
            },


            dialog: false,
            search: '',
            headers: [
                { text: "User Id", value: "userId" },
                { text: "Id", value: "id" },
                { text: "Title", value: "title" },
                { text: "Body", value: "body" },
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

            this.$http.get('/posts/' + id)
                .then(res => {
                    this.post = res.data
                    this.id = this.post.id
                }).catch( error => {
                console.log(error)
            })

            this.dialog = true

        },

        openDialogNewItem() {
            this.editedIndex = 0
            this.dialog = true

        },

        save() {
            this.disableButton()
            const method = this.id ? 'patch' : 'post'
            const finalUrl = this.id ? '/posts/' + this.id : '/posts'

            this.$http[method]('' + finalUrl, this.post)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {

                        if(method === 'patch') {
                            this.newMessage(this.messages, 'Post editado com sucesso!', 'success')
                        }

                        if(method === 'post') {
                            this.newMessage(this.messages, 'Post registrado com sucesso!', 'success')
                        }


                    }

                    this.clearFields(this.post)

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
            this.$http.delete('/posts/' + this.id)
                .then(() => {
                    this.clearFields(this.post)
                    this.newMessage(this.messages, 'Post excluído com sucesso', 'danger')
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